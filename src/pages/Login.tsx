import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext.js'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
    <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
  </svg>
)

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { signIn, signInWithGoogle } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await signIn({ email, password })
    if (error) {
      setMessage(error.message)
      setLoading(false)
    } else {
      navigate('/newsfeed')
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setMessage('')
    const { error } = await signInWithGoogle()
    if (error) {
      setMessage(error.message)
      setGoogleLoading(false)
    }
  }

  const anyLoading = loading || googleLoading

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      {/* Decorative orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-brand-pink/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
            <p className="text-white/60 text-sm">Get your daily news in seconds</p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={anyLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-white/90 text-slate-700 font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mb-5"
          >
            {googleLoading ? <span>Loading…</span> : <><GoogleIcon /> Continue with Google</>}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">or email</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={anyLoading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-purple-light focus:bg-white/15 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={anyLoading}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-purple-light focus:bg-white/15 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <p className="text-right mt-1.5">
                <span
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-white/50 hover:text-white/80 cursor-pointer transition-colors"
                >
                  Forgot password?
                </span>
              </p>
            </div>

            <button
              type="submit"
              disabled={anyLoading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-brand-purple to-brand-indigo hover:from-brand-purple-light hover:to-brand-indigo shadow-lg shadow-brand-purple/40 hover:shadow-brand-purple/60 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-white/50">
            No account?{' '}
            <span onClick={() => navigate('/signup')} className="text-white font-bold cursor-pointer hover:text-brand-purple-light transition-colors">
              Sign up free
            </span>
          </p>

          {message && (
            <div className="mt-4 p-3 rounded-xl text-center text-sm bg-red-500/20 border border-red-500/30 text-red-200">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
