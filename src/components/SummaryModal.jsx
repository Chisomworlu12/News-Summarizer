
import { useSavedSummary } from '../hooks/useSavedSummary';

function SummaryModal({ isOpen, onClose, summary, article, isLoading, user }) {

  const { saving, isSaved, saveSummary } = useSavedSummary(user, article);

  if (!isOpen) return null;

  const handleSave = async () => {
    const result = await saveSummary(summary);
    if (result.error) {
      alert(result.error);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
     
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50"
      />

     
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col z-10">
        
       
        <div className="bg-blue-600 text-white p-6 flex-shrink-0 rounded-t-lg">
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

        
        <div className="p-6 overflow-y-auto flex-1">
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

       
        <div className="bg-gray-50 px-6 py-4 border-t flex gap-3 rounded-b-lg flex-shrink-0">
          {user && !isLoading && summary && (
            <button
              onClick={handleSave} 
              disabled={saving || isSaved}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-green-300"
            >
              {saving ? 'Saving...' : isSaved ? '✓ Saved to Profile' : 'Save Summary'}
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
