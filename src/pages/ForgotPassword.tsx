import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setEmailSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 w-80 h-80 bg-brand-indigo/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to login
        </button>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {emailSent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-brand-green" />
              </div>
              <h1 className="text-2xl font-black text-white mb-2">Check your inbox</h1>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                We sent a password reset link to <strong className="text-white">{email}</strong>. Check your spam folder too.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-brand-purple to-brand-indigo shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mx-auto mb-4">
                  <Mail size={26} className="text-brand-purple-light" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2">Forgot password?</h1>
                <p className="text-white/60 text-sm">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1.5">Email</label>
                  <input
                    type="email" placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-purple-light transition-all"
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r from-brand-purple to-brand-indigo hover:from-brand-purple-light hover:to-brand-indigo shadow-lg shadow-brand-purple/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>

              {errorMsg && (
                <div className="mt-4 p-3 rounded-xl text-center text-sm bg-red-500/20 border border-red-500/30 text-red-200">
                  {errorMsg}
                </div>
              )}

              <p className="text-center mt-5 text-sm text-white/50">
                Remember it?{' '}
                <span onClick={() => navigate('/login')} className="text-white font-bold cursor-pointer hover:text-brand-purple-light transition-colors">
                  Log in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
