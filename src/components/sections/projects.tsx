import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const projects = [
    {
        id: "project-azure-vm",
        title: "Azure VM Deployment",
        description: "A guide to deploying Windows 10 on Azure.",
        details: "This project involved provisioning and configuring a Windows 10 Virtual Machine on Microsoft Azure. I set up the virtual network, configured network security group rules to allow RDP traffic, and assigned a public IP address. The entire process, from creating the resource group to establishing a successful remote desktop connection, was documented to serve as a guide for future deployments.",
        tech: ["Azure", "VM", "Networking"],
        liveUrl: "https://n8sa.github.io/farahPortfolio/Azure-VM-Deployment.pdf",
    },
    {
        id: "project-ramadan",
        title: "AWANI Ramadan Microsite",
        description: "An interactive microsite for Ramadan.",
        details: "This project was focused on creating an engaging and visually appealing microsite for the Ramadan campaign. I implemented several interactive features and ensured the design was fully responsive across all devices. The use of parallax scrolling and subtle animations helped create a memorable experience for visitors during the holy month.",
        tech: ["HTML", "CSS", "JavaScript"],
        liveUrl: "#",
    },
    {
        id: "project-ai-cms",
        title: "AI in AWANI CMS",
        description: "AI-powered content creation for a CMS.",
        details: "I played a key role in augmenting the capabilities of the internal Content Management System (CMS) by integrating AI. This involved using PHP and JavaScript to connect with third-party AI services. The new features automated tasks like generating content summaries and populating FAQ sections, which improved the efficiency of the content creation and management process.",
        tech: ["PHP", "JavaScript", "AI"],
        liveUrl: "#",
    }
];

export function Projects() {
  return (
    <section id="projects" className="w-full bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                More Projects
            </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => {
                const projectImage = PlaceHolderImages.find(p => p.id === project.id);
                return (
                    <Dialog key={project.id}>
                        <DialogTrigger asChild>
                            <Card className="group flex cursor-pointer flex-col overflow-hidden border-border bg-card/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
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
                                    <h3 className="font-headline text-xl font-bold">{project.title}</h3>
                                    <p className="mt-2 text-muted-foreground text-sm">{project.description}</p>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                         <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                            <DialogTitle className="font-headline text-3xl">{project.title}</DialogTitle>
                            <DialogDescription className="pt-4 text-base">
                                {project.details}
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-wrap gap-2 py-4">
                                {project.tech.map(t => <span key={t} className="text-sm text-primary">{t}</span>)}
                            </div>
                            {project.liveUrl !== "#" && (
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                                    View Live Project
                                </Link>
                            )}
                        </DialogContent>
                    </Dialog>
                )
            })}
        </div>

      </div>
    </section>
  );
}
