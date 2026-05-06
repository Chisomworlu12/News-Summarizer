const steps = [
  {
    step: "01",
    title: "Browse News",
    description: "Scroll through our curated global feed across 5 categories and 9+ sources.",
    gradient: "from-brand-purple to-brand-indigo",
    light: "bg-brand-purple/10",
  },
  {
    step: "02",
    title: "One-Click Summary",
    description: "Tap the Summarize button — our AI reads the full article and distills the key facts.",
    gradient: "from-brand-indigo to-brand-blue",
    light: "bg-brand-indigo/10",
  },
  {
    step: "03",
    title: "Save & Organize",
    description: "Sign up free to save your favorite summaries and build your personal reading library.",
    gradient: "from-brand-blue to-brand-cyan",
    light: "bg-brand-blue/10",
    highlight: true,
  },
]

const How = () => {
  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-indigo mb-3">Simple as 1-2-3</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            How it <span className="gradient-text">Works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ step, title, description, gradient, light, highlight }) => (
            <div
              key={step}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${highlight
                  ? `bg-linear-to-br ${gradient} text-white shadow-lg border-transparent`
                  : 'bg-white dark:bg-slate-900/70 border-slate-200/60 dark:border-white/5'
                }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mb-5
                ${highlight
                  ? 'bg-white/20 text-white'
                  : `${light} bg-linear-to-br ${gradient} bg-clip-text text-transparent`
                }`}
              >
                <span className={highlight ? 'text-white' : `bg-clip-text text-transparent bg-linear-to-br ${gradient}`}>
                  {step}
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {title}
              </h3>
              <p className={`text-sm leading-relaxed ${highlight ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default How
