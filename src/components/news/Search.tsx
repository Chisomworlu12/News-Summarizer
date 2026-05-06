import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { setSearchTerm } from '../../features/news/newsSlice.js'

const Search = () => {
  const dispatch = useAppDispatch()
  const reduxSearchTerm = useAppSelector(state => state.news.searchTerm)
  const [displayValue, setDisplayValue] = useState('')

  // Sync input when search is cleared externally (e.g. category change)
  useEffect(() => {
    if (reduxSearchTerm === '') setDisplayValue('')
  }, [reduxSearchTerm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchTerm(displayValue))
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  const handleClear = () => {
    setDisplayValue('')
    dispatch(setSearchTerm(''))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-slate-100 dark:bg-white/10 border border-transparent focus-within:border-brand-purple/40 dark:focus-within:border-brand-purple/40 rounded-xl px-3 py-2 md:w-64 lg:w-80 w-full transition-all duration-200"
    >
      <SearchIcon size={16} className="text-slate-400 dark:text-slate-500 shrink-0 mr-2" />
      <input
        type="search"
        enterKeyHint="search"
        placeholder="Search news..."
        className="bg-transparent outline-none w-full text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
        value={displayValue}
        onChange={(e) => setDisplayValue(e.target.value)}
      />
      {displayValue && (
        <button
          type="button"
          onClick={handleClear}
          className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </form>
  )
}

export default Search
