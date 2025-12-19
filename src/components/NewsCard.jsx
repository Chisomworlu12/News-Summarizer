import Button from "./Button";

export default function NewsCard({ article, handleSummarize, className = "" }) {
 
  if (!article) return null;

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden">
    
      <img
        src={article.fields?.thumbnail || "https://via.placeholder.com/500x300?text=No+Image"}
        alt={article.webTitle}
        className={`w-full h-48 sm:h-56 md:h-64 object-cover ${className}`}
      />
      
      <div className="p-4 flex flex-col flex-grow">
     
        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
          {article.webTitle}
        </h3>

      
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold text-blue-700">{article.sectionName}</span> • {new Date(article.webPublicationDate).toLocaleDateString()}
        </p>

     
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
            {article.fields?.trailText?.replace(/<[^>]*>?/gm, '')} 
        </p>
        
        <div className="flex-grow"></div>
        
        <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4'>
           
            <a 
                href={article.webUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium text-center sm:text-left flex items-center"
            >
                Read full story →
            </a>
            <Button onClick={() => handleSummarize(article)}>Summarize</Button>
        </div>
      </div>
    </div>
  );
}