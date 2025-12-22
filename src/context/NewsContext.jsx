import { createContext, useState, useEffect } from 'react'
import { fetchAndStoreRSS, getArticles, getTopHeadlines } from '../utils/rssParser'
import { RSS_SOURCES } from '../config/rssSources'

export const NewsContext = createContext()

export default function NewsProvider({ children }) {
  const [articles, setArticles] = useState([])
  const [topHeadlines, setTopHeadlines] = useState([])
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastFetchTime, setLastFetchTime] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load articles from database (FAST - instant loading)
  const loadArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log(`📖 Loading articles from database...`)
      
      // Fetch from database (instant!)
      const [articlesData, headlinesData] = await Promise.all([
        getArticles(category, 50),
        getTopHeadlines(10)
      ])
      
      setArticles(articlesData)
      setTopHeadlines(headlinesData)
      
      console.log(`✅ Loaded ${articlesData.length} articles instantly from database`)
      
    } catch (err) {
      setError(err.message)
      console.error('❌ Error loading articles:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch fresh RSS data in background (SLOW - only when needed)
  const refreshRSSFeeds = async () => {
    try {
      setIsRefreshing(true)
      console.log('🔄 Refreshing RSS feeds in background...')
      
      const results = await fetchAndStoreRSS(RSS_SOURCES)
      
      setLastFetchTime(new Date())
      localStorage.setItem('lastRSSFetch', new Date().toISOString())
      
      console.log('✅ RSS feeds refreshed successfully')
      console.log(`📊 New: ${results.success}, Duplicates: ${results.duplicates}`)
      
      // Reload articles after refresh
      await loadArticles()
      
      return results
    } catch (err) {
      console.error('❌ Error refreshing feeds:', err)
      setError(err.message)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Check if we need to refresh RSS (only if data is old or missing)
  const shouldRefreshRSS = () => {
    const lastFetch = localStorage.getItem('lastRSSFetch')
    
    if (!lastFetch) return true 
    
    const lastFetchDate = new Date(lastFetch)
    const now = new Date()
    const hoursSinceLastFetch = (now - lastFetchDate) / (1000 * 60 * 60)
    
    return hoursSinceLastFetch > 1 
  }

  // Initial load - FAST STRATEGY
  useEffect(() => {
    const initializeApp = async () => {
      // STEP 1: Always load from database FIRST (instant!)
      await loadArticles()
      
      // STEP 2: Check if we need to refresh RSS in background
      if (articles.length === 0 || shouldRefreshRSS()) {
        console.log('📡 Fetching fresh RSS feeds in background...')
        // Delay refresh so UI shows immediately
        setTimeout(() => refreshRSSFeeds(), 1000)
      } else {
        console.log('✅ Using cached articles from database')
        const lastFetch = localStorage.getItem('lastRSSFetch')
        if (lastFetch) setLastFetchTime(new Date(lastFetch))
      }
    }
    
    initializeApp()
  }, []) 

  // Reload articles when category changes (FAST - from database only)
  useEffect(() => {
    if (lastFetchTime) {
      loadArticles()
    }
  }, [category])

  // Auto-refresh every 1 hour (changed from 30 minutes for better performance)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('⏰ Auto-refresh triggered (1 hour elapsed)')
      refreshRSSFeeds()
    }, 60 * 60 * 1000) // 1 hour
    
    return () => clearInterval(interval)
  }, [])

  const value = {
    articles,
    topHeadlines,
    category,
    setCategory,
    loading,
    error,
    refreshRSSFeeds,
    isRefreshing,
    lastFetchTime
  }

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  )
}
