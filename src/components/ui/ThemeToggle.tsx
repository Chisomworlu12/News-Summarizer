import { memo } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { toggleTheme } from '../../features/theme/themeSlice.js'

const ThemeToggle = memo(function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.value)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-slate-600 group-hover:text-brand-indigo transition-colors" />
      ) : (
        <Sun className="h-4 w-4 text-amber-300 group-hover:text-amber-200 transition-colors" />
      )}
    </button>
  )
})

export default ThemeToggle
