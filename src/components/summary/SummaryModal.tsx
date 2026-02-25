import { useNavigate } from 'react-router-dom';
import { useSavedSummary } from '../../hooks/useSavedSummary.js';
import { Bookmark, Check, ExternalLink, X } from 'lucide-react'; 

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
  article: {
    title: string;
    url: string;
  } | null;
  isLoading: boolean;
  user: any;
}

const SummaryModal:React.FC<SummaryModalProps>=({ isOpen, onClose, summary, article, isLoading, user }) =>{
  const { saving, isSaved, saveSummary } = useSavedSummary({user, article});
const navigate = useNavigate();
  if (!isOpen) return null;

  const handleSave = async () => {
    const result = await saveSummary(summary);
    if (result.error) {
      
      console.error(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
      
      <div onClick={onClose} className="absolute inset-0" />

      
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col z-10 overflow-hidden">
        
      
        <div className="bg-linear-to-r from-brand-blue to-indigo-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="bg-white/20 dark:bg-white/20 p-1.5 rounded-lg">✨</span>
                AI Summary
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 dark:hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={28} />
            </button>
          </div>
          {article && (
            <p className="text-brand-blue dark:text-dark-brand-blue text-sm mt-3 line-clamp-2 font-medium italic">
              "{article.title}"
            </p>
          )}
        </div>

        
        <div className="p-8 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-blue dark:border-dark-brand-blue"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-8 w-8 bg-brand-blue dark:bg-dark-brand-blue rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-6 font-medium animate-pulse">Analyzing article content...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 shadow-inner">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg">
                  {summary}
                </p>
              </div>

              {article?.url && (
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-blue dark:text-dark-brand-blue hover:text-brand-blue-light dark:hover:text-dark-brand-blue-light font-bold transition-colors group"
                >
                  Read full story 
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
            </div>
          )}
        </div>

        
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-5 border-t flex flex-col sm:flex-row gap-3">
         
          {user && !isLoading && summary && (
            <button
              onClick={handleSave} 
              disabled={saving || isSaved}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold shadow-sm
                ${isSaved 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 cursor-default' 
                  : 'bg-green-600 dark:bg-green-700 text-white dark:text-white hover:bg-green-700 dark:hover:bg-green-800 active:scale-95 disabled:opacity-70'
                }`}
            >
              {saving ? (
                'Saving...'
              ) : isSaved ? (
                <><Check size={20} /> Saved to Profile</>
              ) : (
                <><Bookmark size={20} /> Save Summary</>
              )} 
            </button>
          )}

          
          {!user && !isLoading && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 sm:w-2/3 mx-auto">
              Want to keep this? <span onClick={()=>navigate('/signup')} className="text-blue-600 dark:text-blue-400 font-bold">Sign up</span> to save summaries to your profile.
            </p>
          )}

          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-all font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;