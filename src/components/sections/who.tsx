'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Coffee,
  Feather,
  GraduationCap,
} from 'lucide-react';
import { GirlSilhouette } from '@/components/girl-silhouette';

const phases = [
  {
    id: 'student',
    title: 'Phase 1: Student Life',
    subtitle: 'UiTM',
    icon: GraduationCap,
    color: 'text-[#F5F0EB]',
    bgColor: 'bg-[#F5F0EB]/10',
    description:
      'A time of curiosity. I learned the fundamentals of tech, explored different fields, and built the early confidence and ambition that drives me today.',
  },
  {
    id: 'career',
    title: 'Phase 2: Early Career',
    subtitle: 'System Engineer Era',
    icon: Briefcase,
    color: 'text-[#D8A7B1]',
    bgColor: 'bg-[#D8A7B1]/10',
    description:
      'I shaped my tech foundation at Fujitsu, Parkson, & Petronas Digital. I engineered cloud solutions, automated systems, and learned to navigate real-world enterprise challenges in teamwork, communication, and pressure.',
  },
  {
    id: 'reflection',
    title: 'Phase 3: Transition & Reflection',
    subtitle: 'A New Path',
    icon: Coffee,
    color: 'text-[#BFA89E]',
    bgColor: 'bg-[#BFA89E]/10',
    description:
      "After a layoff, I took a pause to focus on health, family, and faith. I traveled, upskilled in data science, UI/UX, and AI, and realigned my purpose toward what's next.",
  },
  {
    id: 'future',
    title: 'Phase 4: The Next Chapter',
    subtitle: 'Creative Technologist',
    icon: Feather,
    color: 'text-[#F9A8D4]',
    bgColor: 'bg-[#F9A8D4]/10',
    description:
      'I am now blending data, design, and storytelling to build meaningful, human-centered work. My journey is moving toward interactive web, AI integration, and creative technology.',
  },
];

export function Who() {
  const [activePhase, setActivePhase] = useState(phases[0].id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activePhaseData = phases.find((p) => p.id === activePhase);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex h-screen w-full items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <h1
            className="select-none text-[35vw] font-black uppercase text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
            }}
          >
            WHO
          </h1>
        </div>
        <div className="relative z-10 w-[80%] h-full">
            <div className="absolute inset-0 w-full h-full">
               {isClient && <GirlSilhouette className="absolute w-[20%] h-auto animate-who-walk" />}
            </div>
        </div>
        <div className="absolute bottom-10 text-center">
            <h2 className="font-headline text-2xl md:text-3xl tracking-tighter">
                The Journey of Farah Nisa
            </h2>
            <p className="text-muted-foreground mt-2">Scroll to explore</p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 lg:gap-24">
          {/* Phase Selectors */}
          <div className="col-span-1 flex flex-col justify-start gap-8">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex items-center gap-4 text-left transition-all duration-300 ${
                  activePhase === phase.id
                    ? 'scale-105'
                    : 'opacity-40 hover:opacity-100'
                }`}
              >
                <div
                  className={`rounded-lg p-3 transition-all duration-300 ${
                    activePhase === phase.id
                      ? `${phase.bgColor} ${phase.color}`
                      : 'bg-muted/20'
                  }`}
                >
                  <phase.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className={`font-headline text-lg font-bold ${
                      activePhase === phase.id ? phase.color : ''
                    }`}
                  >
                    {phase.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Phase Details */}
          <div className="col-span-1 md:col-span-3 relative h-48 md:h-auto">
            <AnimatePresence mode="wait">
              {activePhaseData && (
                <motion.div
                  key={activePhaseData.id}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <h2
                    className={`font-headline text-4xl font-bold tracking-tighter sm:text-5xl ${activePhaseData.color}`}
                  >
                    {activePhaseData.subtitle}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                    {activePhaseData.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
