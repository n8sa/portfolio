import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-image');
  
  return (
    <section id="about" className="w-full bg-card py-24 sm:py-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative flex justify-center">
                {aboutImage && (
                    <Image
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        data-ai-hint={aboutImage.imageHint}
                        width={500}
                        height={500}
                        className="rounded-lg shadow-2xl aspect-square object-cover"
                    />
                )}
            </div>
            <div>
                <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    About Me
                </h2>
                <p className="mt-6 text-lg text-foreground/80">
                    I build accessible web and cloud based solution with a focus on thoughtful front-end and a reliable backend. I have a passion for learning and am always looking to expand my knowledge and skills. I am a team player and enjoy collaborating with others to build amazing products.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
