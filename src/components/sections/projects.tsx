import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "kuiz-belanjawan-2026",
        title: "Kuiz Belanjawan 2026",
        description: "Built a Ramadan microsite with a parallax hero and sticky nav. Integrated AI into the CMS to generate summaries and FAQs. Developed a PHP script for AI content generation. Worked on a quiz microsite.",
        tech: ["Next.js", "React", "Tailwind CSS", "AI"],
        liveUrl: "#",
    },
    {
        id: "project-azure-vm",
        title: "Azure VM Deployment",
        description: "Deploy a Windows 10 Virtual Machine on Microsoft Azure. Configure the virtual network, network security group, and public IP address for remote desktop access. Document the process from resource group creation to successful RDP connection.",
        tech: ["Azure", "Virtual Machine", "Networking", "RDP"],
        liveUrl: "https://n8sa.github.io/farahPortfolio/Azure-VM-Deployment.pdf",
    },
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
    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);
    const featuredImage = PlaceHolderImages.find(p => p.id === featuredProject.id);

  return (
    <section id="projects" className="w-full bg-secondary/20 py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 max-w-3xl">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                My Work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                A selection of projects that showcase my skills and passion for building great web experiences.
            </p>
        </div>

        {/* Featured Project */}
        <Card className="group grid grid-cols-1 overflow-hidden border-border bg-card/50 transition-shadow duration-300 hover:shadow-primary/10 hover:shadow-lg md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
                {featuredImage && (
                    <Image 
                        src={featuredImage.imageUrl}
                        alt={featuredProject.title}
                        data-ai-hint={featuredImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="flex flex-col justify-between p-8">
                <div>
                    <Badge variant="secondary" className="mb-4">Featured Project</Badge>
                    <CardTitle className="font-headline text-3xl font-bold">{featuredProject.title}</CardTitle>
                    <CardDescription className="mt-4 text-muted-foreground">{featuredProject.description}</CardDescription>
                </div>
                <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                        {featuredProject.tech.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                    </div>
                    <div className="mt-6 flex gap-4">
                        <Button className="rounded-full" asChild>
                            <Link href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo <ArrowUpRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                        <Button variant="outline" className="rounded-full">View Details</Button>
                    </div>
                </div>
            </div>
        </Card>

        {/* Other Projects */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map(project => {
                const projectImage = PlaceHolderImages.find(p => p.id === project.id);
                return (
                    <Card key={project.id} className="group flex flex-col overflow-hidden border-border bg-card/50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                        <CardHeader className="p-0">
                            <div className="relative aspect-video overflow-hidden">
                                {projectImage && (
                                     <Image 
                                        src={projectImage.imageUrl}
                                        alt={project.title}
                                        data-ai-hint={projectImage.imageHint}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-6">
                            <h4 className="font-headline text-xl font-bold">{project.title}</h4>
                            <p className="mt-2 text-muted-foreground text-sm">{project.description}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
                             <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                            </div>
                            <Button variant="outline" className="w-full mt-4 rounded-full" asChild>
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    {project.liveUrl === "#" ? "View Details" : "Live Demo"} <ArrowUpRight className="ml-2 h-4 w-4"/>
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
