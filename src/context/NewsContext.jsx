import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();
const YOUR_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export default function NewsProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");



  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const [generalResponse, headlinesResponse] = await Promise.all([
         fetch( ` https://newsapi.org/v2/everything?q=${category}&apiKey=${YOUR_API_KEY} `),
        fetch(`https://newsapi.org/v2/top-headlines?q=${category}&apiKey=${YOUR_API_KEY} `)]
        );

          if (generalResponse.status === 403 || headlinesResponse.status === 403) {
          throw new Error('Access forbidden - Please check your API key or subscription plan');
        }

        if (generalResponse.status === 401 || headlinesResponse.status === 401) {
          throw new Error('Invalid API key - Please verify your credentials');
        }

         if (generalResponse.status === 429 || headlinesResponse.status === 429) {
          throw new Error('Rate limit exceeded - Please try again later');
        }

         if (!generalResponse.ok || !headlinesResponse.ok) {
          throw new Error('Failed to fetch news');
        }


        const generalNews = await generalResponse.json();
        const topHeadlines = await headlinesResponse.json();
        setArticles(generalNews.articles || []);
        setTopHeadlines(topHeadlines.articles || []);
        console.log(generalNews.articles);
        
      } catch (err) {
        console.error('News API Error:', err);
        setError(err.message || 'An unexpected error occurred');

        setArticles([]);
        setTopHeadlines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);



const value = { articles, loading, error, category, setCategory,topHeadlines};

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}
