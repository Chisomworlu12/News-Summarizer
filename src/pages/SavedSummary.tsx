import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo, memo } from 'react'
import Navbar from '../components/layout/Navbar/Navbar.js'
import { useAuth } from '../context/AuthContext.js'
import { useSummaries } from '../hooks/useSummaries.js'
import SummaryCard from '../components/summary/SummaryCard.js'
import LoadingSpinner from '../components/ui/Spinner.js'
import Footer from '../components/layout/Footer.js'
import Button from '../components/ui/Button.js'
import { BookOpen, ArrowLeft } from 'lucide-react'

function SavedSummaries() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { summaries, loading, deleteSummary } = useSummaries(user)

  const handleNavigateToFeed = useCallback(() => navigate('/newsfeed'), [navigate])

  const summaryList = useMemo(
    () => summaries.map((item) => (
      <SummaryCard key={item.id} item={item} handleDelete={deleteSummary} />
    )),
    [summaries, deleteSummary]
  )

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <LoadingSpinner />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-10 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-linear-to-br from-brand-purple to-brand-indigo flex items-center justify-center shrink-0 shadow-md shadow-brand-purple/30">
                <BookOpen size={20} className="text-white" />
              </span>
              Saved Summaries
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 ml-13">
              {summaries.length} {summaries.length === 1 ? 'summary' : 'summaries'} saved
            </p>
          </div>
          <button
            onClick={handleNavigateToFeed}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-indigo dark:text-brand-purple-light hover:text-brand-purple transition-colors"
          >
            <ArrowLeft size={16} /> Back to Feed
          </button>
        </div>

        {summaries.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-14 text-center border border-slate-200/60 dark:border-white/5 shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center mx-auto mb-5">
              <BookOpen size={36} className="text-brand-purple/50" />
            </div>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Nothing saved yet</h2>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-7 max-w-xs mx-auto">
              Summarize articles on the news feed and save your favorites here.
            </p>
            <Button onClick={handleNavigateToFeed}>Explore News</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {summaryList}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default memo(SavedSummaries)
