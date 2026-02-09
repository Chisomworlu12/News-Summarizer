import { useState } from 'react';
import { Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface SummaryCardProps {
  item: {
    id: string;
    article_title: string;
    article_description?: string;
    summary: string;
    article_url: string;
    saved_at: string;
  };
  handleDelete: (id: string) => void;
}

const SummaryCard:React.FC<SummaryCardProps>=({ item, handleDelete }) =>{
  const [isExpanded, setIsExpanded] = useState(false);

 
  const characterLimit = 180;
  const text = item.summary || "";
  const isLong = text.length > characterLimit;

  
  const displayContent = isExpanded 
    ? text 
    : `${text.substring(0, characterLimit)}...`;

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-300 leading-tight flex-1 pr-4">
            {item.article_title}
          </h2>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-gray-400 hover:text-red-600 p-1 transition-colors"
            title="Delete saved summary"
          >
            <Trash2 size={20} />
          </button>
        </div>

       
        {item.article_description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-1 italic dark:text-gray-400">
            {item.article_description}
          </p>
        )}

        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            AI Summary
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {isLong ? displayContent : text}
          </p>

        
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 flex items-center gap-1 text-blue-700 font-bold text-sm hover:text-blue-900"
            >
              {isExpanded ? (
                <><ChevronUp size={16} /> Show Less</>
              ) : (
                <><ChevronDown size={16} /> View More</>
              )}
            </button>
          )}
        </div>

        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
          <span className="text-gray-400 dark:text-gray-300">
            Saved on {new Date(item.saved_at).toLocaleDateString()}
          </span>
          <a
            href={item.article_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-700 font-semibold hover:underline"
          >
            Original Source <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;