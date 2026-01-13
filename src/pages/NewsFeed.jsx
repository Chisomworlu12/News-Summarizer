import { useContext, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import NewsCard from '../components/NewsCard'
import { NewsContext } from '../context/NewsContext'
import { useSummary } from '../hooks/useSummary'
import LimitModal from '../components/LimitModal'
import SummaryCount from '../components/SummaryCount'
import HeadlineSlider from '../components/HeadlineSlider'
import Categories from '../components/Categories'
import ErrorAlert from '../components/Error'
import LoadingSpinner from '../components/Spinner'
import Button from '../components/Button'
import SummaryModal from '../components/SummaryModal'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import { SearchX } from 'lucide-react'

function NewsFeed() {
  const [displayCount, setDisplayCount] = useState(9)

  const {
    articles,
    category, 
    setCategory,
    topHeadlines,
    loading,
    error,
    refreshRSSFeeds,
    isRefreshing,
    lastFetchTime,
    searchTerm,
    setSearchTerm
  } = useContext(NewsContext)
  
  const { 
    summaryCount,
    showLimitModal,
    setShowLimitModal,
    handleSummarize,
    summaryModal,
    closeSummaryModal
  } = useSummary()

  const { user, handleLogout } = useAuth()

  const validArticles = articles.filter(article => 
    article.url_to_image || article.fields?.thumbnail
  )
  const validHeadlines = topHeadlines.filter(article => 
    article.url_to_image || article.fields?.thumbnail
  )
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3) 
  }

  const hasMore = displayCount < validArticles.length

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar user={user} handleLogout={handleLogout} />
      
      {!user && summaryCount > 0 && (
        <div className="z-20">
          <SummaryCount summaryCount={summaryCount} />
        </div>
      )}
      
      <main className="flex-grow relative">
      {loading && (<LoadingSpinner />)}
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
              <Button onClick={refreshRSSFeeds} disabled={isRefreshing} className="flex items-center gap-2">
                {isRefreshing ? 'Updating...' : '🔄 Refresh'}
              </Button>
            </div>
          </div>
        )}

        {error && <div className="max-w-6xl mx-auto px-8"><ErrorAlert error={error} /></div>}
        
       
        <div className={`max-w-6xl mx-auto px-8 pb-12 transition-all duration-300 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          
          <Categories setCategory={setCategory} activeCategory={category} />
          
         
          {!loading && validArticles.length === 0 && searchTerm !== '' ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-7xl mb-4 text-gray-300 dark:text-gray-600">
                <SearchX size={100} strokeWidth={1} />
              </div>
              <h2 className="text-2xl font-bold">No articles found</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
                We couldn't find matches for "{searchTerm}"
              </p>
              <Button onClick={() => setSearchTerm('')} variant="outline">Clear Search</Button>
            </div>
          ) : (
            <>
              
              {!searchTerm && validHeadlines.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Top Headlines</h2>
                  <HeadlineSlider>
                    {validHeadlines.slice(0, 4).map((article) => (
                      <NewsCard key={article.id || article.url} article={article} handleSummarize={handleSummarize} />
                    ))}
                  </HeadlineSlider>
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-6">
                {searchTerm ? `Results for "${searchTerm}"` : 'Latest News'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {validArticles.slice(0, displayCount).map((article) => (
                  <NewsCard 
                    key={article.id || article.url}  
                    article={article} 
                    handleSummarize={handleSummarize}
                  />
                ))}   
              </div>
              
              {hasMore && (
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