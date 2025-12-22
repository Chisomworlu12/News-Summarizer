

function NewsCard({ article, handleSummarize }) {
 
  const title = article.title || article.webTitle || 'No title'
  const description = article.description || article.fields?.trailText || 'No description available'
  const imageUrl = article.url_to_image || article.fields?.thumbnail || '/placeholder.jpg'
  const articleUrl = article.url || article.webUrl || '#'
  const sourceName = article.source_name || article.sectionName || 'Unknown source'
  const publishedDate = article.published_at || article.webPublicationDate

 
  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Invalid Date'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
  
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
          }}
        />
      </div>

   
      <div className="p-4">
        {/* Source and Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span className="font-semibold">{sourceName}</span>
          <span>{formatDate(publishedDate)}</span>
        </div>

        
        <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600">
          {title}
        </h3>

      
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex gap-2">
          <a 
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 "
          >
            Read full story→ 
          </a>
          
          <button
            onClick={() => handleSummarize(article)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Summarize
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard