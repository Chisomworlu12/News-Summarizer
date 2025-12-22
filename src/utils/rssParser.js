import { supabase } from "../lib/supabase";
// CORS proxy to fetch RSS feeds
const CORS_PROXY = "https://api.allorigins.win/get?url=";

/**
 * Fetches articles from RSS feeds and stores them in Supabase
 */
export async function fetchAndStoreRSS(sources) {
  console.log(`🚀 Starting RSS fetch from ${sources.length} sources...`);

  const results = {
    success: 0,
    failed: 0,
    duplicates: 0,
    articles: [],
  };

  for (const source of sources) {
    try {
      console.log(`📡 Fetching from ${source.name}...`);

      // Fetch RSS through CORS proxy
      const response = await fetch(CORS_PROXY + encodeURIComponent(source.url));
      const data = await response.json();
      const xmlText = data.contents;

      // Parse XML manually
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      // Get all items from RSS feed
      const items = xmlDoc.querySelectorAll("item");

      console.log(`✓ Found ${items.length} articles from ${source.name}`);

      // Process each article (limit to 15)
      const itemsArray = Array.from(items).slice(0, 15);

      for (const item of itemsArray) {
        const article = {
          title: getTextContent(item, "title") || "Untitled",
          description: cleanText(getTextContent(item, "description") || ""),
          content: cleanText(
            getContentEncoded(item) || getTextContent(item, "description") || ""
          ),
          url: getTextContent(item, "link"),
          url_to_image: extractImageFromItem(item),
          published_at: parseDate(getTextContent(item, "pubDate")),
          source_name: source.name,
          category: source.category,
        };

        // Validate
        if (!article.title || !article.url) {
          console.log(`⚠️ Skipping invalid article`);
          results.failed++;
          continue;
        }

        // Insert into database
        const { data, error } = await supabase
          .from("articles")
          .upsert(article, {
            onConflict: "url",
            ignoreDuplicates: false,
          })
          .select();

        if (error) {
          if (error.code === "23505") {
            results.duplicates++;
          } else {
            console.error(`❌ Error storing article: ${error.message}`);
            results.failed++;
          }
        } else {
          results.success++;
          results.articles.push(article);
        }
      }

      // Small delay
      await sleep(1000);
    } catch (error) {
      console.error(`❌ Error fetching ${source.name}:`, error.message);
    }
  }

  console.log(`
    ✅ RSS Fetch Complete!
    📊 Success: ${results.success}
    🔄 Duplicates: ${results.duplicates}
    ❌ Failed: ${results.failed}
  `);

  return results;
}

// Helper: Get text content from XML element
function getTextContent(item, tagName) {
  const element = item.querySelector(tagName);
  return element ? element.textContent : null;
}

// Helper: Get content:encoded (special handling for namespaced tags)
function getContentEncoded(item) {
  // Try different namespace variations
  let element = item.getElementsByTagName("content:encoded")[0];
  if (!element) {
    element = item.getElementsByTagNameNS(
      "http://purl.org/rss/1.0/modules/content/",
      "encoded"
    )[0];
  }
  if (!element) {
    element = item.querySelector("[*|encoded]");
  }
  return element ? element.textContent : null;
}

// Helper: Extract image from RSS item
function extractImageFromItem(item) {
  // Method 1: Try enclosure
  const enclosure = item.querySelector("enclosure");
  if (enclosure && enclosure.getAttribute("type")?.includes("image")) {
    return enclosure.getAttribute("url");
  }

  // Method 2: Try media:content using getElementsByTagName
  const mediaContent = item.getElementsByTagName("media:content")[0];
  if (mediaContent) {
    const url = mediaContent.getAttribute("url");
    if (url) return url;
  }

  // Method 3: Try media:thumbnail
  const mediaThumbnail = item.getElementsByTagName("media:thumbnail")[0];
  if (mediaThumbnail) {
    const url = mediaThumbnail.getAttribute("url");
    if (url) return url;
  }

  // Method 4: Extract from description HTML
  const description = getTextContent(item, "description");
  if (description) {
    const imgMatch = description.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgMatch) return imgMatch[1];
  }

  // Method 5: Extract from content:encoded
  const content = getContentEncoded(item);
  if (content) {
    const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgMatch) return imgMatch[1];
  }

  return null;
}

// Helper: Parse date
function parseDate(dateString) {
  if (!dateString) return new Date().toISOString();

  try {
    return new Date(dateString).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// Helper: Clean text
function cleanText(text) {
  if (!text) return "";

  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper: Sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get articles from database
export async function getArticles(category = null, limit = 50) {
  console.log(
    `📖 Fetching articles (category: ${category || "all"}, limit: ${limit})`
  );

  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category && category !== "general") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ Error fetching articles:", error);
    return [];
  }

  console.log(`✓ Found ${data.length} articles`);
  return data;
}

// Get top headlines
export async function getTopHeadlines(limit = 10) {
  console.log(`📰 Fetching top ${limit} headlines`);

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .not("url_to_image", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("❌ Error fetching headlines:", error);
    return [];
  }

  console.log(`✓ Found ${data.length} headlines`);
  return data;
}

// Search articles
export async function searchArticles(keyword, limit = 20) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("❌ Error searching articles:", error);
    return [];
  }

  return data;
}
