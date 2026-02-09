import { useNavigate } from "react-router-dom"

interface LimitModalProps{
  setShowLimitModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LimitModal:React.FC<LimitModalProps>=({ setShowLimitModal }) => {
    const navigate = useNavigate()
   
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md">
            <h3 className="text-2xl font-bold mb-4">You've used 2 free summaries!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
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
                className="flex-1 border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded hover:bg-blue-50"
              >
                Login
              </button>
            </div>
            <button 
              onClick={() => setShowLimitModal(false)}
              className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
            >
              Maybe later
            </button>
          </div>
        </div>
    )
}

export default LimitModal
