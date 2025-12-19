import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();


const YOUR_API_KEY = import.meta.env.VITE_NEWS_API_KEY; 

export default function NewsProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("news"); 

  useEffect(() => {
    const fetchNews = async () => {
      // Don't run if API key is missing
      if (!YOUR_API_KEY) {
        setError("API Key is missing. Check your .env file.");
        return;
      }

      setLoading(true);
      setError(null); 
      
      try {
      
        const commonParams = `api-key=${YOUR_API_KEY}&show-fields=thumbnail,trailText&page-size=10`;
       
        const [generalResponse, headlinesResponse] = await Promise.all([
          fetch(`https://content.guardianapis.com/search?q=${category}&${commonParams}`),
          fetch(`https://content.guardianapis.com/search?section=${category === 'general' ? 'news' : category}&${commonParams}`)
        ]);

        // Error Handling for different status codes
        if (generalResponse.status === 401) throw new Error('Invalid Guardian API key');
        if (generalResponse.status === 429) throw new Error('Guardian Rate limit reached');
        if (!generalResponse.ok || !headlinesResponse.ok) throw new Error('Failed to fetch from Guardian');

        const generalData = await generalResponse.json();
        const headlinesData = await headlinesResponse.json();

        // The Guardian wraps data in a 'response' object, then 'results' array
        const generalResults = generalData.response.results || [];
        const headlinesResults = headlinesData.response.results || [];

        setArticles(generalResults);
        setTopHeadlines(headlinesResults);
        
      } catch (err) {
        console.error('Guardian API Error:', err);
        setError(err.message);
        setArticles([]);
        setTopHeadlines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]); 

  const value = { 
    articles, 
    loading, 
    error, 
    category, 
    setCategory, 
    topHeadlines 
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}