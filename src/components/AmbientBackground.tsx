"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- Floating Particle ---
const Particle = ({
  x,
  y,
  size,
  duration,
  delay,
  color,
}: {
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: color,
      filter: "blur(1px)",
    }}
    animate={{
      y: [0, -30, 0, 20, 0],
      x: [0, 15, -10, 5, 0],
      opacity: [0, 0.6, 0.8, 0.4, 0],
      scale: [0.8, 1.2, 1, 0.9, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// --- Mesh Gradient Orb ---
const MeshOrb = ({
  className,
  animate: anim,
  transition,
  gradient,
}: {
  className: string;
  animate: object;
  transition: object;
  gradient: string;
}) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    style={{ background: gradient }}
    animate={{...anim}}
    transition={transition}
  />
);


const NoiseFilter = () => (
  <svg className="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="multiply" result="blend" />
        <feComposite in="blend" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  </svg>
);

// --- Animated Grid Lines ---
const GridLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="grid"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 60 0 L 0 0 0 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </pattern>
      <radialGradient id="gridFade" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <mask id="gridMask">
        <rect width="100%" height="100%" fill="url(#gridFade)" />
      </mask>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill="url(#grid)"
      mask="url(#gridMask)"
    />
  </svg>
);

// --- Particles Config ---
const particles = [
  { x: "10%",  y: "20%",  size: 3,  duration: 8,  delay: 0,   color: "rgba(99,102,241,0.8)"  },
  { x: "25%",  y: "60%",  size: 2,  duration: 10, delay: 1,   color: "rgba(168,85,247,0.6)"  },
  { x: "40%",  y: "15%",  size: 4,  duration: 12, delay: 2,   color: "rgba(59,130,246,0.7)"  },
  { x: "55%",  y: "75%",  size: 2,  duration: 9,  delay: 0.5, color: "rgba(99,102,241,0.5)"  },
  { x: "70%",  y: "35%",  size: 3,  duration: 11, delay: 3,   color: "rgba(236,72,153,0.5)"  },
  { x: "80%",  y: "65%",  size: 2,  duration: 7,  delay: 1.5, color: "rgba(168,85,247,0.7)"  },
  { x: "90%",  y: "10%",  size: 3,  duration: 13, delay: 2.5, color: "rgba(59,130,246,0.5)"  },
  { x: "15%",  y: "85%",  size: 2,  duration: 8,  delay: 4,   color: "rgba(99,102,241,0.6)"  },
  { x: "60%",  y: "50%",  size: 4,  duration: 15, delay: 0.8, color: "rgba(16,185,129,0.4)"  },
  { x: "35%",  y: "40%",  size: 2,  duration: 10, delay: 3.5, color: "rgba(245,158,11,0.4)"  },
];

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <NoiseFilter />

      {/* Base background is handled by the parent; these layers add depth */}

      {/* === LAYER 1: Large slow mesh orbs === */}
      <MeshOrb
        className="w-[700px] h-[700px] -top-48 -left-32 blur-[100px] opacity-30 dark:opacity-20"
        gradient="radial-gradient(circle at 30% 40%, #6366f1, #818cf8, transparent 70%)"
        animate={{ x: [0, 60, -20, 0], y: [0, 30, 80, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <MeshOrb
        className="w-[600px] h-[600px] -bottom-32 -right-24 blur-[120px] opacity-25 dark:opacity-15"
        gradient="radial-gradient(circle at 60% 50%, #a855f7, #ec4899, transparent 70%)"
        animate={{ x: [0, -80, 20, 0], y: [0, -40, -90, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <MeshOrb
        className="w-[500px] h-[500px] top-1/3 left-1/3 blur-[130px] opacity-20 dark:opacity-10"
        gradient="radial-gradient(circle at 50% 50%, #3b82f6, #06b6d4, transparent 70%)"
        animate={{ x: [0, 40, -60, 30, 0], y: [0, -50, 30, -20, 0], scale: [1, 1.15, 0.9, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === LAYER 2: Tighter accent orbs with sharper edges === */}
      <MeshOrb
        className="w-72 h-72 top-[15%] right-[20%] blur-[60px] opacity-20 dark:opacity-15"
        gradient="radial-gradient(circle, #f59e0b, transparent 65%)"
        animate={{ x: [0, -30, 20, 0], y: [0, 50, -10, 0], scale: [1, 1.3, 0.85, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <MeshOrb
        className="w-64 h-64 bottom-[25%] left-[15%] blur-[70px] opacity-15 dark:opacity-10"
        gradient="radial-gradient(circle, #10b981, transparent 65%)"
        animate={{ x: [0, 50, -20, 0], y: [0, -30, 40, 0], scale: [0.9, 1.2, 1, 0.9] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* === LAYER 3: Floating micro-particles === */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* === LAYER 4: Subtle grid === */}
      <GridLines />

      {/* === LAYER 5: Noise texture overlay === */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* === LAYER 6: Vignette === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.06) 100%)",
        }}
      />
    </div>
  );
};

export default AmbientBackground;
