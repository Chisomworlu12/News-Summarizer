import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, SearchX } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({}); 
    
    let errors = {};

    if (password !== confirmPassword) {
      errors.password = "Passwords do not match";
    }

    if (!agreeToTerms) {
      errors.checkbox = "You must agree to the terms";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const { data, error: apiError } = await signUp({ email, password });

      if (apiError) {
        setError(apiError.message);
        setLoading(false);
        return;
      }

    
      setLoading(false);

     
      if (data?.user?.identities?.length === 0) {
        setError('An account with this email already exists. Please log in.');
        return;
      }

    
      if (data?.user && !data?.session) {
        setError('Success! Please check your email inbox to confirm your account.');
       
        setEmail(""); setPassword(""); setConfirmPassword("");
      } 
      
      
      else {
        setError('Account created! Redirecting to home...');
        setTimeout(() => navigate('/'), 2000);
      }

    } catch (err) {
      setError("An unexpected error occurred. Please try again.", err);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md my-2">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2 dark:text-gray-300">
            Create your account
          </h1>
          <p className="text-gray-600 text-sm mb-6 dark:text-gray-400">
            Get your daily news in seconds.
          </p>

          <button 
            type="button"
            onClick={handleGoogleSignUp} 
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2.5 px-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors dark:bg-white dark:hover:bg-gray-100 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
            </svg>
            <span className="font-semibold text-gray-700">Continue with Google</span>
          </button>

          <div className="flex items-center text-center my-6 text-gray-400">
            <div className="flex-1 border-b border-gray-300"></div>
            <span className="px-4 text-xs font-semibold uppercase tracking-wider">or email</span>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email Address</label>
            <input
              required
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Confirm Password</label>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full py-2.5 px-4 border rounded-lg text-sm outline-none transition-all dark:bg-gray-800 dark:text-white ${fieldErrors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
              By creating an account, you agree to our <a href="#" className="text-indigo-500 font-medium">Terms</a> and <a href="#" className="text-indigo-500 font-medium">Privacy Policy</a>.
            </label>
          </div>
          {fieldErrors.checkbox && <p className="text-red-500 text-xs mt-1">{fieldErrors.checkbox}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button onClick={() => navigate('/login')} className="text-indigo-500 font-semibold hover:underline">
              Log in
            </button>
          </p>
        </div>

        {error && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${error.includes("Success") || error.includes("Check") ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;