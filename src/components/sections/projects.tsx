
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        id: "project-azure-vm",
        category: "Cloud Infrastructure",
        title: "Azure VM Deployment",
        description: "A documented guide to provisioning a Windows 10 VM on Azure, including network and security configuration.",
        details: "This project involved provisioning and configuring a Windows 10 Virtual Machine on Microsoft Azure. I set up the virtual network, configured network security group rules to allow RDP traffic, and assigned a public IP address. The entire process, from creating the resource group to establishing a successful remote desktop connection, was documented to serve as a guide for future deployments.",
        tech: ["Azure", "VM", "Networking", "Security"],
        liveUrl: "https://n8sa.github.io/farahPortfolio/Azure-VM-Deployment.pdf",
    },
    {
        id: "project-ramadan",
        category: "Web App",
        title: "AWANI Ramadan Microsite",
        description: "An interactive and responsive microsite for a major Ramadan campaign, featuring parallax scrolling.",
        details: "This project was focused on creating an engaging and visually appealing microsite for the Ramadan campaign. I implemented several interactive features and ensured the design was fully responsive across all devices. The use of parallax scrolling and subtle animations helped create a memorable experience for visitors during the holy month.",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        liveUrl: "#",
    },
    {
        id: "project-ai-cms",
        category: "AI Tool",
        title: "AI in AWANI CMS",
        description: "Integrated AI into a CMS to automate content generation, summaries, and FAQ creation.",
        details: "I played a key role in augmenting the capabilities of the internal Content Management System (CMS) by integrating AI. This involved using PHP and JavaScript to connect with third-party AI services. The new features automated tasks like generating content summaries and populating FAQ sections, which improved the efficiency of the content creation and management process.",
        tech: ["PHP", "JavaScript", "AI", "CMS"],
        liveUrl: "#",
    }
];

type Project = typeof projects[0];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="w-full bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A selection of my work. Click a card to see more.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.id);
            return (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card/50 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
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
                <div className="flex flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</span>
                    <h3 className="font-headline mt-2 text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-grow">{project.description}</p>
                    {project.liveUrl !== '#' && (
                         <Button asChild variant="link" className="p-0 h-auto mt-4 self-start">
                             <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                Open Project <ArrowUpRight className="ml-1 h-4 w-4"/>
                            </Link>
                         </Button>
                    )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="relative aspect-video overflow-hidden">
                    {PlaceHolderImages.find(p => p.id === selectedProject.id) && (
                        <Image 
                            src={PlaceHolderImages.find(p => p.id === selectedProject.id)!.imageUrl}
                            alt={selectedProject.title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white hover:text-white" onClick={() => setSelectedProject(null)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>

                <div className="p-8">
                     <span className="text-xs font-semibold uppercase tracking-wider text-primary">{selectedProject.category}</span>
                     <h2 className="font-headline mt-2 text-3xl font-bold">{selectedProject.title}</h2>
                     <div className="mt-4 flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => (
                            <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{t}</span>
                        ))}
                    </div>
                     <p className="mt-6 text-base text-muted-foreground">{selectedProject.details}</p>
                     
                     {selectedProject.liveUrl !== '#' && (
                        <Button asChild className="mt-8 rounded-full">
                            <Link href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                View Live Project <ArrowUpRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                     )}
                </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
