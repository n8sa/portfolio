import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight } from "lucide-react";

const featuredProject = {
  id: "kuiz-belanjawan-2026",
  title: "Kuiz Belanjawan 2026",
  description: "Interactive quiz microsite for Astro Awani's 'Belanjawan 2026' coverage. Features client-side quiz logic, sessionStorage for state management, and integration with an AI-powered CMS.",
  tech: ["HTML", "CSS", "JavaScript", "PHP"],
  liveUrl: "https://pulse.astroawani.com/kuiz-belanjawan-2026",
};

const otherProjects = [
    {
        id: "project-ramadan",
        title: "AWANI Ramadan Microsite",
        description: "A comprehensive microsite for Ramadan with dynamic content and interactive features.",
        tech: ["HTML", "CSS", "JavaScript", "Parallax"],
        liveUrl: "#",
    },
    {
        id: "project-ai-cms",
        title: "AI in AWANI CMS",
        description: "Enhanced the internal CMS with AI capabilities to streamline content creation workflows.",
        tech: ["PHP", "JavaScript", "AI", "CKEditor"],
        liveUrl: "#",
    }
];

export function Projects() {
  const featuredImage = PlaceHolderImages.find(p => p.id === featuredProject.id);

  return (
    <section id="projects" className="w-full bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                My Work
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                A selection of projects that showcase my skills and passion for building great web experiences.
            </p>
        </div>

        {/* Featured Project */}
        <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto">
                    {featuredImage && (
                        <Image 
                            src={featuredImage.imageUrl}
                            alt={featuredImage.description}
                            data-ai-hint={featuredImage.imageHint}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                    <Badge className="w-fit">Featured Project</Badge>
                    <h3 className="mt-4 font-headline text-3xl font-bold">{featuredProject.title}</h3>
                    <p className="mt-4 text-muted-foreground">{featuredProject.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {featuredProject.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                    </div>
                    <div className="mt-8">
                        <Button asChild size="lg">
                            <Link href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo <ArrowUpRight className="ml-2 h-5 w-5"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>

        {/* Other Projects */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherProjects.map(project => {
                const projectImage = PlaceHolderImages.find(p => p.id === project.id);
                return (
                    <Card key={project.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <CardHeader className="p-0">
                            <div className="relative aspect-video">
                                {projectImage && (
                                     <Image 
                                        src={projectImage.imageUrl}
                                        alt={project.title}
                                        data-ai-hint={projectImage.imageHint}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-6">
                            <h4 className="font-headline text-xl font-bold">{project.title}</h4>
                            <p className="mt-2 text-muted-foreground">{project.description}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
                             <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={project.liveUrl}>
                                    View Details
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>

      </div>
    </section>
  );
}
