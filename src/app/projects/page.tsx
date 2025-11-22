'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/project-data';
import { ArrowLeft } from 'lucide-react';

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

export default function ProjectsPage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, transition: { duration: 0.3 } },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4"
    >
        <Link
            href="/"
            className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
        </Link>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants}>
            <Link href={`/projects/${project.slug}`} legacyBehavior>
              <a className="group relative my-2 block cursor-pointer py-2 text-4xl font-bold text-foreground transition-all duration-300 ease-in-out hover:text-primary md:my-3 md:text-6xl md:tracking-tighter">
                <span className="relative z-10">{project.title}</span>
                <span className="absolute left-1/2 top-1/2 z-0 h-full w-0 -translate-x-1/2 -translate-y-1/2 bg-primary/10 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
