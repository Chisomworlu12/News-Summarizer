import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase.js";

export function useSummaries(user: { id: string } | null) {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchSummaries = useCallback(async () => {
    if (!user?.id) {
      setSummaries([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from("summaries")
        .select("*")
        .eq("user_id", user?.id)
        .order("saved_at", { ascending: false });

      if (dbError) throw dbError;
      setSummaries(data || []);
    } catch (err) {
      setError((err as any).message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const deleteSummary = async (id: string) => {
    try {
      const { error: dbError } = await supabase
        .from("summaries")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (dbError) throw dbError;

      setSummaries((prev) => prev.filter((s) => s.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete error:", err);
      return { success: false, error: (err as any).message };
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  return { summaries, loading, error, deleteSummary, refetch: fetchSummaries };
}

