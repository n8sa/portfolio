import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Contact } from '@/components/sections/contact';
import { AboutTimeline } from '@/components/sections/about-timeline';
import { FeaturedProject } from '@/components/sections/featured-project';
import { Education } from '@/components/sections/education';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main>
        <Hero />
        <AboutTimeline />
        <FeaturedProject />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
