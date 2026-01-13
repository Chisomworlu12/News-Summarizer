import Signup from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import NewsFeed from './pages/NewsFeed'
import SavedSummary from './pages/SavedSummary'
import NewsProvider from './context/NewsContext'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { AuthProvider } from './context/AuthContext'


function App() {


  return (
    <>
<BrowserRouter>
<AuthProvider>
    <NewsProvider>
<Routes>
  <Route path="/" element={<NewsFeed />} />
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
