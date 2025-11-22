import { Hero } from '@/components/sections/hero';
import { FeaturedProject } from '@/components/sections/featured-project';
import { Contact } from '@/components/sections/contact';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/sections/header';
import { AboutSection } from '@/components/sections/about';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      <Hero />
      <AboutSection />
      <FeaturedProject />
      <Contact />
      <Toaster />
    </main>
  );
}
