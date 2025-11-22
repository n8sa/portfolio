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
    colors: 'bg-[#D8B4A0]/10 border-[#D8B4A0]/50',
    textColor: 'text-[#D8B4A0]',
  },
  {
    id: 'phase-2',
    superTitle: 'THE BUILDER',
    title: 'Phase 2',
    period: '2020 – 2024',
    content: 'System Engineer era: Fujitsu, Parkson, Petronas Digital. Focused on automation, Azure, backend, and infrastructure.',
    icons: [Cloud, Terminal, Server],
    logos: ['/fujitsu-logo.svg', '/parkson-logo.svg', '/petronas-logo.svg'],
    colors: 'bg-[#A39788]/10 border-[#A39788]/50',
    textColor: 'text-[#A39788]',
  },
  {
    id: 'phase-3',
    superTitle: 'THE SEEKER',
    title: 'Phase 3',
    period: '2024 – 2025',
    content: 'Exploration, balance, and growth. Focused on health, family, travel, and upskilling in data, UI/UX, and AI.',
    icons: [Heart, Rocket, Wand2],
    colors: 'bg-[#D8A7B1]/10 border-[#D8A7B1]/50',
    textColor: 'text-[#D8A7B1]',
  },
  {
    id: 'phase-4',
    superTitle: 'THE NEXT CHAPTER',
    title: 'Phase 4',
    period: '2025 →',
    content: 'Blending data, design, and storytelling. Building meaningful and value-driven digital experiences with creative tech.',
    icons: [Star, BarChart, Wand2],
    colors: 'bg-primary/10 border-primary/50',
    textColor: 'text-primary',
  },
];

const panelVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, y: -30, scale: 0.98,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
};

export function AboutSection() {
  const [activePhase, setActivePhase] = useState(phases[0].id);
  const selectedPhaseData = phases.find(p => p.id === activePhase);

  return (
    <section id="about" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      {/* Top Titles */}
      <div className="absolute top-8 left-0 right-0 z-20 flex justify-center gap-8 md:gap-16">
        {phases.map((phase) => (
          <motion.h3
            key={phase.id}
            animate={{ 
                opacity: activePhase === phase.id ? 1 : 0.4,
                scale: activePhase === phase.id ? 1.05 : 1,
             }}
            transition={{ duration: 0.5 }}
            className="font-headline text-xs font-medium tracking-widest text-neutral-300"
          >
            {phase.superTitle}
          </motion.h3>
        ))}
      </div>

      {/* FARAH Hero */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="farah-text-container">
          <h1 className="farah-text-gradient select-none text-[25vw] sm:text-[28vw] md:text-[30vw] lg:text-[22vw] font-black leading-none tracking-tighter">
            FARAH
          </h1>
          <GirlSilhouette activePhase={activePhase} />
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

      {/* Content Panel */}
      <div className="absolute bottom-24 left-0 right-0 z-10 flex justify-center">
        <AnimatePresence mode="wait">
          {selectedPhaseData && (
            <motion.div
              key={selectedPhaseData.id}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`w-[90%] max-w-2xl rounded-2xl border bg-black/50 p-6 shadow-2xl backdrop-blur-md md:p-8 ${selectedPhaseData.colors}`}
            >
              <motion.h4 
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className={`font-headline text-lg font-bold tracking-tight ${selectedPhaseData.textColor}`}
              >
                {selectedPhaseData.period}
              </motion.h4>
              <motion.p 
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="mt-2 text-base text-neutral-300 md:text-lg"
              >
                {selectedPhaseData.content}
              </motion.p>
              
              <motion.div 
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 flex items-center gap-4">
                <div className="flex -space-x-1">
                  {selectedPhaseData.icons.map((Icon, i) => (
                    <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-900 ${selectedPhaseData.colors}`}>
                      <Icon className={`h-4 w-4 ${selectedPhaseData.textColor}`} />
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
    </section>
  );
}
