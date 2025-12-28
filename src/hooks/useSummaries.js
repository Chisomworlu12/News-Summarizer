import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useSummaries(user) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummaries = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from("summaries")
        .select("*")
        .order("saved_at", { ascending: false });

      if (dbError) throw dbError;
      setSummaries(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteSummary = async (id) => {
    try {
      const { error: dbError } = await supabase
        .from("summaries")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      setSummaries((prev) => prev.filter((s) => s.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete error:", err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  return { summaries, loading, error, deleteSummary, refetch: fetchSummaries };
}
