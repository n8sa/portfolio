import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown, ArrowRight } from "lucide-react";

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section className="relative w-full overflow-hidden bg-background py-32 sm:py-40 md:py-48">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <div className="relative mx-auto mb-8 h-32 w-32 animate-fade-in-up lg:h-40 lg:w-40">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                fill
                className="rounded-full border-4 border-primary/20 object-cover shadow-lg"
                priority
              />
            )}
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground animate-fade-in-up [animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl">
            Farah Nisa
          </h1>
          <p className="mt-4 max-w-3xl font-body text-xl text-primary animate-fade-in-up [animation-delay:400ms] sm:text-2xl">
            Software & Cloud Engineer
          </p>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up [animation-delay:600ms] md:text-xl">
            Building accessible web experiences with a thoughtful front-end and reliable backend.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up [animation-delay:800ms]">
            <Button size="lg" asChild className="rounded-full transition-transform hover:scale-105">
              <Link href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full transition-transform hover:scale-105">
              <Link href="#contact">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(3,155,229,0.15),rgba(255,255,255,0))]"></div>
    </section>
  );
}
