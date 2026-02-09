import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";

interface useSavedSummaryProps {
  user: any | null;
  article:{
    url: string;
    title: string;
    description?: string;
    contentSnippet?: string;
    url_to_image?: string;
    enclosure?: { url: string };
    fields?: { thumbnail: string };
  }| null;
}

 export const useSavedSummary = ({ user, article }: useSavedSummaryProps) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    async function checkExisting() {
      // Reset state when article changes or user logs out
      if (!user?.id || !article?.url) {
        setIsSaved(false);
        return;
      }

      const { data, error } = await supabase
        .from("summaries")
        .select("id")
        .eq("user_id", user.id)
        .eq("article_url", article.url)
        .maybeSingle();

      if (!error) setIsSaved(!!data);
    }
    checkExisting();
  }, [user?.id, article?.url]);

  const saveSummary = async (summary: string) => {
    if (!user?.id) return { error: "Please log in to save summaries" };
    if (isSaved) return { error: "Already saved" };
    if (!summary) return { error: "No summary to save" };

    setSaving(true);
    try {
      const { error } = await supabase.from("summaries").insert({
        user_id: user.id,
        article_url: article?.url,
        article_title: article?.title,
        article_description:
          article?.description || article?.contentSnippet || "",
        article_image_url:
          article?.url_to_image ||
          article?.enclosure?.url ||
          article?.fields?.thumbnail ||
          null,
        summary: summary,
      });

      if (error) throw error;
      setIsSaved(true);
      return { success: true };
    } catch (error) {
      console.error("Error saving:", error);
      return { error: (error as any).message };
    } finally {
      setSaving(false);
    }
  };

  // 🆕 Optional: Add removal logic
  const removeSummary = async () => {
    if (!user?.id || !article?.url) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("summaries")
        .delete()
        .eq("user_id", user.id)
        .eq("article_url", article.url);

      if (error) throw error;
      setIsSaved(false);
      return { success: true };
    } catch (error) {
      return { error: (error as any).message };
    } finally {
      setSaving(false);
    }
  };

  return { saving, isSaved, saveSummary, removeSummary };
}
