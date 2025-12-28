function SummaryCard({item, handleDelete}) {
    return (
       <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {/* Article Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {item.article_title}
                  </h2>

                  {/* Article Description */}
                  {item.article_description && (
                    <p className="text-gray-600 text-sm mb-4">
                      {item.article_description.substring(0, 50)}...
                    </p>
                  )}

                  {/* Summary */}
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">AI Summary:</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.summary}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-4">
                      
                      <a  href={item.article_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        Read Original Article →
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-sm">
                        Saved {new Date(item.saved_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-sm"
                      >
                         Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default SummaryCard
