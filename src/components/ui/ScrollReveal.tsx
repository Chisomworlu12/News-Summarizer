import { motion } from "framer-motion";
import { memo } from "react";

const ScrollReveal = memo(({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
));

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;