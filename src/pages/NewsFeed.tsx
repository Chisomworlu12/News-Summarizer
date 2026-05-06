import { useEffect, useState, useCallback, useMemo } from 'react'
import Navbar from '../components/layout/Navbar/Navbar.js'
import NewsCard from '../components/news/NewsCard.js'
import { useSummary } from '../hooks/useSummary.js'
import LimitModal from '../components/summary/LimitModal.js'
import SummaryCount from '../components/summary/SummaryCount.js'
import HeadlineSlider from '../components/news/HeadlineSlider.js'
import Categories from '../components/news/Categories.js'
import ErrorAlert from '../components/ui/Error.js'
import LoadingSpinner from '../components/ui/Spinner.js'
import Button from '../components/ui/Button.js'
import SummaryModal from '../components/summary/SummaryModal.js'
import { useAuth } from '../context/AuthContext.js'
import Footer from '../components/layout/Footer.js'
import { SearchX, RefreshCw, Clock } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks.js'
import { setCategory, setSearchTerm, refreshRSSFeeds, loadArticles } from '../features/news/newsSlice.js'

function NewsFeed() {
  const [displayCount, setDisplayCount] = useState<number>(9)
  const dispatch = useAppDispatch()

  const { articles, topHeadlines, category, searchTerm, loading, isRefreshing, lastFetchTime, error } =
    useAppSelector(state => state.news)

  const { summaryCount, showLimitModal, setShowLimitModal, handleSummarize, summaryModal, closeSummaryModal } =
    useSummary()

  const { user } = useAuth()

  useEffect(() => {
    dispatch(loadArticles({ category, searchTerm }))
  }, [category, searchTerm, dispatch])

  const validArticles = useMemo(() => articles.filter(a => a.url_to_image), [articles])
  const validHeadlines = useMemo(() => topHeadlines.filter(a => a.url_to_image), [topHeadlines])
  const displayedArticles = useMemo(() => validArticles.slice(0, displayCount), [validArticles, displayCount])
  const hasMore = displayCount < validArticles.length

  const handleLoadMore = useCallback(() => setDisplayCount(prev => prev + 3), [])

  const handleCategoryChange = useCallback((cat: string) => {
    dispatch(setCategory(cat))
    dispatch(setSearchTerm(''))
    setDisplayCount(9)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dispatch])

  const handleRefresh = useCallback(() => dispatch(refreshRSSFeeds()), [dispatch])

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {!user && summaryCount > 0 && (
        <div className="z-20">
          <SummaryCount summaryCount={summaryCount} />
        </div>
      )}

      <main className="grow relative">
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-md">
            <LoadingSpinner />
            <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-400 animate-pulse">
              Fetching {category} news…
            </p>
          </div>
        )}

        {!error && (
          <div className="max-w-6xl mx-auto px-4 md:px-8 pt-5">
            <div className="flex justify-between items-center mb-5 bg-white dark:bg-slate-900/60 rounded-2xl px-5 py-3 border border-slate-200/60 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Clock size={14} className="text-brand-purple shrink-0" />
                {lastFetchTime
                  ? <>Last updated: <span className="font-bold text-slate-700 dark:text-slate-300">{formatTime(lastFetchTime)}</span></>
                  : 'Syncing feeds…'
                }
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-brand-purple dark:text-brand-purple-light border border-brand-purple/20 hover:bg-brand-purple/5 transition-all disabled:opacity-50"
              >
                <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
                {isRefreshing ? 'Updating…' : 'Refresh'}
              </button>
            </div>
          </div>
        )}

        {error && <div className="max-w-6xl mx-auto px-4 md:px-8"><ErrorAlert error={error} /></div>}

        <div className={`max-w-6xl mx-auto px-4 md:px-8 pb-16 transition-all duration-500 ${
          loading ? 'opacity-40 pointer-events-none' : 'opacity-100'
        }`}>
          <Categories setCategory={handleCategoryChange} activeCategory={category} />

          {!loading && validArticles.length === 0 && searchTerm !== '' ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <SearchX size={80} strokeWidth={1} className="text-slate-300 dark:text-slate-700 mb-5" />
              <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">No articles found</h2>
              <p className="text-slate-400 dark:text-slate-500 mt-2 mb-6 text-sm">
                No results for "<span className="font-semibold">{searchTerm}</span>"
              </p>
              <Button onClick={() => dispatch(setSearchTerm(''))}>Clear Search</Button>
            </div>
          ) : (
            <>
              {!searchTerm && validHeadlines.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="w-1 h-6 rounded-full bg-linear-to-b from-brand-purple to-brand-pink inline-block" />
                    Top Headlines
                  </h2>
                  <HeadlineSlider>
                    {validHeadlines.slice(0, 4).map((article) => (
                      <NewsCard key={article.url} article={article} handleSummarize={handleSummarize} />
                    ))}
                  </HeadlineSlider>
                </div>
              )}

              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-linear-to-b from-brand-indigo to-brand-blue inline-block" />
                {searchTerm ? `Results for "${searchTerm}"` : 'Latest News'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedArticles.map((article) => (
                  <NewsCard key={article.url} article={article} handleSummarize={handleSummarize} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button onClick={handleLoadMore}>Load More Articles</Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {showLimitModal && <LimitModal setShowLimitModal={setShowLimitModal} />}
      <SummaryModal
        isOpen={summaryModal.isOpen}
        onClose={closeSummaryModal}
        summary={summaryModal.summary}
        article={summaryModal.article}
        isLoading={summaryModal.isLoading}
        user={user}
      />
    </div>
  )
}

export default NewsFeed
