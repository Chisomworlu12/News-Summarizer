import { useReducer, useEffect } from "react";

import { useAuth } from "../context/AuthContext.js";
import { supabase } from "../lib/supabase"; 

const initialState = {
  summaryCount: 0,
  showLimitModal: false,
  summaryModal: {
    isOpen: false,
    summary: "",
    article: null,
    isLoading: false,
  },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "LOAD_COUNT":
      return { ...state, summaryCount: action.payload };
    case "INCREMENT":
      const newCount = state.summaryCount + 1;
      localStorage.setItem("summaryCount", String(newCount));
      return { ...state, summaryCount: newCount };
    case "SET_LIMIT_MODAL":
      return { ...state, showLimitModal: action.payload };
    case "SET_SUMMARY_MODAL":
      return { ...state, summaryModal: action.payload };
    case "RESET_LIMITS":
      localStorage.removeItem("summaryCount");
      return { ...state, summaryCount: 0 };
    default:
      return state;
  }
}

export function useSummary() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    const count: string | null = localStorage.getItem("summaryCount");
    dispatch({ type: "LOAD_COUNT", payload: count ? parseInt(count) : 0 });
  }, []);

  const handleSummarize = async (article: any) => {
    // Guest Limit Check (matches your local tracking)
    if (!user && state.summaryCount >= 2) {
      dispatch({ type: "SET_LIMIT_MODAL", payload: true });
      return;
    }

    dispatch({
      type: "SET_SUMMARY_MODAL",
      payload: { isOpen: true, summary: "", article, isLoading: true },
    });

    try {
    
      const { data: { session } } = await supabase.auth.getSession();

     
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-summarize`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            articleUrl: article.url,
            articleTitle: article.title,
            articleDescription: article.description || article.content
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch summary');
      }

      const data = await response.json();
      
      dispatch({
        type: "SET_SUMMARY_MODAL",
        payload: { isOpen: true, summary: data.summary, article, isLoading: false },
      });

      if (!user) dispatch({ type: "INCREMENT" });

    } catch (error: any) {
      console.error("Error caught in hook:", error);
      dispatch({
        type: "SET_SUMMARY_MODAL",
        payload: {
          isOpen: true,
          summary: error.message || "Error generating summary.",
          article,
          isLoading: false,
        },
      });
    }
  };

  return {
    ...state,
    handleSummarize,
    setShowLimitModal: (val: boolean) =>
      dispatch({ type: "SET_LIMIT_MODAL", payload: val }),
    closeSummaryModal: () =>
      dispatch({
        type: "SET_SUMMARY_MODAL",
        payload: { ...initialState.summaryModal },
      }),
  };
}