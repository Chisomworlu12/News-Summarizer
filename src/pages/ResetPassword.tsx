import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle, KeyRound } from 'lucide-react'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User is now in password recovery mode — form is ready
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) { setMessage('Passwords do not match'); return }
    if (password.length < 6) { setMessage('Password must be at least 6 characters'); return }

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-brand-green" />
              </div>
              <h1 className="text-2xl font-black text-white mb-2">Password reset!</h1>
              <p className="text-white/60 text-sm">Redirecting you to login…</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-indigo/20 border border-brand-indigo/30 flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={26} className="text-brand-purple-light" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2">New password</h1>
                <p className="text-white/60 text-sm">Choose a strong password for your account.</p>
              </div>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                      value={password} onChange={(e) => setPassword(e.target.value)} required
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-purple-light transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'} placeholder="••••••••"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-purple-light transition-all"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-brand-purple to-brand-indigo hover:from-brand-purple-light hover:to-brand-indigo shadow-lg shadow-brand-purple/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting…' : 'Reset Password'}
                </button>
              </form>

              {message && (
                <div className="mt-4 p-3 rounded-xl text-center text-sm bg-red-500/20 border border-red-500/30 text-red-200">
                  {message}
                </div>
              )}

              <p className="text-center mt-5 text-sm">
                <span onClick={() => navigate('/login')} className="text-white/50 hover:text-white cursor-pointer transition-colors text-sm">
                  ← Back to Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
