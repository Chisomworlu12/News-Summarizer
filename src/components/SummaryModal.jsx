function SummaryModal({ isOpen, onClose, summary, article, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] md:mb-10 z-10 ">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold pr-8">AI Summary</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl leading-none"
            >
              ×
            </button>
          </div>
          {article && (
            <p className="text-blue-100 text-sm mt-2 line-clamp-2">{article.title}</p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] scroll-smooth">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Generating AI summary...</p>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {summary}
                </p>
              </div>

              {article?.url && (
                
                 <a href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Read full article →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t w-full rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;