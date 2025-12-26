import { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import NewsCard from '../components/NewsCard'
import { NewsContext } from '../context/NewsContext'
import { useAuthAndSummary } from '../hooks/useAuthAndSummary'
import LimitModal from '../components/LimitModal'
import SummaryCount from '../components/SummaryCount'
import HeadlineSlider from '../components/HeadlineSlider'
import Categories from '../components/Categories'
import ErrorAlert from '../components/Error'
import LoadingSpinner from '../components/Spinner'
import Button from '../components/Button'
import SummaryModal from '../components/SummaryModal'

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
    lastFetchTime
  } = useContext(NewsContext)
  
  const { 
    user,
    summaryCount,
    showLimitModal,
    setShowLimitModal,
    handleSummarize,
    handleLogout,
    summaryModal,
    closeSummaryModal
  } = useAuthAndSummary()
 
 
  const validArticles = articles.filter(article => 
    article.url_to_image || article.fields?.thumbnail
  )
  const validHeadlines = topHeadlines.filter(article => 
    article.url_to_image || article.fields?.thumbnail
  )
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3) 
  }

  const hasMore = displayCount < articles.length

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} handleLogout={handleLogout} />
     
      {!user && summaryCount > 0 && (
        <SummaryCount summaryCount={summaryCount} />
      )}
      
    
      {!loading && !error && (
        <div className="max-w-6xl mx-auto px-8 pt-4">
          <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">
              {lastFetchTime ? (
                <>
                  Last updated: <span className="font-semibold">{new Date(lastFetchTime).toLocaleTimeString()}</span>
                </>
              ) : (
                'Loading news...'
              )}
            </div>
            <Button 
              onClick={refreshRSSFeeds} 
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              {isRefreshing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>🔄 Refresh News</>
              )}
            </Button>
          </div>
        </div>
      )}
      
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
      
      {!loading && !error && (
        <div className="max-w-6xl mx-auto p-8">
          <Categories setCategory={setCategory} activeCategory={category} />
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Top Headlines</h2>
            <HeadlineSlider>
              {validHeadlines.slice(0, 4).map((article) => (
                <NewsCard 
                  key={article.id || article.url} 
                  article={article} 
                  handleSummarize={handleSummarize} 
                />
              ))}
            </HeadlineSlider>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {validArticles.slice(0, displayCount).map((article) => (
              <NewsCard 
                key={article.id || article.url}  
                article={article} 
                handleSummarize={handleSummarize}
              />
            ))}   
          </div>
          
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          )}

          {!hasMore && articles.length > 0 && (
            <p className="text-center text-gray-600 mt-8">
              You've reached the end of the articles
            </p>
          )}
        </div>
      )}

      {showLimitModal && (
        <LimitModal setShowLimitModal={setShowLimitModal} />
      )}

   <SummaryModal
        isOpen={summaryModal.isOpen}
        onClose={closeSummaryModal}
        summary={summaryModal.summary}
        article={summaryModal.article}
        isLoading={summaryModal.isLoading}
      />
    </div>
  )
}

export default NewsFeed