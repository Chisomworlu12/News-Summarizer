// src/context/NewsContext.jsx
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

  // Fetch fresh RSS data and store in database
  const refreshRSSFeeds = async () => {
    try {
      setIsRefreshing(true)
      console.log('🔄 Refreshing RSS feeds...')
      
      const results = await fetchAndStoreRSS(RSS_SOURCES)
      
      setLastFetchTime(new Date())
      console.log('✅ RSS feeds refreshed successfully')
      console.log(`📊 New articles: ${results.success}, Duplicates: ${results.duplicates}`)
      
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

  // Load articles from database
  const loadArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log(`📖 Loading articles for category: ${category}`)
      
      // Fetch both articles and headlines in parallel
      const [articlesData, headlinesData] = await Promise.all([
        getArticles(category, 50),
        getTopHeadlines(10)
      ])
      
      setArticles(articlesData)
      setTopHeadlines(headlinesData)
      
      console.log(`✅ Loaded ${articlesData.length} articles and ${headlinesData.length} headlines`)
      
    } catch (err) {
      setError(err.message)
      console.error('❌ Error loading articles:', err)
    } finally {
      setLoading(false)
    }
  }

  // Initial load when component mounts
  useEffect(() => {
    const initializeApp = async () => {
      // Check if we need to fetch fresh data
      const shouldFetch = !lastFetchTime || articles.length === 0
      
      if (shouldFetch) {
        console.log('🚀 First load - fetching fresh RSS feeds...')
        await refreshRSSFeeds()
      } else {
        // Just load from database
        await loadArticles()
      }
    }
    
    initializeApp()
  }, []) // Run once on mount

  // Reload articles when category changes
  useEffect(() => {
    if (lastFetchTime) { // Only run if we've already done initial load
      loadArticles()
    }
  }, [category])

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('⏰ Auto-refresh triggered (30 minutes elapsed)')
      refreshRSSFeeds()
    }, 30 * 60 * 1000) // 30 minutes
    
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