import { useReducer, useEffect } from "react";
import { summarizeArticle } from "../services/geminiService";
import { useAuth } from "../context/AuthContext";

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

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_COUNT":
      return { ...state, summaryCount: action.payload };
    case "INCREMENT":
      const newCount = state.summaryCount + 1;
      localStorage.setItem("summaryCount", newCount);
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
    const count = localStorage.getItem("summaryCount") || 0;
    dispatch({ type: "LOAD_COUNT", payload: parseInt(count) });
  }, []);

  const handleSummarize = async (article) => {
    // Guest Limit Check
    if (!user && state.summaryCount >= 2) {
      dispatch({ type: "SET_LIMIT_MODAL", payload: true });
      return;
    }

    dispatch({
      type: "SET_SUMMARY_MODAL",
      payload: { isOpen: true, summary: "", article, isLoading: true },
    });

    try {
      const summary = await summarizeArticle(article);
      dispatch({
        type: "SET_SUMMARY_MODAL",
        payload: { isOpen: true, summary, article, isLoading: false },
      });

      if (!user) dispatch({ type: "INCREMENT" });
    } catch (error) {
      console.error("Error caught in hook:", error);
      dispatch({
        type: "SET_SUMMARY_MODAL",
        payload: {
          isOpen: true,
          summary: "Error generating summary.",
          article,
          isLoading: false,
        },
      });
    }
  };

  return {
    ...state,
    handleSummarize,
    setShowLimitModal: (val) =>
      dispatch({ type: "SET_LIMIT_MODAL", payload: val }),
    closeSummaryModal: () =>
      dispatch({
        type: "SET_SUMMARY_MODAL",
        payload: { ...initialState.summaryModal },
      }),
  };
}
