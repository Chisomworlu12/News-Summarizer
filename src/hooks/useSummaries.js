import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useSummaries(user) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummaries = useCallback(async () => {
    // 1. Safety check: Ensure user and user.id exist
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
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });

      if (dbError) throw dbError;
      setSummaries(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const deleteSummary = async (id) => {
    try {
      const { error: dbError } = await supabase
        .from("summaries")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

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
