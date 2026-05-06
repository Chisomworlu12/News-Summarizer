import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import DesktopMenu from "./DesktopMenu.js"
import MobileMenu from "./MobileMenu.js"
import Search from "../../news/Search.js"
import { useLenis } from "lenis/react"
import { useAuth } from "../../../context/AuthContext.js"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, handleLogout } = useAuth()

  const getDisplayName = (email: string | null | undefined) => {
    if (!email) return 'User'
    const username = email.split('@')[0]
    if (username.length <= 3) return username + '**'
    return username.substring(0, 3) + '**'
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const lenis = useLenis()
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (isMenuOpen) closeMenu()
    const navbar = document.querySelector('nav')
    const navbarHeight = navbar?.offsetHeight || 64
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -(navbarHeight + 24),
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-brand-purple via-brand-indigo to-brand-blue hidden md:block select-none"
        >
          NewsSummarizer
        </h1>
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-brand-purple to-brand-blue md:hidden select-none"
        >
          NS
        </h1>

        {location.pathname === '/newsfeed' && <Search />}

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          ) : (
            <Menu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          )}
        </button>

        {location.pathname === '/' && (
          <ul className="hidden md:flex gap-6">
            <li>
              <a
                href="#how-it-works"
                onClick={(e) => handleScroll(e, 'how-it-works')}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-indigo dark:hover:text-brand-indigo font-medium transition-colors"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#features"
                onClick={(e) => handleScroll(e, 'features')}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-indigo dark:hover:text-brand-indigo font-medium transition-colors"
              >
                Features
              </a>
            </li>
          </ul>
        )}

        <DesktopMenu
          user={user}
          handleLogout={handleLogout}
          navigate={navigate}
          getDisplayName={getDisplayName}
        />
      </div>

      {isMenuOpen && (
        <MobileMenu
          user={user}
          handleLogout={handleLogout}
          closeMenu={closeMenu}
          navigate={navigate}
          getDisplayName={getDisplayName}
          handleScroll={handleScroll}
          location={location}
        />
      )}
    </nav>
  )
}

export default Navbar
