import { useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";

const initialState = {
  user: null,
  summaryCount: 0,
  showLimitModal: false
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
    
    default:
      return state;
  }
}

export function useAuthAndSummary() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {user, summaryCount, showLimitModal} = state

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      dispatch({type: 'SET_USER', payload: user})
    }
    checkUser()

   
    const count = localStorage.getItem('summaryCount') || 0
    dispatch({type: 'LOAD_SUMMARY_COUNT', payload: parseInt(count)})
  }, [])

  const handleSummarize = () => {
    if (user) {
      alert('Summarizing... (we will add AI here later)')
      return
    }

    if (summaryCount >= 3) {
      dispatch({type: 'SET_SHOW_LIMIT_MODAL', payload: true})
      return
    }

    dispatch({type: 'INCREMENT_SUMMARY'})
    alert(`Summary ${summaryCount + 1}/3 (we will add AI here later)`)
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
    setShowLimitModal: (value) => dispatch({type: 'SET_SHOW_LIMIT_MODAL', payload: value}),
    handleSummarize,
    handleLogout
  }
}