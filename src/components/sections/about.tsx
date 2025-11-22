"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, Heart, Rocket, Cloud, Terminal, Server, Star, BarChart, Wand2, GraduationCap, Wrench, Ship } from 'lucide-react';
import Image from 'next/image';

const phases = [
  {
    id: 'phase-1',
    superTitle: 'THE LEARNER',
    title: 'Phase 1',
    period: '2017 – 2020',
    content: 'A foundation built on curiosity. I began as a UiTM student who wasn’t just studying, but exploring technology with genuine interest. This was the phase where I discovered my passion for problem-solving, discipline, and learning quickly. It shaped the mindset and adaptability I carry into everything I do today.',
    icons: [BookOpen, Briefcase],
    colors: 'text-neutral-400',
  },
  {
    id: 'phase-2',
    superTitle: 'THE BUILDER',
    title: 'Phase 2',
    period: '2020 – 2024',
    content: 'The years I transformed knowledge into real skill. I strengthened my technical abilities in enterprise environments involving automation, Azure, backend development, and infrastructure support. My experience with Fujitsu, Parkson, and Petronas Digital opened my eyes to complex systems, operational needs, and real-world problem solving. I grew into someone who can adapt, build with intention, and deliver with clarity.',
    icons: [Cloud, Terminal, Server],
    logos: ['/fujitsu-logo.svg', '/parkson-logo.svg', '/petronas-logo.svg'],
    colors: 'text-[#D8A7B1]',
  },
  {
    id: 'phase-3',
    superTitle: 'THE SEEKER',
    title: 'Phase 3',
    period: '2024 – 2025',
    content: 'A journey of clarity and growth. This phase helped me reconnect with myself. I focused on health, travel, learning, and understanding what truly matters. I deepened my skills in data, dashboards, UI and UX, and AI workflows. It became the chapter that aligned my values with my ambitions and direction.',
    icons: [Heart, Rocket, Wand2],
    colors: 'text-[#e6839c]',
  },
  {
    id: 'phase-4',
    superTitle: 'THE NEXT CHAPTER',
    title: 'Phase 4',
    period: '2025 →',
    content: 'A future shaped by creativity, strategy, and purpose. I am now blending everything I have learned across technology, design, data, and storytelling to build digital experiences that feel meaningful and human. This chapter is about creating work that is functional and expressive, and that brings value to people. I am ready to grow, contribute, and build with a team that appreciates innovation, quality, and character.',
    icons: [Star, BarChart, Wand2],
    colors: 'text-primary',
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

  const farahLetters = ['F', 'A', 'R', 'A', 'H'];

  return (
    <section id="about" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Central Content Area */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Top Titles */}
        <div className="relative h-10 w-full mb-4">
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
            className={`select-none text-[22vw] sm:text-[25vw] md:text-[28vw] lg:text-[20vw] font-black leading-none tracking-tighter flex transition-colors duration-1000 ease-in-out ${selectedPhaseData?.colors || 'text-neutral-400'}`}
            >
            {farahLetters.map((letter, index) => (
              <span key={index} className="farah-letter-container">
                {letter}
                  {/* Phase 1 Icon */}
                  {activePhase === 'phase-1' && index === 0 && (
                    <div
                      key="grad-cap"
                      className="absolute -top-[5%] -left-[10%] text-neutral-300"
                    >
                      <GraduationCap size="20%" />
                    </div>
                  )}
                  {/* Phase 2 Icon */}
                  {activePhase === 'phase-2' && index === 1 && (
                     <div
                      key="wrench"
                      className="absolute -bottom-[5%] -right-[15%] text-neutral-300"
                    >
                      <Wrench size="12%" />
                    </div>
                  )}
                  {/* Phase 3 Icon */}
                   {activePhase === 'phase-3' && index === 2 && (
                     <div
                      key="ship"
                      className="absolute -top-[10%] left-0 w-full text-neutral-300"
                    >
                         <Ship size="15%" />
                    </div>
                  )}
              </span>
            ))}
          </motion.h1>
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
                    className="absolute inset-0 flex flex-col items-center justify-start pt-8"
                    >
                    <motion.h4 
                        variants={textVariants}
                        className={`font-headline text-lg font-bold tracking-tight ${selectedPhaseData.colors}`}
                    >
                        {selectedPhaseData.period}
                    </motion.h4>
                    <motion.p 
                        variants={textVariants}
                        className="mt-2 max-w-2xl text-center text-base text-neutral-300 md:text-lg"
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
