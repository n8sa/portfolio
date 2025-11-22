"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, Heart, Rocket, Cloud, Terminal, Server, Star, BarChart, Wand2 } from 'lucide-react';
import { GirlSilhouette } from './girl-silhouette';
import Image from 'next/image';

const phases = [
  {
    id: 'phase-1',
    superTitle: 'THE LEARNER',
    title: 'Phase 1',
    period: '2017 – 2020',
    content: 'UiTM student exploring technology, learning fundamentals, and discovering my direction.',
    icons: [BookOpen, Briefcase],
    colors: 'text-[#D8B4A0]',
    gradient: { '--farah-grad-1': '#D8B4A0', '--farah-grad-2': '#A39788' }
  },
  {
    id: 'phase-2',
    superTitle: 'THE BUILDER',
    title: 'Phase 2',
    period: '2020 – 2024',
    content: 'System Engineer era: Fujitsu, Parkson, Petronas Digital. Focused on automation, Azure, backend, and infrastructure.',
    icons: [Cloud, Terminal, Server],
    logos: ['/fujitsu-logo.svg', '/parkson-logo.svg', '/petronas-logo.svg'],
    colors: 'text-[#A39788]',
    gradient: { '--farah-grad-1': '#A39788', '--farah-grad-2': '#8A7F74' }
  },
  {
    id: 'phase-3',
    superTitle: 'THE SEEKER',
    title: 'Phase 3',
    period: '2024 – 2025',
    content: 'Exploration, balance, and growth. Focused on health, family, travel, and upskilling in data, UI/UX, and AI.',
    icons: [Heart, Rocket, Wand2],
    colors: 'text-[#D8A7B1]',
    gradient: { '--farah-grad-1': '#D8A7B1', '--farah-grad-2': '#C1959C' }
  },
  {
    id: 'phase-4',
    superTitle: 'THE NEXT CHAPTER',
    title: 'Phase 4',
    period: '2025 →',
    content: 'Blending data, design, and storytelling. Building meaningful and value-driven digital experiences with creative tech.',
    icons: [Star, BarChart, Wand2],
    colors: 'text-primary',
    gradient: { '--farah-grad-1': 'hsl(var(--primary))', '--farah-grad-2': 'hsl(var(--accent))' }
  },
];

const panelVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
  },
  exit: { 
    opacity: 0, y: -20,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function AboutSection() {
  const [activePhase, setActivePhase] = useState(phases[0].id);
  const selectedPhaseData = phases.find(p => p.id === activePhase);

  return (
    <section id="about" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Central Content Area */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Top Titles */}
        <div className="relative h-10 w-full">
            <AnimatePresence mode="wait">
                 {selectedPhaseData && (
                    <motion.h3
                        key={`${selectedPhaseData.id}-title`}
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0 text-center font-headline text-xs font-medium tracking-widest text-neutral-300"
                    >
                        {selectedPhaseData.superTitle}
                    </motion.h3>
                 )}
            </AnimatePresence>
        </div>

        {/* FARAH Hero */}
        <div className="farah-text-container">
          <motion.h1 
            className="farah-text-gradient select-none text-[25vw] sm:text-[28vw] md:text-[30vw] lg:text-[22vw] font-black leading-none tracking-tighter"
            animate={selectedPhaseData?.gradient || {}}
            transition={{duration: 0.8, ease: 'easeInOut'}}
            >
            FARAH
          </motion.h1>
          <GirlSilhouette activePhase={activePhase} />
        </div>

        {/* Content Panel */}
        <div className="relative h-48 w-full">
             <AnimatePresence mode="wait">
                {selectedPhaseData && (
                    <motion.div
                    key={selectedPhaseData.id}
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 flex flex-col items-center justify-start pt-4"
                    >
                    <motion.h4 
                        variants={textVariants}
                        className={`font-headline text-lg font-bold tracking-tight ${selectedPhaseData.colors}`}
                    >
                        {selectedPhaseData.period}
                    </motion.h4>
                    <motion.p 
                        variants={textVariants}
                        className="mt-2 max-w-lg text-center text-base text-neutral-300 md:text-lg"
                    >
                        {selectedPhaseData.content}
                    </motion.p>
                    
                    <motion.div 
                        variants={textVariants}
                        className="mt-4 flex items-center gap-4">
                        <div className="flex -space-x-1">
                        {selectedPhaseData.icons.map((Icon, i) => (
                            <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-800/50`}>
                                <Icon className={`h-4 w-4 ${selectedPhaseData.colors}`} />
                            </div>
                        ))}
                        </div>
                        {selectedPhaseData.logos && (
                        <div className="flex items-center gap-4 border-l border-neutral-800 pl-4">
                                {selectedPhaseData.logos.map((logo, i) => (
                                    <Image key={i} src={logo} alt={`logo-${i}`} width={80} height={20} className="h-5 w-auto object-contain grayscale invert brightness-200 opacity-60" />
                                ))}
                        </div>
                        )}
                    </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Tabs */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-4">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300
              ${activePhase === phase.id
                ? 'border-neutral-500 bg-neutral-800 text-white shadow-lg'
                : 'border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-900'
              }`}
          >
            {phase.title}
          </button>
        ))}
      </div>
    </section>
  );
}
