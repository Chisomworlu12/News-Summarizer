

const categories = ["general", "technology", "business", "sports", "politics"];
interface CategoriesProps{
    setCategory: (category: string) => void;
    activeCategory: string;
} 
const Categories:React.FC<CategoriesProps>=({setCategory, activeCategory })=> {
     
   const getActiveCategory= (category:string) => {
        return category === activeCategory ? 'bg-blue-600 dark:bg-blue-700 text-white' : 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400';
    }
    
  

    return (
          <div className="overflow-x-auto mb-6 pb-2">
        <ul className="flex space-x-4 mb-6 cursor-pointer text-blue-600 dark:text-blue-400 font-semibold">
            {categories.map((category) => (
                <li key={category} className={`rounded-[22px] px-3 py-1 cursor-pointer ${getActiveCategory(category)}`} onClick={() => setCategory(category)}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
            ))}
        </ul>
      </div>
    )
}

export default Categories
