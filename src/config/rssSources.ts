interface RSS_Source {
  name: string;
  url: string;
  category: string;
}

export const RSS_SOURCES: RSS_Source[] = [
  {
    name: "The Guardian",
    url: "https://www.theguardian.com/world/rss",
    category: "general",
  },
  {
    name: "The New York Times",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    category: "general",
  },

  {
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
    category: "technology",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    category: "technology",
  },

  {
    name: "BBC Sport",
    url: "https://feeds.bbci.co.uk/sport/rss.xml",
    category: "sports",
  },
  {
    name: "Sky Sports",
    url: "https://www.skysports.com/rss/12040",
    category: "sports",
  },

  {
    name: "CNBC",
    url: "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    category: "business",
  },
  {
    name: "BBC Business",
    url: "http://feeds.bbci.co.uk/news/business/rss.xml",
    category: "business",
  },

  {
    name: "The Guardian Politics",
    url: "https://www.theguardian.com/politics/rss",
    category: "politics",
  },
];

// Helper function to get sources by category
export function getSourcesByCategory(category:string): RSS_Source[]  {
  if (category === "general") {
    return RSS_SOURCES;
  }
  return RSS_SOURCES.filter((source) => source.category === category);
}

// Get all available categories
export function getCategories() : string[] {
  const categories = [...new Set(RSS_SOURCES.map((source) => source.category))];
  return ["general", ...categories.filter((cat) => cat !== "general")];
}
