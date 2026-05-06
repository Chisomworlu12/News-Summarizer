import { useState } from 'react'
import { Trash2, ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'

interface SummaryCardProps {
  item: {
    id: string
    article_title: string
    article_description?: string
    summary: string
    article_url: string
    saved_at: string
  }
  handleDelete: (id: string) => void
}

const SummaryCard: React.FC<SummaryCardProps> = ({ item, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const allPoints = (item.summary || '')
    .split('\n')
    .map((line: string) => line.replace(/^[\s•\-\*\d+\.\)]+/, '').trim())
    .filter(Boolean)
  const PREVIEW = 3
  const points = isExpanded ? allPoints : allPoints.slice(0, PREVIEW)
  const isLong = allPoints.length > PREVIEW

  return (
    <div className="group bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-white/5 hover:border-brand-purple/20 hover:shadow-lg hover:shadow-brand-purple/5 transition-all duration-300 overflow-hidden">
      {/* Gradient top accent */}
      <div className="h-1 bg-linear-to-r from-brand-purple via-brand-indigo to-brand-blue" />

      <div className="p-6">
        {/* Title row */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug flex-1 line-clamp-2">
            {item.article_title}
          </h2>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-lg transition-colors shrink-0"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {item.article_description && (
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-4 line-clamp-1 italic">
            {item.article_description}
          </p>
        )}

        {/* Summary block */}
        <div className="bg-brand-purple/5 dark:bg-brand-purple/10 rounded-xl p-4 border border-brand-purple/10">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={12} className="text-brand-purple" />
            <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">AI Summary</span>
          </div>
          <ul className="space-y-2.5">
            {points.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-linear-to-br from-brand-purple to-brand-indigo shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 flex items-center gap-1 text-brand-indigo dark:text-brand-purple-light font-semibold text-xs hover:text-brand-purple transition-colors"
            >
              {isExpanded ? <><ChevronUp size={14} /> Show Less</> : <><ChevronDown size={14} /> Read More</>}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-xs">
          <span className="text-slate-400 dark:text-slate-500">
            {new Date(item.saved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <a
            href={item.article_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brand-indigo dark:text-brand-purple-light font-semibold hover:text-brand-purple transition-colors"
          >
            Source <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
