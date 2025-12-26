import { useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { summarizeArticle } from "../services/geminiService";

const initialState = {
  user: null,
  summaryCount: 0,
  showLimitModal: false,
  summaryModal: {
    isOpen: false,
    summary: '',
    article: null,
    isLoading: false
  }
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {...state, user: action.payload};
    
    case 'INCREMENT_SUMMARY':
      const newCount = state.summaryCount + 1
      localStorage.setItem('summaryCount', newCount)
      return {...state, summaryCount: newCount}
    
    case 'LOAD_SUMMARY_COUNT':
      return {...state, summaryCount: action.payload}
    
    case 'RESET_SUMMARY_COUNT':
      localStorage.removeItem('summaryCount')
      return {...state, summaryCount: 0}
    
    case 'SET_SHOW_LIMIT_MODAL':
      return {...state, showLimitModal: action.payload};
    
    case 'SET_SUMMARY_MODAL':
      return {...state, summaryModal: action.payload};
    
    default:
      return state;
  }
}

export function useAuthAndSummary() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {user, summaryCount, showLimitModal, summaryModal} = state

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      dispatch({type: 'SET_USER', payload: user})
    }
    checkUser()

    const count = localStorage.getItem('summaryCount') || 0
    dispatch({type: 'LOAD_SUMMARY_COUNT', payload: parseInt(count)})
  }, [])

  const handleSummarize = async (article) => {
    // Check limit for non-logged-in users
  if (!user && summaryCount >= 5) {
      dispatch({type: 'SET_SHOW_LIMIT_MODAL', payload: true})
      return
    }

    // Open modal with loading state
    dispatch({
      type: 'SET_SUMMARY_MODAL',
      payload: {
        isOpen: true,
        summary: '',
        article: article,
        isLoading: true
      }
    })

    try {
      // Call Gemini API
      const summary = await summarizeArticle(article)
      
      // Update modal with summary
      dispatch({
        type: 'SET_SUMMARY_MODAL',
        payload: {
          isOpen: true,
          summary: summary,
          article: article,
          isLoading: false
        }
      })

      // Increment count for non-logged-in users
      if (!user) {
        dispatch({type: 'INCREMENT_SUMMARY'})
      }

    } catch (error) {
      console.error('Error generating summary:', error)
      
      // Show error in modal
      dispatch({
        type: 'SET_SUMMARY_MODAL',
        payload: {
          isOpen: true,
          summary: 'Failed to generate summary. Please try again later.',
          article: article,
          isLoading: false
        }
      })
    }
  }

  const closeSummaryModal = () => {
    dispatch({
      type: 'SET_SUMMARY_MODAL',
      payload: {
        isOpen: false,
        summary: '',
        article: null,
        isLoading: false
      }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    dispatch({type: 'SET_USER', payload: null})
    dispatch({type: 'RESET_SUMMARY_COUNT'})
  }

  return {
    user,
    summaryCount,
    showLimitModal,
    summaryModal,
    setShowLimitModal: (value) => dispatch({type: 'SET_SHOW_LIMIT_MODAL', payload: value}),
    handleSummarize,
    handleLogout,
    closeSummaryModal
  }
}