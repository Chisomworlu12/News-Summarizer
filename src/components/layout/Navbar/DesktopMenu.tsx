import ThemeToggle from "../../ui/ThemeToggle.js"

interface DesktopMenuProps {
  user: any
  handleLogout: () => void
  navigate: (path: string) => void
  getDisplayName: (email: string | null | undefined) => string
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ user, handleLogout, navigate, getDisplayName }) => {
  return (
    <div className="hidden md:flex gap-3 items-center">
      {user ? (
        <>
          <button
            onClick={() => navigate('/savedsummary')}
            className="text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple-light font-semibold text-sm transition-colors"
          >
            Saved Summaries
          </button>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/10 dark:bg-brand-purple/20 text-brand-purple dark:text-brand-purple-light border border-brand-purple/20">
            {getDisplayName(user.email)}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple-light transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-linear-to-r from-brand-purple to-brand-indigo text-white hover:from-brand-purple-light hover:to-brand-indigo shadow-md shadow-brand-purple/30 hover:shadow-brand-purple/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign Up
          </button>
        </>
      )}
      <ThemeToggle />
    </div>
  )
}

export default DesktopMenu
