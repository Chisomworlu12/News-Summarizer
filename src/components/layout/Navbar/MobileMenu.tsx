import ThemeToggle from "../../ui/ThemeToggle.js"

interface MobileMenuProps {
  user: any
  handleLogout: () => void
  closeMenu: () => void
  navigate: (path: string) => void
  getDisplayName: (email: string | null | undefined) => string
  handleScroll: (e: React.MouseEvent, feature: string) => void
  location: { pathname: string }
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  user, handleLogout, closeMenu, navigate, getDisplayName, handleScroll, location,
}) => {
  const go = (path: string) => { navigate(path); closeMenu() }

  return (
    <div className="md:hidden border-t border-slate-200/60 dark:border-white/5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4">
      {user ? (
        <div className="flex flex-col gap-2">
          <div className="px-3 py-2 rounded-xl bg-brand-purple/10 dark:bg-brand-purple/20 text-sm font-semibold text-brand-purple dark:text-brand-purple-light">
            Welcome, {getDisplayName(user.email)}
          </div>
          <button onClick={() => go('/savedsummary')}
            className="text-left px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold text-sm transition-colors">
            Saved Summaries
          </button>
          <button onClick={() => { handleLogout(); closeMenu() }}
            className="text-left px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold text-sm transition-colors">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {location.pathname === '/' && (
            <>
              <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')}
                className="px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                How it works
              </a>
              <a href="#features" onClick={(e) => handleScroll(e, 'features')}
                className="px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                Features
              </a>
            </>
          )}
          <button onClick={() => go('/login')}
            className="text-left px-3 py-2 rounded-xl text-sm font-semibold text-brand-indigo dark:text-brand-purple-light hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            Login
          </button>
          <button onClick={() => go('/signup')}
            className="px-3 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-brand-purple to-brand-indigo shadow-md">
            Sign Up
          </button>
        </div>
      )}
      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default MobileMenu
