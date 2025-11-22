'use client';

import { projects } from '@/lib/project-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, transition: { duration: 0.3 } },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
      className="flex min-h-screen w-full flex-col bg-background"
    >
      <div className="container mx-auto max-w-4xl px-4 py-24 sm:py-32">
        <motion.div variants={containerVariants} className="flex flex-col gap-12">
            <motion.div variants={itemVariants}>
                <Link
                href="/projects"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
                </Link>
            </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl"
          >
            {project.title}
          </motion.h1>

          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-primary">About the project</h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                {project.description}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Tech Stack</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8">
             <div>
              <h2 className="text-xl font-bold text-primary">Features</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </motion.div>


          {project.liveUrl && project.liveUrl !== '#' && (
            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="rounded-full">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
}
