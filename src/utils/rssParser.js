import { supabase } from "../lib/supabase";

const CORS_PROXY = "https://corsproxy.io/?";

export async function fetchAndStoreRSS(sources) {
  const results = { success: 0, failed: 0, articles: [] };
  for (const source of sources) {
    try {
      const response = await fetch(
        `${CORS_PROXY}${encodeURIComponent(source.url)}`
      );
      if (!response.ok) throw new Error(`Proxy status ${response.status}`);

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 15);

      for (const item of items) {
        const article = {
          title: item.querySelector("title")?.textContent || "Untitled",
          description: cleanText(
            item.querySelector("description")?.textContent || ""
          ),
          url: item.querySelector("link")?.textContent,
          url_to_image: extractImage(item),
          published_at: new Date(
            item.querySelector("pubDate")?.textContent || new Date()
          ).toISOString(),
          source_name: source.name,
          category: source.category,
        };

        if (!article.url) continue;

        const { data } = await supabase
          .from("articles")
          .upsert(article, { onConflict: "url" })
          .select();
        if (data) {
          results.success++;
          results.articles.push(data[0]);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${source.name}:`, error);
    }
  }
  return results;
}

// Updated search query logic for Supabase
export async function getArticles(
  category = null,
  limit = 50,
  searchTerm = ""
) {
  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category && category !== "general") {
    query = query.eq("category", category);
  }

  // Case-insensitive search filter
  if (searchTerm && searchTerm.trim() !== "") {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  const { data, error } = await query;
  return error ? [] : data;
}

export async function getTopHeadlines(limit = 10) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .not("url_to_image", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);
  return data || [];
}

function cleanText(text) {
  return text?.replace(/<[^>]*>/g, "").trim() || "";
}

function extractImage(item) {
  const enclosure = item.querySelector("enclosure")?.getAttribute("url");
  if (enclosure) return enclosure;
  const media = item
    .getElementsByTagName("media:content")[0]
    ?.getAttribute("url");
  return media || null;
}
