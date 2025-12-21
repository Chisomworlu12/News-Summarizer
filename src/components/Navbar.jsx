import { useNavigate } from "react-router-dom"

export default function Navbar({user, handleLogout}) {
    const navigate = useNavigate()

    return(
        <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">News Summarizer</h1>
          
          <div className="flex gap-4">
            {user ? (
              <>
                <button 
                  onClick={() => navigate('/saved')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Saved Summaries
                </button>
                <span className="text-gray-600">{user.email}</span>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
               
                <button 
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

    )
}