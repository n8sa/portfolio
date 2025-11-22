
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/project-data';

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

export function Projects() {
  return (
    <section
        id="projects"
        className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center"
      >
        <motion.h2
            variants={itemVariants}
            className="mb-16 font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl"
        >
            Projects
        </motion.h2>
        {projects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants}>
            <Link href={`/projects/${project.slug}`} className="group relative my-2 block cursor-pointer py-2 text-4xl font-bold text-foreground transition-all duration-300 ease-in-out hover:text-primary md:my-3 md:text-6xl md:tracking-tighter">
              <span className="relative z-10">{project.title}</span>
              <span className="absolute left-1/2 top-1/2 z-0 h-full w-0 -translate-x-1/2 -translate-y-1/2 bg-primary/10 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
