
import './App.css'
import Signup from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import NewsFeed from './pages/NewsFeed'
import SavedSummary from './pages/SavedSummary'
import NewsProvider from './context/NewsContext'

function App() {


  return (
    <>
    <NewsProvider>
<BrowserRouter>
<Routes>
  <Route path="/" element={<NewsFeed />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/savedsummary" element={<SavedSummary />} />
</Routes>
</BrowserRouter>
</NewsProvider>
    </>
  )
}

export default App
