import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const projects = [
    {
        id: "kuiz-belanjawan-2026",
        title: "Kuiz Belanjawan 2026",
        description: "Built a Ramadan microsite with a parallax hero and sticky nav. Integrated AI into the CMS to generate summaries and FAQs. Developed a PHP script for AI content generation. Worked on a quiz microsite.",
        details: "In this project, I was responsible for the front-end development of the Ramadan microsite, implementing a dynamic parallax scrolling effect for the hero section and a sticky navigation bar for a seamless user experience. A key achievement was integrating an AI-powered content generation service into the existing CMS. This involved developing a custom PHP script that connected to the AI API, which automated the creation of article summaries and frequently asked questions, significantly reducing the content team's workload.",
        tech: ["Next.js", "React", "Tailwind CSS", "AI"],
        liveUrl: "#",
    },
    {
        id: "project-azure-vm",
        title: "Azure VM Deployment",
        description: "Deploy a Windows 10 Virtual Machine on Microsoft Azure. Configure the virtual network, network security group, and public IP address for remote desktop access. Document the process from resource group creation to successful RDP connection.",
        details: "This project involved provisioning and configuring a Windows 10 Virtual Machine on Microsoft Azure. I set up the virtual network, configured network security group rules to allow RDP traffic, and assigned a public IP address. The entire process, from creating the resource group to establishing a successful remote desktop connection, was documented to serve as a guide for future deployments.",
        tech: ["Azure", "Virtual Machine", "Networking", "RDP"],
        liveUrl: "https://n8sa.github.io/farahPortfolio/Azure-VM-Deployment.pdf",
    },
    {
        id: "project-ramadan",
        title: "AWANI Ramadan Microsite",
        description: "A comprehensive microsite for Ramadan with dynamic content and interactive features.",
        details: "This project was focused on creating an engaging and visually appealing microsite for the Ramadan campaign. I implemented several interactive features and ensured the design was fully responsive across all devices. The use of parallax scrolling and subtle animations helped create a memorable experience for visitors during the holy month.",
        tech: ["HTML", "CSS", "JavaScript", "Parallax"],
        liveUrl: "#",
    },
    {
        id: "project-ai-cms",
        title: "AI in AWANI CMS",
        description: "Enhanced the internal CMS with AI capabilities to streamline content creation workflows.",
        details: "I played a key role in augmenting the capabilities of the internal Content Management System (CMS) by integrating AI. This involved using PHP and JavaScript to connect with third-party AI services. The new features automated tasks like generating content summaries and populating FAQ sections, which improved the efficiency of the content creation and management process.",
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

        <Dialog>
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
                            <DialogTrigger asChild>
                                <Button variant="outline" className="rounded-full">View Details</Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </div>
            </Card>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                <DialogTitle className="font-headline text-3xl">{featuredProject.title}</DialogTitle>
                <DialogDescription className="pt-2 text-base">
                    {featuredProject.details}
                </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 py-4">
                    {featuredProject.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
            </DialogContent>
        </Dialog>

        {/* Other Projects */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map(project => {
                const projectImage = PlaceHolderImages.find(p => p.id === project.id);
                return (
                    <Dialog key={project.id}>
                        <Card className="group flex flex-col overflow-hidden border-border bg-card/50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
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
                                <div className="w-full mt-4 flex gap-2">
                                    <Button variant="outline" className="w-full rounded-full" asChild>
                                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                            {project.liveUrl === "#" ? "Private" : "Live Demo"} <ArrowUpRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                     <DialogTrigger asChild>
                                        <Button variant="secondary" className="w-full rounded-full">View Details</Button>
                                    </DialogTrigger>
                                </div>
                            </CardFooter>
                        </Card>
                         <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                            <DialogTitle className="font-headline text-3xl">{project.title}</DialogTitle>
                            <DialogDescription className="pt-2 text-base">
                                {project.details}
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-wrap gap-2 py-4">
                                {project.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            })}
        </div>

      </div>
    </section>
  );
}
