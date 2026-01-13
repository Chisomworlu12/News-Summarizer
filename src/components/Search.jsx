import { useState, useEffect, useContext } from 'react';
import { NewsContext } from '../context/NewsContext';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const { setSearchTerm } = useContext(NewsContext);
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setSearchTerm(displayValue);
    }, 500);    
    
    return () => clearTimeout(timer);
  }, [displayValue, setSearchTerm]);

  return (
    <div className="px-4">
      <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-blue-500 dark:focus-within:border-blue-400 rounded-xl px-3 py-2 md:w-70 lg:w-100 w-full transition-all">
      
        <span className="mr-2 text-gray-400"><SearchIcon size={20} /></span>

        <input
          type="text"
          placeholder="Search news..."
          
          className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={displayValue}
          onChange={(e) => setDisplayValue(e.target.value)}
        />

        {displayValue && (
          <button 
            onClick={() => setDisplayValue('')} 
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-medium uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;