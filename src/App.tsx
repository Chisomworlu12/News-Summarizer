import Signup from './pages/Signup.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import NewsFeed from './pages/NewsFeed.jsx'
import SavedSummary from './pages/SavedSummary.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { AuthProvider } from './context/AuthContext.js'
import Home from './pages/Home.js'
import AppInitializer from './components/ui/AppInitializer.js'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppInitializer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newsfeed" element={<NewsFeed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/savedsummary" element={<SavedSummary />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App