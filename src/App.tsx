import Signup from './pages/Signup.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import NewsFeed from './pages/NewsFeed.jsx'
import SavedSummary from './pages/SavedSummary.jsx'
import NewsProvider from './context/NewsContext.js'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './pages/Home.js'



function App() {


  return (
    <>
<BrowserRouter>
<AuthProvider>
    <NewsProvider>  
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/newsfeed" element={<NewsFeed />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/savedsummary" element={<SavedSummary />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />  
  <Route path="/reset-password" element={<ResetPassword />} />
</Routes>
</NewsProvider>
</AuthProvider>
</BrowserRouter>
    </>
  )
}

export default App
