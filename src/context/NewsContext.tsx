import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchAndStoreRSS, getArticles, getTopHeadlines } from '../utils/rssParser.js';
import { RSS_SOURCES } from '../config/rssSources.js';
import type { Article } from "../utils/rssParser.js";
interface NewsContextType {
  articles: Article[];
  topHeadlines: Article[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  isRefreshing: boolean;
  refreshRSSFeeds: () => Promise<void>;
  lastFetchTime: Date | null;
  toggleTheme: () => void;
  theme: string;
  error: string | null;
}

export  const NewsContext = createContext<NewsContextType | null>(null);

interface NewsProviderProps {
  children: React.ReactNode;
}

export  const NewsProvider:React.FC<NewsProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [topHeadlines, setTopHeadlines] = useState<Article[]>([]);
  const [category, setCategory] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); 
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved) return saved as "light" | "dark";
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(() => {
    const saved = localStorage.getItem('lastRSSFetch');
    return saved ? new Date(saved) : null;
  });
  
  const hasInitialized = useRef<boolean>(false);

  // loadArticles
  const loadArticles = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      
      const [articlesData, headlinesData] = await Promise.all([
        getArticles(category, 50, searchTerm || ""),
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
      const isExpired  = !savedTime || (new Date().getTime() - new Date(savedTime).getTime()) > 3600000;
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
      refreshRSSFeeds, lastFetchTime, toggleTheme, theme, error 
    }}>
      {children}
    </NewsContext.Provider>
  );
}

export default NewsProvider