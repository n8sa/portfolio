import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown, ArrowRight } from "lucide-react";

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 sm:py-32 md:py-40">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Farah Nisa
            <span className="block text-primary">Software & Cloud Engineer</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            Building accessible web experiences with thoughtful front-end and reliable backend.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <Card className="w-80 max-w-full overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 lg:w-96">
            <CardContent className="p-0">
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  data-ai-hint={profileImage.imageHint}
                  width={500}
                  height={500}
                  className="aspect-square object-cover"
                  priority
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
