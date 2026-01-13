import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

   
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,  
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setEmailSent(true)
      setMessage('Check your email! We sent you a password reset link.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen dark:bg-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-96">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:hover:text-gray-300 mb-4 dark:text-gray-300"
        >
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 dark:text-gray-300">Forgot Password?</h1>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            {emailSent 
              ? "Check your inbox for the reset link" 
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm dark:text-gray-300 transition-colors focus:outline-none focus:border-indigo-500 "
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 text-white border-none py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300 dark:hover:shadow-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-4">
              <p className="font-medium">✓ Email Sent!</p>
              <p className="text-sm mt-1">Check your inbox and spam folder</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="text-indigo-500 hover:text-indigo-700 text-sm"
            >
              Return to Login
            </button>
          </div>
        )}

        {message && !emailSent && (
          <div className={`mt-4 p-3 rounded text-center text-sm ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-600' 
              : 'bg-green-50 text-green-600'
          }`}>
            {message}
          </div>
        )}

        <p className="text-center text-sm dark:text-gray-300 text-gray-600 mt-4">
          Remember your password?
          <span 
            onClick={() => navigate('/login')} 
            className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword