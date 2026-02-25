import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks.js';
import { setSearchTerm } from '../../features/news/newsSlice.js';

const Search = () => {
  const dispatch = useAppDispatch();

  const [displayValue, setDisplayValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
 
    dispatch(setSearchTerm(displayValue));

   
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleClear = () => {
    setDisplayValue('');
    dispatch(setSearchTerm(''));
  };

  return (
    <div className="px-4">
      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-center bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-blue-500 dark:focus-within:border-blue-400 rounded-xl px-3 py-2 md:w-70 lg:w-100 w-full transition-all"
      >
        <span className="mr-2 text-gray-400">
          <SearchIcon size={20} />
        </span>

        <input
          type="search" 
          enterKeyHint="search" 
          placeholder="Search news..."
          className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={displayValue}
          // Only updates local state, does NOT trigger a search yet
          onChange={(e) => setDisplayValue(e.target.value)}
        />

        {displayValue && (
          <button 
            type="button"
            onClick={handleClear} 
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-medium uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;