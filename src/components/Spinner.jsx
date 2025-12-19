import { motion } from "framer-motion"

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
    )
}

export default LoadingSpinner
