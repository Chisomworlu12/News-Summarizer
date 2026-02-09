import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const ResetPassword = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const navigate = useNavigate()

  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
   
        console.log("Ready to reset password")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    

    if (password !== confirmPassword) {
      setMessage('Error: Passwords do not match')
      return
    }

    // Validate password length
    if (password.length < 6) {
      setMessage('Error: Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setMessage('')

    // Update the password
    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Success! Your password has been reset.')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen dark:bg-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 dark:text-gray-300">Reset Password</h1>
          <p className="text-gray-600 text-sm dark:text-gray-400">Enter your new password</p>
        </div>

        <form onSubmit={handleResetPassword}>
         
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

         
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-indigo-500 dark:text-gray-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
             className="bg-linear-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 text-white border-none py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300 dark:hover:shadow-indigo-800 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded text-center text-sm ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-600' 
              : 'bg-green-50 text-green-600'
          }`}>
            {message}
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          <span 
            onClick={() => navigate('/login')} 
            className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword