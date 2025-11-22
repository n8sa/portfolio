import { Hero } from '@/components/sections/hero';
import { Contact } from '@/components/sections/contact';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/sections/header';
import { AboutSection } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      <Hero />
      <AboutSection />
      <Projects />
      <Contact />
      <Toaster />
    </main>
  );
}
