import { supabase } from "../lib/supabase";

export async function summarizeArticle(article) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const functionUrl = `${supabaseUrl}/functions/v1/summarize-article`;

    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY
        }`,
      },
      body: JSON.stringify({
        articleUrl: article.url,
        articleTitle: article.title,
        articleDescription: article.contentSnippet || article.description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        // Rate limit hit - show friendly message
        throw new Error(data.error);
      }
      throw new Error(
        data.error || `Failed to generate summary (${response.status})`
      );
    }

    // Log remaining summaries
    console.log(`✅ Summary generated! ${data.remaining} remaining today`);

    return data.summary;
  } catch (error) {
    console.error("❌ Summary Error:", error);
    throw error;
  }
}
