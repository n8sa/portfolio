'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutTimeline } from '@/components/sections/about-timeline';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { cn } from '@/lib/utils';
import { Hero } from '@/components/sections/hero';

type Section = 'home' | 'about' | 'projects' | 'contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    return (
      <>
        <div
          className={cn(
            'section-transition absolute inset-0',
            activeSection === 'home' ? 'section-visible' : 'section-hidden'
          )}
        >
          <Hero />
        </div>
        <div
          className={cn(
            'section-transition absolute inset-0',
            activeSection === 'about' ? 'section-visible' : 'section-hidden'
          )}
        >
          <AboutTimeline />
        </div>
        <div
          className={cn(
            'section-transition absolute inset-0',
            activeSection === 'projects' ? 'section-visible' : 'section-hidden'
          )}
        >
          <Projects />
        </div>
        <div
          className={cn(
            'section-transition absolute inset-0',
            activeSection === 'contact' ? 'section-visible' : 'section-hidden'
          )}
        >
          <Contact />
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="relative flex-1 flex flex-col justify-center items-center">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}
