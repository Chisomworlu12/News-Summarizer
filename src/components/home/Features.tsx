import { Rss, Zap, BookmarkPlus } from "lucide-react"

const features = [
  {
    icon: <Rss size={28} />,
    title: "Browse News",
    description: "Curated feeds from 9+ world-class sources — all in one clean dashboard.",
    gradient: "from-brand-purple to-brand-indigo",
    bg: "bg-brand-purple/10 dark:bg-brand-purple/20",
    border: "border-brand-purple/20",
  },
  {
    icon: <Zap size={28} />,
    title: "Instant Summary",
    description: "Our AI reads the full article and delivers key takeaways in under 2 seconds.",
    gradient: "from-brand-blue to-brand-cyan",
    bg: "bg-brand-blue/10 dark:bg-brand-blue/20",
    border: "border-brand-blue/20",
  },
  {
    icon: <BookmarkPlus size={28} />,
    title: "Save For Later",
    description: "Build a personal library of your summaries — accessible across all devices.",
    gradient: "from-brand-pink to-brand-rose",
    bg: "bg-brand-pink/10 dark:bg-brand-pink/20",
    border: "border-brand-pink/20",
  },
]

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-purple mb-3">Everything you need</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Features built for <span className="gradient-text">speed</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, description, gradient, bg, border }) => (
            <div
              key={title}
              className={`group relative p-8 rounded-2xl border ${border} bg-white dark:bg-slate-900/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className={`feature-icon ${bg} border ${border} mb-4`}>
                <span className={`bg-clip-text text-transparent bg-linear-to-br ${gradient}`}>
                  {icon}
                </span>
              </div>

              <h3 className="feature-title text-slate-900 dark:text-white">{title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
