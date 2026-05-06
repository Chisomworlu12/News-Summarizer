const Footer = () => {
  return (
    <footer className="w-full py-10 mt-8 border-t border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

        <div className="text-center md:text-left">
          <p className="font-extrabold text-lg bg-clip-text text-transparent bg-linear-to-r from-brand-purple via-brand-indigo to-brand-blue">
            NewsSummarizer<span className="text-brand-pink">.</span>
          </p>
          <p className="text-slate-500 dark:text-slate-500 mt-0.5 text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <p className="text-center text-slate-500 dark:text-slate-500 max-w-xs text-xs">
          Live RSS feeds from the world's top sources, summarized by AI in seconds.
        </p>

        <div className="flex gap-5 text-slate-500 dark:text-slate-500">
          <a href="https://github.com/Chisomworlu12" target="_blank" rel="noopener noreferrer"
            className="hover:text-brand-purple transition-colors font-medium">
            GitHub
          </a>
          <a href="https://chisom-portfoilio.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="hover:text-brand-purple transition-colors font-medium">
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
