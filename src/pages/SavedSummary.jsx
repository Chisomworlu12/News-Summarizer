import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../context/AuthContext';
import { useSummaries } from '../hooks/useSummaries';
import SummaryCard from '../components/SummaryCard';
import LoadingSpinner from '../components/Spinner';

function SavedSummaries() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { summaries, loading, deleteSummary } = useSummaries(user);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} handleLogout={signOut} />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Saved Summaries</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to Feed
          </button>
        </div>

        {summaries.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-500 mb-6">You haven't saved any summaries yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Explore News
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {summaries.map((item) => (
              <SummaryCard 
                key={item.id} 
                item={item} 
                handleDelete={deleteSummary} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedSummaries;