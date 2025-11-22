'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const subtitleVariants = {
    hidden: { opacity: 0, letterSpacing: '0.1em' },
    visible: {
        opacity: 1,
        letterSpacing: '0.025em',
        transition: {
            duration: 1,
            ease: 'easeOut'
        },
    },
};

const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
        scaleX: 1,
        transition: { 
            duration: 1.2,
            ease: [0.6, 0.01, -0.05, 0.95],
            delay: 0.8,
        }
    }
};

export function Hero() {
  return (
    <section id="home" className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="container px-4 text-center md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 } 
          }}
          className="relative inline-block"
        >
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Farah Nisa Syahindah
          </h1>
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-primary"
            style={{ filter: 'drop-shadow(0 0 5px hsl(var(--primary)))' }}
            variants={underlineVariants}
          />
        </motion.div>

        <motion.h2 
            variants={subtitleVariants}
            className="mt-6 font-body text-lg text-primary/80 sm:text-xl md:text-2xl"
        >
          Software Engineer
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground md:text-base"
        >
          Creating purposeful digital experiences through simplicity, detail, and modern engineering.
        </motion.p>
      </motion.div>
    </section>
  );
}
