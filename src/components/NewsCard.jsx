import Button from "./Button";


export default function NewsCard({article, handleSummarize, className=""}) {
  
    return (
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
           
           <img 
                src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'} 
                alt="News" 
                className={`w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg ${className}`}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    Source: {article.source.name} • 2 hours ago
                </p>
                
               
                <div className="flex-grow"></div>
                
                <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4'>
                    <a 
                        href={article.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium text-center sm:text-left"
                    >
                        Read full story →
                    </a>
                    <Button onClick={() => handleSummarize(article)}>Summarize</Button>
                </div>
            </div>
        </div>
    );
}