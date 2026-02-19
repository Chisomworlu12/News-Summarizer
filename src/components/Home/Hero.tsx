import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../Button.js";

const Hero = () => {
  const sentence = "Stay Informed, Faster.";
  const navigate = useNavigate()
  
  // Variants for the container 
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each individual letter
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <div className="text-center py-12 overflow-hidden">
      
      <motion.h1
        className="text-4xl font-bold text-black dark:text-white mb-4 flex justify-center flex-wrap"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {sentence.split("").map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            
            className={letter === " " ? "mr-2" : ""}
          >
            
            <span className={index > 14 ? "text-brand-blue" : ""}>
              {letter}
            </span>
          </motion.span>
        ))}
      </motion.h1>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-[20px] text-gray-700 dark:text-gray-300 mb-2">
          One click to turn long articles into instant AI insights.
        </p>
        <p className="text-[20px] text-gray-700 dark:text-gray-300 mb-6">
          No links to paste, no time wasted
        </p>
        <div className="flex justify-center">
          <Button onClick={()=> navigate("/newsfeed")} className="bg-brand-blue  hover:bg-brand-blue-light dark:bg-dark-brand-blue dark:hover:bg-dark-brand-blue-light text-gray-200 px-6 py-3 rounded-2xl transition duration-500 hover:scale-110 shadow-lg shadow-brand-blue/20">
            Start Summarizing Free
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;