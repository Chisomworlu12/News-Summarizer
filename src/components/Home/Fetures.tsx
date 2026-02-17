import {  BookHeart, BookmarkPlusIcon, Rss, Zap } from "lucide-react";

const Features=()=>{
    return(
        <section className="py-12">
            
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Features</h2>
            
           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="features ">
                <div className="feature-icon bg-brand-blue/10">
                <Rss className="text-brand-blue" size={32}/>
                </div>
                <h3 className="feature-title ">Browse News</h3>
                <p>Curated feeds from world's top sources delivered to one clean dashboard.</p>
            </div>
            
            <div className="features">
                <div className="feature-icon bg-brand-green/10">
                <Zap className="text-brand-green" size={32}/>
                </div>
                <h3 className="feature-title">Instant Summary</h3>
                <p>Our AI reads the full article and gives you the key takeaways in 2 seconds.</p>
            </div>
            <div className="features">
                <div className="feature-icon bg-brand-purple/10">
                    <BookmarkPlusIcon className="text-brand-purple" size={32}/>
                </div>
                <h3 className="feature-title">Save For Later</h3>
                <p>Personal library for your summarized content to read across all your devices.</p>
            </div>
           </div>
        </section>
    )
}

export default Features;