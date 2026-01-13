import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchAndStoreRSS, getArticles, getTopHeadlines } from '../utils/rssParser';
import { RSS_SOURCES } from '../config/rssSources';

export const NewsContext = createContext();

export default function NewsProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Initial load only
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [lastFetchTime, setLastFetchTime] = useState(() => {
    const saved = localStorage.getItem('lastRSSFetch');
    return saved ? new Date(saved) : null;
  });
  
  const hasInitialized = useRef(false);

  // loadArticles
  const loadArticles = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      
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
  }, [category, searchTerm]);

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

  // Initial Boot
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeApp = async () => {
      await loadArticles(true); 
      const savedTime = localStorage.getItem('lastRSSFetch');
      const isExpired = !savedTime || (new Date() - new Date(savedTime)) > 3600000;
      if (isExpired) refreshRSSFeeds();
    };
    initializeApp();
  }, [loadArticles]);

  // Handle Search/Category changes silently
  useEffect(() => {
    loadArticles();
  }, [category, searchTerm, loadArticles]);

  // Theme Logic
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <NewsContext.Provider value={{ 
      articles, topHeadlines, category, setCategory, 
      searchTerm, setSearchTerm, loading, isRefreshing, 
      refreshRSSFeeds, lastFetchTime, toggleTheme, theme 
    }}>
      {children}
    </NewsContext.Provider>
  );
}