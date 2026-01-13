import React, { useState, useEffect, useContext } from 'react';
import { NewsContext } from '../context/NewsContext';

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
      <div className="relative flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2 md:w-70 lg:w-100 w-full">
        <input
          type="text"
          placeholder="Search news..."
          className="bg-transparent  outline-none w-full text-sm"
          value={displayValue}
          onChange={(e) => setDisplayValue(e.target.value)}
        />
        {displayValue && (
          <button onClick={() => setDisplayValue('')} className="text-gray-400 text-xs">
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;