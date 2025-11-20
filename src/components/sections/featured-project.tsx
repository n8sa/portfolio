import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const featuredProject = {
    id: "kuiz-belanjawan-2026",
    title: "Kuiz Belanjawan 2026",
    description: "An engaging and modern quiz microsite designed to attract a younger audience with a cyber-themed UI and AI-powered features.",
    details: "For the Kuiz Belanjawan 2026 project, I led the front-end development with a focus on creating a simple, intuitive, and visually appealing experience for millennials. I implemented a sticky navigation and a dynamic parallax hero section to capture user interest from the first moment. A major part of this project was integrating an AI service into the CMS using a custom PHP script. This tool automated the generation of quiz question variations, content summaries, and FAQs, which significantly streamlined the content workflow and allowed the team to focus on quality. The design was carefully crafted to be 'in-theme for all' while having a distinct, modern edge to attract and retain a younger demographic.",
    tech: ["Next.js", "React", "Tailwind CSS", "AI", "PHP"],
    liveUrl: "#",
};

export function FeaturedProject() {
    const featuredImage = PlaceHolderImages.find(p => p.id === featuredProject.id);

  return (
    <section id="featured" className="w-full bg-secondary/20 py-24 sm:py-32">
      <div className="container">
        <Dialog>
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className="relative aspect-video h-full w-full animate-fade-in-up transition-transform duration-500 hover:scale-105">
                    {featuredImage && (
                        <Image 
                            src={featuredImage.imageUrl}
                            alt={featuredProject.title}
                            data-ai-hint={featuredImage.imageHint}
                            fill
                            className="rounded-lg object-cover"
                        />
                    )}
                </div>
                <div className="animate-fade-in-up [animation-delay:200ms]">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Featured Project</h3>
                    <h2 className="font-headline mt-4 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">{featuredProject.title}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{featuredProject.description}</p>
                    <div className="mt-8 flex gap-4">
                        <Button asChild className="rounded-full">
                            <Link href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                View Live Project <ArrowUpRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                        <DialogTrigger asChild>
                             <Button variant="outline" className="rounded-full">Case Study</Button>
                        </DialogTrigger>
                    </div>
                </div>
            </div>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                <DialogTitle className="font-headline text-3xl">{featuredProject.title}</DialogTitle>
                <DialogDescription className="pt-4 text-base">
                    {featuredProject.details}
                </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 py-4">
                    {featuredProject.tech.map(t => <span key={t} className="text-sm text-primary">{t}</span>)}
                </div>
            </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
