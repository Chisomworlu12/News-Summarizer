import { useState, useEffect } from 'react'
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
import { SearchX } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks.js'
import { setCategory, setSearchTerm, refreshRSSFeeds, loadArticles } from '../features/news/newsSlice.js'

function NewsFeed() {
  const [displayCount, setDisplayCount] = useState<number>(9)
  const dispatch = useAppDispatch()

  const { articles, topHeadlines, category, searchTerm, loading, isRefreshing, lastFetchTime, error } = useAppSelector(state => state.news)
  const { user, handleLogout } = useAuth()
  const { summaryCount, showLimitModal, setShowLimitModal, handleSummarize, summaryModal, closeSummaryModal } = useSummary()

  // ENGINE: Watch for category/search changes and fetch data
  useEffect(() => {
    dispatch(loadArticles({ category, searchTerm }))
  }, [category, searchTerm, dispatch])

  const validArticles = articles.filter(article => article.url_to_image)
  const validHeadlines = topHeadlines.filter(article => article.url_to_image)
  
  const handleLoadMore = () => setDisplayCount(prev => prev + 3)
  const hasMore = displayCount < validArticles.length

  const handleCategoryChange = (cat: string) => {
    if (cat === category) return;
    dispatch(setCategory(cat))
    setDisplayCount(9) // Reset count for new category
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar user={user} handleLogout={handleLogout} />
      
      {!user && summaryCount > 0 && (
        <div className="z-20">
          <SummaryCount summaryCount={summaryCount} />
        </div>
      )}
      
      <main className="grow relative">
        {/* Loading Overlay with Backdrop Blur */}
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100/40 dark:bg-gray-900/40 backdrop-blur-sm">
            <LoadingSpinner />
            <p className="mt-4 font-bold animate-pulse text-brand-blue">Loading {category} news...</p>
          </div>
        )}

        {!error && (
          <div className="max-w-6xl mx-auto px-8 pt-4">
            <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {lastFetchTime ? (
                  <>Last updated: <span className="font-semibold">{new Date(lastFetchTime).toLocaleTimeString()}</span></>
                ) : (
                  'Syncing feeds...'
                )}
              </div>
              <Button onClick={() => dispatch(refreshRSSFeeds())} disabled={isRefreshing} className="flex items-center gap-2">
                {isRefreshing ? 'Updating...' : '🔄 Refresh'}
              </Button>
            </div>
          </div>
        )}

        {error && <div className="max-w-6xl mx-auto px-8"><ErrorAlert error={error} /></div>}
        
        {/* News Content Area */}
        <div className={`max-w-6xl mx-auto px-8 pb-12 transition-all duration-300 ${loading ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}>
          
          <Categories setCategory={handleCategoryChange} activeCategory={category} />
          
          {!loading && validArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-7xl mb-4 text-gray-300 dark:text-gray-600">
                <SearchX size={100} strokeWidth={1} />
              </div>
              <h2 className="text-2xl font-bold">No articles found</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
                No articles available for "{searchTerm || category}"
              </p>
              {searchTerm && <Button onClick={() => dispatch(setSearchTerm(''))}>Clear Search</Button>}
            </div>
          ) : (
            <>
              {!searchTerm && validHeadlines.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Top Headlines</h2>
                  <HeadlineSlider>
                    {validHeadlines.slice(0, 4).map((article) => (
                      <NewsCard key={article.url} article={article} handleSummarize={handleSummarize} />
                    ))}
                  </HeadlineSlider>
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-6 capitalize">
                {searchTerm ? `Results for "${searchTerm}"` : `${category} News`}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {validArticles.slice(0, displayCount).map((article) => (
                  <NewsCard 
                    key={article.url}  
                    article={article} 
                    handleSummarize={handleSummarize}
                  />
                ))}   
              </div>
              
              {hasMore && !loading && (
                <div className="flex justify-center mt-12">
                  <Button onClick={handleLoadMore}>Load More</Button>
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