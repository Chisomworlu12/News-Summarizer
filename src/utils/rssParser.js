import { supabase } from "../lib/supabase";

// SWITCHED PROXY: allorigins is currently unstable (502 error).
// corsproxy.io is a more reliable alternative for RSS feeds.
const CORS_PROXY = "https://corsproxy.io/?";

export async function fetchAndStoreRSS(sources) {
  console.log(`🚀 Starting RSS fetch from ${sources.length} sources...`);

  const results = { success: 0, failed: 0, duplicates: 0, articles: [] };

  for (const source of sources) {
    try {
      console.log(`📡 Fetching from ${source.name}...`);

      // FIX: Improved fetch logic with error handling for the proxy
      const response = await fetch(
        `${CORS_PROXY}${encodeURIComponent(source.url)}`
      );

      if (!response.ok)
        throw new Error(`Proxy returned status ${response.status}`);

      const xmlText = await response.text(); // corsproxy.io returns text directly

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const items = xmlDoc.querySelectorAll("item");

      console.log(`✓ Found ${items.length} articles from ${source.name}`);
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
          // user_id: (await supabase.auth.getUser()).data.user?.id // ADD THIS if your RLS uses auth.uid()
        };

        if (!article.title || !article.url) continue;

        // FIX: Ensure your RLS has BOTH "Insert" and "Update" policies for authenticated users
        const { data, error } = await supabase
          .from("articles")
          .upsert(article, {
            onConflict: "url", // Ensure 'url' column is marked as UNIQUE in Supabase
          })
          .select();

        if (error) {
          console.error(`❌ Supabase Error (${error.code}): ${error.message}`);
          results.failed++;
        } else {
          results.success++;
          if (data) results.articles.push(data[0]);
        }
      }
      await sleep(1000);
    } catch (error) {
      console.error(`❌ Error fetching ${source.name}:`, error.message);
      results.failed++;
    }
  }
  return results;
}

// Helper functions
function getTextContent(item, tagName) {
  const element = item.querySelector(tagName);
  return element ? element.textContent : null;
}

function getContentEncoded(item) {
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

function extractImageFromItem(item) {
  const enclosure = item.querySelector("enclosure");
  if (enclosure && enclosure.getAttribute("type")?.includes("image")) {
    return enclosure.getAttribute("url");
  }

  const mediaContent = item.getElementsByTagName("media:content")[0];
  if (mediaContent) {
    const url = mediaContent.getAttribute("url");
    if (url) return url;
  }

  const mediaThumbnail = item.getElementsByTagName("media:thumbnail")[0];
  if (mediaThumbnail) {
    const url = mediaThumbnail.getAttribute("url");
    if (url) return url;
  }

  const description = getTextContent(item, "description");
  if (description) {
    const imgMatch = description.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgMatch) return imgMatch[1];
  }

  const content = getContentEncoded(item);
  if (content) {
    const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgMatch) return imgMatch[1];
  }

  return null;
}

function parseDate(dateString) {
  if (!dateString) return new Date().toISOString();
  try {
    return new Date(dateString).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

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
