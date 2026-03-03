import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.js";

const Hero = () => {
  const navigate = useNavigate();

  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="text-center py-12 overflow-hidden">
      
      <motion.h1
        className="text-4xl font-bold text-black dark:text-white mb-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Stay Informed, <span className="text-brand-blue">Faster.</span>
      </motion.h1>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-[20px] text-gray-700 dark:text-gray-300 mb-2">
          One click to turn long articles into instant AI insights.
        </p>
        <p className="text-[20px] text-gray-700 dark:text-gray-300 mb-6">
          No links to paste, no time wasted
        </p>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex justify-center"
      >
        <Button
          onClick={() => navigate("/newsfeed")}
          className="bg-brand-blue hover:bg-brand-blue-light dark:bg-dark-brand-blue dark:hover:bg-dark-brand-blue-light text-gray-200 px-6 py-3 rounded-2xl transition duration-500 hover:scale-110 shadow-lg shadow-brand-blue/20"
        >
          Start Summarizing Free
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;