import { ExternalLink, Sparkles } from "lucide-react"

interface NewsCardProps {
  article: any
  handleSummarize: (article: any) => void
}

const NewsCard: React.FC<NewsCardProps> = ({ article, handleSummarize }) => {
  const title = article.title || article.webTitle || 'No title'
  const description = article.description || article.fields?.trailText || 'No description available'
  const imageUrl = article.url_to_image || article.fields?.thumbnail || '/placeholder.jpg'
  const articleUrl = article.url || article.webUrl || '#'
  const sourceName = article.source_name || article.sectionName || 'Unknown source'
  const publishedDate = article.published_at || article.webPublicationDate

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } catch {
      return ''
    }
  }

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/5 hover:border-brand-purple/30 dark:hover:border-brand-purple/30 hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/8b5cf6/ffffff?text=News'
          }}
        />
        {/* Source badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
            {sourceName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 font-medium">{formatDate(publishedDate)}</p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-purple-light transition-colors leading-snug">
          {title}
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-brand-indigo dark:text-brand-purple-light border border-brand-indigo/20 dark:border-brand-purple/20 bg-brand-indigo/5 dark:bg-brand-purple/10 hover:bg-brand-indigo/10 dark:hover:bg-brand-purple/20 transition-colors"
          >
            <ExternalLink size={13} />
            Read story
          </a>
          <button
            onClick={() => handleSummarize(article)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-linear-to-r from-brand-purple to-brand-indigo hover:from-brand-purple-light hover:to-brand-indigo shadow-md shadow-brand-purple/25 hover:shadow-brand-purple/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Sparkles size={13} />
            Summarize
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
