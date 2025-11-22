'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero } from '@/components/sections/hero';
import { Contact } from '@/components/sections/contact';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/sections/header';
import { AboutSection } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';

type SectionId = 'home' | 'about' | 'projects' | 'contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const sectionVariants = {
    hidden: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };
  
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sectionVariants}
          className="h-full w-full"
        >
          {renderSection()}
        </motion.main>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}
