import { useNavigate } from "react-router-dom"


function LimitModal({ setShowLimitModal }) {
    const navigate = useNavigate()
   
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h3 className="text-2xl font-bold mb-4">You've used 3 free summaries!</h3>
            <p className="text-gray-700 mb-6">
              Create a free account to get unlimited summaries and save your favorites.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Create Account
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50"
              >
                Login
              </button>
            </div>
            <button 
              onClick={() => setShowLimitModal(false)}
              className="w-full mt-4 text-gray-600 hover:text-gray-800"
            >
              Maybe later
            </button>
          </div>
        </div>
    )
}

export default LimitModal
