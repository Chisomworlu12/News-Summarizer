import { motion } from "framer-motion"

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-purple border-r-brand-indigo"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand-pink border-l-brand-blue"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-4 rounded-full bg-linear-to-br from-brand-purple/30 to-brand-blue/30" />
      </div>
    </div>
  )
}

export default LoadingSpinner
