import { supabase } from "../lib/supabase.js";

interface RSSSource {
  name: string;
  url: string;
  category: string;
}

interface FetchResults {
  success: number;
  failed: number;
  articles: Article[];
}

export interface Article {
  title: string;
  description: string;
  url: string;
  url_to_image: string | null;
  published_at: string;
  source_name: string;
  category: string;
}


export async function fetchAndStoreRSS(sources: RSSSource[]): Promise<FetchResults> {
  const results: FetchResults = { success: 0, failed: 0, articles: [] };

  for (const source of sources) {
    try {
      // Call your private Supabase Edge Function Proxy
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rapid-handler`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ url: source.url })
        }
      );

      if (!response.ok) throw new Error(`Proxy status ${response.status}`);

      // Parse the raw XML returned by the server
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Failed to parse XML content");
      }

      //  Extract items (Top 15 per source)
      const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 15);

      for (const item of items) {
        const articleUrl = item.querySelector("link")?.textContent || item.querySelector("guid")?.textContent;

        if (!articleUrl) continue;

        const article = {
          title: item.querySelector("title")?.textContent || "Untitled",
          description: cleanText(item.querySelector("description")?.textContent || ""),
          url: articleUrl.trim(),
          url_to_image: extractImage(item),
          published_at: new Date(
            item.querySelector("pubDate")?.textContent || new Date()
          ).toISOString(),
          source_name: source.name,
          category: source.category,
        };

        //  Upsert to Supabase 
        const { data: insertedData, error: supabaseError } = await supabase
          .from("articles")
          .upsert(article, { onConflict: "url" })
          .select();

        if (!supabaseError && insertedData && insertedData.length > 0) {
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
  //  Check <enclosure>
  const enclosure = item.querySelector("enclosure")?.getAttribute("url");
  if (enclosure) return enclosure;

  //  Check Media RSS namespace
  const mediaContent = item.getElementsByTagName("media:content")[0]?.getAttribute("url");
  if (mediaContent) return mediaContent;

  const mediaThumbnail = item.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url");
  if (mediaThumbnail) return mediaThumbnail;

  // Check for <img> inside description
  const description = item.querySelector("description")?.textContent || "";
  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch && imgMatch[1]) return imgMatch[1];

  return null;
}