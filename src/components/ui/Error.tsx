import { motion } from "framer-motion"

interface ErrorAlertProps {
  error: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-2xl max-w-md shadow-lg"
      >
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-2">Something went wrong</h3>
        <p className="text-rose-600 dark:text-rose-400 text-sm leading-relaxed">{error}</p>
      </motion.div>
    </div>
  )
}

export default ErrorAlert
