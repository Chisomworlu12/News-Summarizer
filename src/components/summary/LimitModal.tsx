import { useNavigate } from "react-router-dom"
import { X, Sparkles, ArrowRight } from "lucide-react"

interface LimitModalProps {
  setShowLimitModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LimitModal: React.FC<LimitModalProps> = ({ setShowLimitModal }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-200/60 dark:border-white/10">
        <button
          onClick={() => setShowLimitModal(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-brand-purple to-brand-pink flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-purple/30">
          <Sparkles size={28} className="text-white" />
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center mb-2">
          Free limit reached
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-7 leading-relaxed">
          You've used your 2 free summaries. Create a free account for unlimited summaries and saving.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-brand-purple to-brand-indigo hover:from-brand-purple-light hover:to-brand-indigo shadow-lg shadow-brand-purple/30 hover:-translate-y-0.5 transition-all"
          >
            Create Free Account <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 rounded-xl font-semibold text-sm text-brand-indigo dark:text-brand-purple-light border border-brand-indigo/20 dark:border-brand-purple/20 hover:bg-brand-indigo/5 dark:hover:bg-brand-purple/10 transition-colors"
          >
            Already have an account? Login
          </button>
        </div>

        <button
          onClick={() => setShowLimitModal(false)}
          className="w-full mt-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}

export default LimitModal
