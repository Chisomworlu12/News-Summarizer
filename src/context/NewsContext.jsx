import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();
// Ensure this key is your The Guardian API Key
const YOUR_API_KEY = import.meta.env.VITE_NEWS_API_KEY; 

export default function NewsProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("news"); 
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); 
      
      try {
       
        const commonParams = `api-key=${YOUR_API_KEY}&show-fields=thumbnail,trailText&page-size=10`;
        
        const [generalResponse, headlinesResponse] = await Promise.all([
          fetch(`https://content.guardianapis.com/search?q=${category}&${commonParams}`),
          fetch(`https://content.guardianapis.com/search?section=${category}&${commonParams}`)
        ]);

    
        if (generalResponse.status === 401) throw new Error('Invalid Guardian API key');
        if (generalResponse.status === 429) throw new Error('Guardian Rate limit reached');
        if (!generalResponse.ok || !headlinesResponse.ok) throw new Error('Failed to fetch from Guardian');

        const generalData = await generalResponse.json();
        const headlinesData = await headlinesResponse.json();

       
        setArticles(generalData.response.results || []);
        setTopHeadlines(headlinesData.response.results || []);
        
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


  console.log(articles);
  
  const value = { articles, loading, error, category, setCategory, topHeadlines };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}