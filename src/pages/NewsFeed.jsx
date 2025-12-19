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

function NewsFeed() {
const [displayCount, setDisplayCount] = useState(9)

const {articles,category, setCategory,topHeadlines,loading,error} = useContext(NewsContext)
const { user,
    summaryCount,
    showLimitModal,
    handleSummarize,setShowLimitModal,
    handleLogout} = useAuthAndSummary()
 
const validArticles = articles.filter(article => article.urlToImage)
const validHeadlines = topHeadlines.filter(article => article.urlToImage)
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
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
      {!loading && !error && <div className="max-w-6xl mx-auto p-8">

        <Categories setCategory={setCategory} activeCategory={category} />
      <div>
        <h2 className="text-3xl font-bold mb-6">Top Headlines</h2>
         <HeadlineSlider>
          {validHeadlines.slice(0,4).map((article) => (
            <NewsCard key={article.url} article={article} handleSummarize={handleSummarize} />))}
         </HeadlineSlider>
        </div>
      <h2 className="text-3xl font-bold mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
             {validArticles.slice(0, displayCount).map((article) => (
        <NewsCard key={article.url}  article={article} handleSummarize={handleSummarize}/>
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
       
      </div>}

      {showLimitModal && (<LimitModal setShowLimitModal={setShowLimitModal} />
       
      )}
    </div>
  )
}

export default NewsFeed