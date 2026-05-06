import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const orbs = [
  {
    className: "w-[700px] h-[700px] -top-48 -left-32 blur-[90px] opacity-25 dark:opacity-20",
    gradient: "radial-gradient(circle at 30% 40%, #8b5cf6, #6366f1, transparent 70%)",
    animate: { x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.05, 1] },
    transition: { duration: 28, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className: "w-[600px] h-[600px] -bottom-32 -right-24 blur-[110px] opacity-20 dark:opacity-15",
    gradient: "radial-gradient(circle at 60% 50%, #ec4899, #f43f5e, transparent 70%)",
    animate: { x: [0, -80, 0], y: [0, -40, 0], scale: [1, 0.95, 1] },
    transition: { duration: 32, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className: "w-[500px] h-[500px] top-1/3 left-1/3 blur-[120px] opacity-15 dark:opacity-10",
    gradient: "radial-gradient(circle at 50% 50%, #3b82f6, #06b6d4, transparent 70%)",
    animate: { x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] },
    transition: { duration: 22, repeat: Infinity, ease: "easeInOut" },
  },
]

const particles = [
  { x: "10%", y: "20%", size: 3, duration: 8,  delay: 0,   color: "rgba(139,92,246,0.7)" },
  { x: "40%", y: "15%", size: 4, duration: 12, delay: 2,   color: "rgba(99,102,241,0.6)" },
  { x: "70%", y: "35%", size: 3, duration: 11, delay: 3,   color: "rgba(236,72,153,0.5)" },
  { x: "60%", y: "50%", size: 4, duration: 15, delay: 0.8, color: "rgba(59,130,246,0.4)" },
  { x: "85%", y: "70%", size: 2, duration: 9,  delay: 1.5, color: "rgba(139,92,246,0.5)" },
  { x: "20%", y: "75%", size: 3, duration: 13, delay: 4,   color: "rgba(236,72,153,0.4)" },
]

const AmbientBackground = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibility = () => setIsVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full will-change-transform ${orb.className}`}
          style={{ background: orb.gradient }}
          animate={orb.animate}
          transition={orb.transition}
        />
      ))}

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export default AmbientBackground
