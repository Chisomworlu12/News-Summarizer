import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSavedSummary(user, article) {
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  
  useEffect(() => {
    async function checkExisting() {
      if (!user?.id || !article?.url) return;
      
      const { data } = await supabase
        .from('summaries')
        .select('id')
        .eq('user_id', user.id)
        .eq('article_url', article.url)
        .maybeSingle();
      
      setIsSaved(!!data);
    }
    checkExisting();
  }, [user?.id, article?.url]);

  const saveSummary = async (summary) => {
    if (!user?.id || isSaved || !summary) return { error: 'Invalid state' };
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('summaries')
        .insert({
          user_id: user.id,
          article_url: article.url,
          article_title: article.title,
          article_description: article.description || article.contentSnippet,
          article_image_url: article.url_to_image || article.enclosure?.url || null,
          summary: summary
        });

      if (error) throw error;
      setIsSaved(true);
      return { success: true };
    } catch (error) {
      console.error('Error saving:', error);
      return { error: error.message };
    } finally {
      setSaving(false);
    }
  };

  return { saving, isSaved, saveSummary };
}