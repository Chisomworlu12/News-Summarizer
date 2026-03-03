import { memo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.js';
import { toggleTheme } from '../../features/theme/themeSlice.js';

const ThemeToggle = memo(function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.value)

  return (
    <button 
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5 text-white" />
      )}
    </button>
  );
});

export default ThemeToggle;