
const How=()=>{
    return(
        <section className="py-16 bg-white dark:bg-gray-900">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">How it Works</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
    
      <div className="bg-white dark:bg-gray-300 p-8 rounded-2xl shadow-sm border border-gray-100 hover:md:-translate-y-4 duration-500">
        <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
        <h3 className="text-xl font-semibold mb-2">Browse News</h3>
        <p className="text-gray-600">Scroll through our curated feed of global news and trending topics.</p>
      </div>

      
      <div className="bg-white dark:bg-gray-300 p-8 rounded-2xl shadow-sm border border-gray-100 hover:md:-translate-y-4 duration-500">
        <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
        <h3 className="text-xl font-semibold mb-2">One-Click Summary</h3>
        <p className="text-gray-600">Tap the summarize button to instantly generate a concise, fact-based brief.</p>
      </div>

      
      <div className="bg-brand-blue dark:bg-dark-brand-blue p-8 rounded-2xl shadow-lg text-white transform hover:md:-translate-y-4 duration-500">
        <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
        <h3 className="text-xl font-semibold mb-2">Save & Organize</h3>
        <p className="text-blue-50">Create an account to save your favorite summaries and build your library.</p>
        
      </div>
    </div>
  </div>
</section>
    )
}
export default How;