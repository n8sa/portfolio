"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  {
    id: 'phase-1',
    superTitle: '🌸 THE LEARNER',
    title: 'Phase 1',
    period: '2017 – 2020',
    content: 'A foundation built on curiosity. I began as a UiTM student who wasn’t just studying, but exploring technology with genuine interest. This was the phase where I discovered my passion for problem-solving, discipline, and learning quickly. It shaped the mindset and adaptability I carry into everything I do today.',
    colors: 'text-neutral-400',
  },
  {
    id: 'phase-2',
    superTitle: '🔧 THE BUILDER',
    title: 'Phase 2',
    period: '2020 – 2024',
    content: 'The years I transformed knowledge into real skill. I strengthened my technical abilities in enterprise environments involving automation, Azure, backend development, and infrastructure support. My experience with Fujitsu, Parkson, and Petronas Digital opened my eyes to complex systems, operational needs, and real-world problem solving. I grew into someone who can adapt, build with intention, and deliver with clarity.',
    logos: ['/fujitsu-logo.svg', '/parkson-logo.svg', '/petronas-logo.svg'],
    colors: 'text-[#D8A7B1]',
  },
  {
    id: 'phase-3',
    superTitle: '🌍 THE SEEKER',
    title: 'Phase 3',
    period: '2024 – 2025',
    content: 'A journey of clarity and growth. This phase helped me reconnect with myself. I focused on health, travel, learning, and understanding what truly matters. I deepened my skills in data, dashboards, UI and UX, and AI workflows. It became the chapter that aligned my values with my ambitions and direction.',
    colors: 'text-[#e6839c]',
  },
  {
    id: 'phase-4',
    superTitle: '✨ THE NEXT CHAPTER',
    title: 'Phase 4',
    period: '2025 →',
    content: 'A future shaped by creativity, strategy, and purpose. I am now blending everything I have learned across technology, design, data, and storytelling to build digital experiences that feel meaningful and human. This chapter is about creating work that is functional and expressive, and that brings value to people. I am ready to grow, contribute, and build with a team that appreciates innovation, quality, and character.',
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
      
      <div className="relative flex flex-col items-center justify-center">
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

        <div className="farah-text-container">
          <h1 
            className={`select-none text-[15vw] sm:text-[18vw] md:text-[20vw] lg:text-[14vw] font-black leading-none tracking-tighter flex transition-colors duration-1000 ease-in-out ${selectedPhaseData?.colors || 'text-neutral-400'}`}
          >
            {farahLetters.map((letter, index) => (
              <span key={index} className="relative">
                {letter}
              </span>
            ))}
          </h1>
        </div>

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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
      
      <div className="absolute bottom-16 left-0 right-0 z-20 flex w-full max-w-2xl mx-auto px-4">
        <div className="relative w-full">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-700"></div>
          <div className="relative flex justify-between w-full">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex flex-col items-center">
                <button
                  onClick={() => setActivePhase(phase.id)}
                  className="relative z-10 flex flex-col items-center group"
                >
                  <div className={`
                    absolute -top-1 h-2 w-0.5 transition-all duration-300
                    ${activePhase === phase.id ? 'bg-primary shadow-[0_0_8px_theme(colors.primary)] h-3' : 'bg-neutral-500'}
                  `}></div>
                  <span className={`
                    mt-4 text-xs font-medium transition-colors duration-300
                    ${activePhase === phase.id ? 'text-white' : 'text-neutral-400 group-hover:text-white'}
                  `}>
                    {phase.title}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
