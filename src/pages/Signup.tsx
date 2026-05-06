import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const navigate = useNavigate()
  const { signUp, signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const errs: Record<string, string> = {}
    if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!agreeToTerms) errs.checkbox = 'You must agree to the terms'
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setLoading(true)
    try {
      const { data, error: apiError } = await signUp({ email, password })
      if (apiError) { setError(apiError.message); setLoading(false); return }

      setLoading(false)
      if (data?.user?.identities?.length === 0) {
        setError('An account with this email already exists. Please log in.')
        return
      }
      if (data?.user && !data?.session) {
        setError('Success! Check your email to confirm your account.')
        setEmail(''); setPassword(''); setConfirmPassword(''); setAgreeToTerms(false)
      } else if (data?.session) {
        setError('Account created! Redirecting…')
        setTimeout(() => navigate('/newsfeed'), 1500)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true)
    setError('')
    const { error } = await signInWithGoogle()
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  const anyLoading = loading || googleLoading

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      <div className="fixed top-0 right-0 w-96 h-96 bg-brand-indigo/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-brand-pink/15 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Create account</h1>
            <p className="text-white/60 text-sm">Start reading smarter today — it's free</p>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={anyLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-white/90 text-slate-700 font-semibold text-sm transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mb-5"
          >
            {googleLoading ? 'Loading…' : <><GoogleIcon /> Continue with Google</>}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">or email</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">Email</label>
              <input
                required type="email" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} disabled={anyLoading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-purple-light transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">Password</label>
              <div className="relative">
                <input
                  required type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} disabled={anyLoading}
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border text-white placeholder-white/30 text-sm focus:outline-none transition-all disabled:opacity-50 ${fieldErrors.password ? 'border-red-400' : 'border-white/20 focus:border-brand-purple-light'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-red-300 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  required type={showConfirm ? 'text' : 'password'} placeholder="••••••••"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={anyLoading}
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border text-white placeholder-white/30 text-sm focus:outline-none transition-all disabled:opacity-50 ${fieldErrors.confirmPassword ? 'border-red-400' : 'border-white/20 focus:border-brand-purple-light'}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && <p className="text-red-300 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2.5">
              <input
                type="checkbox" id="terms" checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)} disabled={anyLoading}
                className="mt-0.5 rounded border-white/30 bg-white/10 text-brand-purple focus:ring-brand-purple disabled:opacity-50"
              />
              <label htmlFor="terms" className="text-xs text-white/50 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-white/80 underline hover:text-white">Terms</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-white/80 underline hover:text-white">Privacy Policy</Link>
              </label>
            </div>
            {fieldErrors.checkbox && <p className="text-red-300 text-xs">{fieldErrors.checkbox}</p>}

            <button
              type="submit" disabled={anyLoading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-brand-purple to-brand-indigo hover:from-brand-purple-light hover:to-brand-indigo shadow-lg shadow-brand-purple/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-white/50">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="text-white font-bold cursor-pointer hover:text-brand-purple-light transition-colors">
              Log in
            </span>
          </p>

          {error && (
            <div className={`mt-4 p-3 rounded-xl text-center text-sm border ${
              error.includes('Success') || error.includes('check your email') || error.includes('Redirecting')
                ? 'bg-brand-green/20 border-brand-green/30 text-green-200'
                : 'bg-red-500/20 border-red-500/30 text-red-200'
            }`}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup
