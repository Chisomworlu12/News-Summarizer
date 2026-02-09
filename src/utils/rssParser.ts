import { supabase } from "../lib/supabase.js";

// Switching to AllOrigins as it is more reliable for news RSS feeds
const ALL_ORIGINS_PROXY = "https://api.allorigins.win/get?url=";

interface RSSSource {
  name: string;
  url: string;
  category: string;
}

interface FetchResults {
  success: number;
  failed: number;
  articles: any[];
}

export interface Article {
  title: string;
  description: string;
  url: string;
  url_to_image: string | null;
  published_at: string;
  source_name: string;
  category: string;
  fields?: { thumbnail?: string };
}

/** Fetches RSS feeds via proxy, parses them, and stores unique articles in Supabase.
 */
export async function fetchAndStoreRSS(sources: RSSSource[]): Promise<FetchResults> {
  const results: FetchResults = { success: 0, failed: 0, articles: [] };

  for (const source of sources) {
    try {
      
      const response = await fetch(
        `${ALL_ORIGINS_PROXY}${encodeURIComponent(source.url)}`
      );

      if (!response.ok) throw new Error(`Proxy status ${response.status}`);

      // AllOrigins returns a JSON object; the XML string is in the 'contents' property
      const data = await response.json();
      const xmlText = data.contents;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      // Check if the XML actually parsed correctly
      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Failed to parse XML content");
      }

      const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 15);

      for (const item of items) {
        // Some feeds use <link>, others use <guid> as the URL
        const articleUrl = item.querySelector("link")?.textContent || 
                           item.querySelector("guid")?.textContent;

        if (!articleUrl) continue;

        const article = {
          title: item.querySelector("title")?.textContent || "Untitled",
          description: cleanText(
            item.querySelector("description")?.textContent || ""
          ),
          url: articleUrl.trim(),
          url_to_image: extractImage(item),
          published_at: new Date(
            item.querySelector("pubDate")?.textContent || new Date()
          ).toISOString(),
          source_name: source.name,
          category: source.category,
        };

        // upsert uses the "url" column (which should be unique in your DB) 
        // to prevent duplicate entries.
        const { data: insertedData, error: supabaseError } = await supabase
          .from("articles")
          .upsert(article, { onConflict: "url" })
          .select();

        if (supabaseError) {
          console.warn(`Supabase upsert error for ${source.name}:`, supabaseError.message);
          continue;
        }

        if (insertedData && insertedData.length > 0) {
          results.success++;
          results.articles.push(insertedData[0]);
        }
      }
    } catch (error) {
      console.error(`Error processing ${source.name}:`, error);
      results.failed++;
    }
  }
  return results;
}

/**
 * Fetches articles from Supabase with optional filtering and search.
 */
export async function getArticles(
  category: string | null = null,
  limit = 50,
  searchTerm = ""
): Promise<Article[]> {
  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category && category !== "general") {
    query = query.eq("category", category);
  }

  if (searchTerm && searchTerm.trim() !== "") {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  const { data, error } = await query;
  return error ? [] : (data as Article[]);
}

/**
 * Gets the latest articles that specifically have images for a "Hero" or "Headlines" section.
 */
export async function getTopHeadlines(limit: number = 10): Promise<Article[]> {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .not("url_to_image", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);
  
  return (data as Article[]) || [];
}

function cleanText(text: string): string {
  if (!text) return "";

  return text.replace(/<[^>]*>/g, "").trim();
}



function extractImage(item: Element): string | null {
  // check standard RSS 
  const enclosure = item.querySelector("enclosure")?.getAttribute("url");
  if (enclosure) return enclosure;

  //  Check Media RSS tags 
  const mediaContent = item.getElementsByTagName("media:content")[0]?.getAttribute("url");
  if (mediaContent) return mediaContent;

  const mediaThumbnail = item.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url");
  if (mediaThumbnail) return mediaThumbnail;

  // Search for an <img> tag inside the description
  const description = item.querySelector("description")?.textContent || "";
  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch && imgMatch[1]) return imgMatch[1];

  return null;
}