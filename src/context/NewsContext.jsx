import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchAndStoreRSS, getArticles, getTopHeadlines } from '../utils/rssParser';
import { RSS_SOURCES } from '../config/rssSources';

export const NewsContext = createContext();

export default function NewsProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
 const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('app-theme');
  if (saved) return saved;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
});


  
  // Initialize state directly from localStorage 
  const [lastFetchTime, setLastFetchTime] = useState(() => {
    const saved = localStorage.getItem('lastRSSFetch');
    return saved ? new Date(saved) : null;
  });
  
  const hasInitialized = useRef(false);

  // Load articles from the database
  const loadArticles = useCallback(async () => {
    try {
     
      if (articles.length === 0) setLoading(true);
      
      const [articlesData, headlinesData] = await Promise.all([
        getArticles(category, 50, searchTerm),
        getTopHeadlines(10)
      ]);
      
      setArticles(articlesData);
      setTopHeadlines(headlinesData);
    } catch (err) {
      console.error('❌ DB Load Error:', err);
    } finally {
      setLoading(false);
    }
  }, [category, searchTerm, articles.length]);

  // Handle manual and background RSS updates
  const refreshRSSFeeds = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);
      
      const workPromise = fetchAndStoreRSS(RSS_SOURCES);
      const delayPromise = new Promise(resolve => setTimeout(resolve, 800));

      await Promise.all([workPromise, delayPromise]);

      const now = new Date();
      localStorage.setItem('lastRSSFetch', now.toISOString());
      setLastFetchTime(now);
   
      await loadArticles();
      
    } catch (error) {
      console.error("❌ Refresh Error:", error);
    } finally {
    
      setIsRefreshing(false); 
    }
  };

  // Initial App Mount Logic
  useEffect(() => {
   
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeApp = async () => {
     
      await loadArticles();
      
    
      const savedTime = localStorage.getItem('lastRSSFetch');
      const oneHour = 60 * 60 * 1000;
      const isExpired = !savedTime || (new Date() - new Date(savedTime)) > oneHour;

      if (isExpired) {
        refreshRSSFeeds();
      }
    };

    initializeApp();
  }, [loadArticles]);

  // Sync UI when user changes category or types in search
  useEffect(() => {
    if (!loading) {
      loadArticles();
    }
  }, [category, searchTerm, loadArticles, loading]);

  // Light and dark mode
useEffect(() => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  localStorage.setItem('app-theme', theme);
}, [theme]);

const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <NewsContext.Provider value={{ 
      articles, 
      topHeadlines, 
      category, 
      setCategory, 
      searchTerm, 
      setSearchTerm, 
      loading, 
      isRefreshing, 
      refreshRSSFeeds, 
      lastFetchTime,
      toggleTheme,
      theme 
    }}>
      {children}
    </NewsContext.Provider>
  );
}