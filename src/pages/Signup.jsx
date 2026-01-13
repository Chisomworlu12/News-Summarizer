import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
     
      if (data?.user?.identities?.length === 0) {
        setError('User already exists');
      } else {
        navigate('/login');
      }
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
  
  // Checkbox state
 const handleSingleCheckbox = (e) => {
      setAgreeToTerms(e.target.checked);
    };
  return (
    <div className="min-h-screen dark:bg-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-96 my-2">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2 dark:text-gray-300">
            <strong>Create your account</strong>
          </h1>
          <p className="text-gray-600 text-sm mb-6 dark:text-gray-400">
            Get your daily news in seconds.
          </p>

          <div onClick={handleGoogleSignUp} className="flex gap-5 justify-center mb-4">
            <div className="inline-block min-w-[150px] max-w-[180px] border border-gray-300 py-2 px-4 rounded-md cursor-pointer text-center hover:bg-gray-50 transition-colors dark:bg-white dark:hover:bg-gray-100">
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
            <span className="px-4 text-xs dark:text-gray-300">OR SIGNUP WITH EMAIL</span>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
       
       <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm dark:text-gray-300 transition-colors focus:outline-none focus:border-indigo-500"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gra7-300vmb-2 mt-4">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm dark:text-gray-300  transition-colors focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300cursor-pointer hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
            <p className="text-left mt-2 text-sm text-gray-600 dark:text-gray-300">
              Must be at least 8 characters.
            </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full py-3 px-4 border border-gray-300 rounded-md text-sm dark:text-gray-300 transition-colors focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="checkbox-group flex mb-4">
          <label >
            <input
              type="checkbox"
              className="mr-2"
              checked={agreeToTerms}
              onChange={handleSingleCheckbox}
            />
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            By creating an account, you agree to our
            <a href="#" className="text-indigo-500 hover:text-indigo-700">
             
              Terms of Service
            </a>
            and
            <a href="#" className="text-indigo-500 hover:text-indigo-700">
              
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <button
         type="sumbit"
          disabled={loading}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 text-white border-none py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300 dark:hover:shadow-indigo-800 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
         {loading ? 'Loading...' : 'Sign Up'}
        </button>
       </form>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-100 text-gray-600 border-none py-3.5 px-6 rounded-lg text-sm font-semibold cursor-pointer transition-colors w-full hover:bg-gray-200 mb-4"
        >
          Back
        </button>

        <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
          Already have an account?
          <a onClick={() => navigate('/login')} className="text-blue-500">
            Log in
          </a>
        </p>

        {error && (
          <div
            className={`mt-4 p-3 rounded text-center text-sm ${
              error.includes("Error")
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;