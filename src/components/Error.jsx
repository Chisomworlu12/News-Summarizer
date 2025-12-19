import {motion} from "framer-motion";
 function ErrorAlert({ error }) {
  return (
    <div>
     <div className="flex items-center justify-center min-h-[400px] p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 bg-red-50 rounded-lg max-w-md"
      >
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </motion.svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
      </motion.div>
    </div>
    </div>
  );
}

export default ErrorAlert;