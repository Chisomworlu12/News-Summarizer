import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { signIn,signInWithGoogle } = useAuth();
   
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true) 
    
    const { error } = await signIn({ email, password });

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      navigate('/')
    }
    setLoading(false) 

     
  }

  
 const handleGoogleSignIn = async () => {
  setLoading(true);
  setMessage('');
  
  const { error } = await signInWithGoogle(); 

  if (error) {
    setMessage('Error: ' + error.message);
    setLoading(false);
  }
 
};

  
  return (
    <div className="min-h-screen m-10 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-96 my-2">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">
            <strong>Welcome back</strong>
          </h1>
          <p className="text-gray-600 text-sm mb-6">Get your daily news in seconds.</p>
          
          <div className="flex gap-5 justify-center mb-4">
            {/* 🆕 UPDATED: Added onClick to Google button */}
            <div 
              onClick={handleGoogleSignIn} // 👈 This makes it work!
              className="inline-block min-w-[150px] max-w-[180px] border border-gray-300 py-2 px-4 rounded-md cursor-pointer text-center hover:bg-gray-50 transition-colors"
            >
              <p className="flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
                  <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                </svg>
                <strong>Google</strong>
              </p>
            </div>

          </div>

          <div className="flex items-center text-center my-5 text-gray-600">
            <div className="flex-1 border-b border-gray-300"></div>
            <span className="px-4 text-xs">OR LOGIN WITH EMAIL</span>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
         
       <form onSubmit={handleLogin}> 
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-indigo-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <p className="text-right text-sm mb-2">
          <a  onClick={() => navigate('/forgot-password')}  className="text-indigo-500 hover:text-indigo-700">
            Forgot Password?
          </a>
        </p>

        <button 
          type="submit"
          disabled={loading} 
          className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Log In'}
        </button>
         </form> 
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-100 text-gray-600 border-none py-3.5 px-6 rounded-lg text-sm font-semibold cursor-pointer transition-colors w-full hover:bg-gray-200 mb-4"
        >
          Back
        </button>

        <p className="text-center mt-2 text-sm text-gray-600">
          Don't have an account?
          <span 
            onClick={() => navigate('/signup')} 
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
        
        {message && (
          <div className={`mt-4 p-3 rounded text-center text-sm ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login