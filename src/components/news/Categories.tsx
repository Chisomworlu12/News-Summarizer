const categories = ["general", "technology", "business", "sports", "politics"]

interface CategoriesProps {
  setCategory: (category: string) => void
  activeCategory: string
}

const categoryIcons: Record<string, string> = {
  general: "🌐",
  technology: "💻",
  business: "📈",
  sports: "⚽",
  politics: "🏛️",
}

const Categories: React.FC<CategoriesProps> = ({ setCategory, activeCategory }) => {
  return (
    <div className="overflow-x-auto mb-8 pb-1 scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              onClick={() => setCategory(category)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'bg-linear-to-r from-brand-purple to-brand-indigo text-white shadow-md shadow-brand-purple/30 scale-105'
                  : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5 hover:border-brand-purple/30 hover:text-brand-purple dark:hover:text-brand-purple-light'
                }`}
            >
              <span>{categoryIcons[category]}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
