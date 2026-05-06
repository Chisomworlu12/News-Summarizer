import { useNavigate } from 'react-router-dom'
import { useSavedSummary } from '../../hooks/useSavedSummary.js'
import { Bookmark, Check, ExternalLink, X, Sparkles } from 'lucide-react'

interface SummaryModalProps {
  isOpen: boolean
  onClose: () => void
  summary: string
  article: { title: string; url: string } | null
  isLoading: boolean
  user: any
}

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose, summary, article, isLoading, user }) => {
  const { saving, isSaved, saveSummary } = useSavedSummary({ user, article })
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleSave = async () => {
    const result = await saveSummary(summary)
    if (result?.error) console.error(result.error)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div onClick={onClose} className="absolute inset-0" />

      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-black/30 max-w-2xl w-full max-h-[88vh] flex flex-col z-10 overflow-hidden border border-slate-200/60 dark:border-white/10">

        {/* Header */}
        <div className="bg-linear-to-r from-brand-purple via-brand-indigo to-brand-blue p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Summary</h2>
                <p className="text-white/60 text-xs mt-0.5">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X size={20} />
            </button>
          </div>
          {article && (
            <p className="text-white/70 text-sm mt-4 line-clamp-2 italic leading-relaxed">
              "{article.title}"
            </p>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-purple border-r-brand-indigo animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand-pink animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse">
                Analyzing article content…
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 border border-slate-200/60 dark:border-white/10">
                <ul className="space-y-3">
                  {summary
                    .split('\n')
                    .map(line => line.replace(/^[\s•\-\*\d+\.\)]+/, '').trim())
                    .filter(Boolean)
                    .map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-linear-to-br from-brand-purple to-brand-indigo shrink-0" />
                        {point}
                      </li>
                    ))
                  }
                </ul>
              </div>

              {article?.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-indigo dark:text-brand-purple-light hover:text-brand-purple font-semibold text-sm transition-colors group"
                >
                  Read full story
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row gap-3 bg-slate-50/80 dark:bg-white/3">
          {user && !isLoading && summary && (
            <button
              onClick={handleSave}
              disabled={saving || isSaved}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all
                ${isSaved
                  ? 'bg-brand-green/15 text-brand-green border border-brand-green/30 cursor-default'
                  : 'bg-brand-green text-white hover:bg-brand-green/90 active:scale-95 shadow-md shadow-brand-green/25 disabled:opacity-60'
                }`}
            >
              {saving ? 'Saving…' : isSaved ? <><Check size={16} /> Saved</> : <><Bookmark size={16} /> Save Summary</>}
            </button>
          )}

          {!user && !isLoading && (
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 flex-1 flex items-center justify-center">
              Want to keep this?&nbsp;
              <span
                onClick={() => navigate('/signup')}
                className="text-brand-indigo dark:text-brand-purple-light font-bold cursor-pointer hover:underline"
              >
                Sign up free
              </span>
            </p>
          )}

          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl hover:bg-slate-300 dark:hover:bg-white/15 transition-all font-semibold text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SummaryModal
