"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";



const particles = [
  { x: "10%",  y: "20%",  size: 3,  duration: 8,  delay: 0,   color: "rgba(99,102,241,0.8)"  },
  { x: "40%",  y: "15%",  size: 4,  duration: 12, delay: 2,   color: "rgba(59,130,246,0.7)"  },
  { x: "70%",  y: "35%",  size: 3,  duration: 11, delay: 3,   color: "rgba(236,72,153,0.5)"  },
  { x: "60%",  y: "50%",  size: 4,  duration: 15, delay: 0.8, color: "rgba(16,185,129,0.4)"  },
];
interface ParticleProps {
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}
interface MeshOrbProps {
  className: string;
  animate: any;
  transition: any;
  gradient: string;
}

const Particle = ({ x, y, size, duration, delay, color }: ParticleProps) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.6, 0],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const MeshOrb = ({ className, animate: anim, transition, gradient }: MeshOrbProps) => (
  <motion.div
    className={`absolute rounded-full will-change-transform ${className}`}
    style={{ background: gradient, willChange: "transform" }}
    animate={anim}
    transition={transition}
  />
);

const AmbientBackground = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
     
      <MeshOrb
        className="w-[700px] h-[700px] -top-48 -left-32 blur-[80px] opacity-30 dark:opacity-20"
        gradient="radial-gradient(circle at 30% 40%, #6366f1, #818cf8, transparent 70%)"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <MeshOrb
        className="w-[600px] h-[600px] -bottom-32 -right-24 blur-[100px] opacity-25 dark:opacity-15"
        gradient="radial-gradient(circle at 60% 50%, #a855f7, #ec4899, transparent 70%)"
        animate={{ x: [0, -80, 0], y: [0, -40, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <MeshOrb
        className="w-[500px] h-[500px] top-1/3 left-1/3 blur-[110px] opacity-20 dark:opacity-10"
        gradient="radial-gradient(circle at 50% 50%, #3b82f6, #06b6d4, transparent 70%)"
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

     
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.06) 100%)",
        }}
      />
    </div>
  );
};

export default AmbientBackground;