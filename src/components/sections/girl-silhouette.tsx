"use client";

import { motion } from 'framer-motion';

const silhouetteVariants = {
  'phase-1': { x: '-35vw', y: '2.5vw', scaleX: 1 },
  'phase-2': { x: '-10vw', y: '1vw', scaleX: 1 },
  'phase-3': { x: '15vw', y: '3vw', scaleX: -1 },
  'phase-4': { x: '38vw', y: '0.5vw', scaleX: 1 },
};

export function GirlSilhouette({ activePhase }: { activePhase: string }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-10 text-white"
      style={{ willChange: 'transform' }}
      initial={false}
      animate={activePhase}
      variants={silhouetteVariants}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 10,
        mass: 0.5,
      }}
    >
      <svg
        width="60"
        height="120"
        viewBox="0 0 60 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-[4vw] min-w-[30px] max-w-[50px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
      >
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <circle cx="30" cy="15" r="10" fill="currentColor" />
          <path
            d="M30 25 C 20 30, 20 60, 25 70 L 35 70 C 40 60, 40 30, 30 25 Z"
            fill="currentColor"
          />
          <path d="M25 70 L 25 110 L 20 110 L 20 70 Z" fill="currentColor" />
          <path d="M35 70 L 35 110 L 40 110 L 40 70 Z" fill="currentColor" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
