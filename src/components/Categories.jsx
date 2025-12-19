

const categories = ["news", "technology", "business", "football", "politics", "money", "environment", "science", "health", "education", "culture", "travel"];
function Categories({setCategory, activeCategory }) {
     
   const getActiveCategory= (category) => {
        return category === activeCategory ? 'bg-blue-600 text-white' : 'bg-white text-blue-600';
    }
    
  

    return (
          <div className="overflow-x-auto mb-6 pb-2">
        <ul className="flex space-x-4 mb-6 cursor-pointer text-blue-600 font-semibold">
            {categories.map((category) => (
                <li key={category} className={`rounded-[22px] px-3 py-1 ${getActiveCategory(category)}`} onClick={() => setCategory(category)}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
            ))}
          
        </ul>
      </div>
    )
}

export default Categories
