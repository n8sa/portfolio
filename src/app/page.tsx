import { Hero } from '@/components/sections/hero';
import { FeaturedProject } from '@/components/sections/featured-project';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/sections/header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      <Hero />
      <FeaturedProject />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Toaster />
    </main>
  );
}
