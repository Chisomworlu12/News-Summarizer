import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { memo } from 'react';
import Navbar from '../components/layout/Navbar/Navbar.js';
import { useAuth } from '../context/AuthContext.js';
import { useSummaries } from '../hooks/useSummaries.js';
import SummaryCard from '../components/summary/SummaryCard.js';
import LoadingSpinner from '../components/ui/Spinner.js';
import Footer from '../components/layout/Footer.js'

function SavedSummaries() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const { summaries, loading, deleteSummary } = useSummaries(user);


  const handleNavigateToFeed = useCallback(() => {
    navigate('/newsfeed');
  }, [navigate]);

  const handleNavigateToExplore = useCallback(() => {
    navigate('/newsfeed');
  }, [navigate]);

  
  const summaryList = useMemo(
    () => summaries.map((item) => (
      <SummaryCard 
        key={item.id} 
        item={item} 
        handleDelete={deleteSummary} 
      />
    )),
    [summaries, deleteSummary]
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar user={user} handleLogout={handleLogout} />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">Your Saved Summaries</h1>
          <button 
            onClick={handleNavigateToFeed}
            className="text-brand-blue dark:text-dark-brand-blue hover:underline font-medium"
          >
            ← Back to Feed
          </button>
        </div>

        {summaries.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-500 mb-6">You haven't saved any summaries yet.</p>
            <button 
              onClick={handleNavigateToExplore}
              className="bg-brand-blue dark:bg-dark-brand-blue text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Explore News
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {summaryList}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default memo(SavedSummaries);