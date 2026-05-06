import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Sparkles, Zap } from "lucide-react"
import Button from "../ui/Button.js"

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="relative text-center py-24 px-4 overflow-hidden">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 dark:bg-brand-purple/20 border border-brand-purple/20 text-brand-purple dark:text-brand-purple-light text-sm font-semibold mb-8"
      >
        <Sparkles size={14} className="text-brand-pink" />
        AI-Powered News Summarization
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6"
      >
        <span className="text-slate-900 dark:text-white">Stay Informed,</span>
        <br />
        <span className="gradient-text">Faster.</span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
      >
        One click turns any long article into a crisp AI summary.
        <span className="block mt-1 text-slate-500 dark:text-slate-500">No links to paste. No time wasted.</span>
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Button onClick={() => navigate("/newsfeed")} className="px-8 py-3 text-base">
          <Zap size={18} />
          Start Summarizing Free
        </Button>
        <button
          onClick={() => navigate("/signup")}
          className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-purple dark:hover:text-brand-purple-light transition-colors"
        >
          Create free account →
        </button>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex justify-center gap-10 mt-16 text-center"
      >
        {[
          { value: "9+", label: "News sources" },
          { value: "AI", label: "Powered" },
          { value: "Free", label: "To start" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-2xl font-black gradient-text">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Hero
