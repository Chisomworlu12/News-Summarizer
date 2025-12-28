
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import { useAuthAndSummary } from '../hooks/useAuthAndSummary';
import { useSummaries } from '../hooks/useSummaries';
import SummaryCard from '../components/SummaryCard';

function SavedSummaries() {
  
  const navigate = useNavigate();
  const { user, handleLogout } = useAuthAndSummary();
  const { summaries, loading, deleteSummary } = useSummaries(user);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} handleLogout={handleLogout} />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Saved Summaries</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to News
          </button>
        </div>

        {summaries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No saved summaries yet</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Start Reading News
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {summaries.map((item) => (
              <SummaryCard key={item.id} 
                item={item} 
                handleDelete={() => deleteSummary(item.id)}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedSummaries;