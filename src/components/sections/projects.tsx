
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/lib/project-data';
import Image from 'next/image';

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
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX - 100); // Offset to center the image on the cursor
    cursorY.set(e.clientY - 100);
  };

  const getHoveredProjectImage = () => {
    if (!hoveredProject) return null;
    const project = projects.find(p => p.slug === hoveredProject);
    return project?.images?.[0] || null;
  };

  const hoveredImage = getHoveredProjectImage();

  return (
    <section
        id="projects"
        className="relative flex min-h-full w-full flex-col items-center justify-center bg-background p-4"
        onMouseMove={handleMouseMove}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center"
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            variants={itemVariants}
            onHoverStart={() => setHoveredProject(project.slug)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <Link href={`/projects/${project.slug}`} className="group relative my-2 block cursor-pointer py-2 text-4xl font-bold text-foreground transition-all duration-300 ease-in-out hover:text-primary md:my-3 md:text-6xl md:tracking-tighter">
              <span className="relative z-10">{project.title}</span>
              <span className="absolute left-1/2 top-1/2 z-0 h-full w-0 -translate-x-1/2 -translate-y-1/2 bg-primary/10 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

       <motion.div
        style={{
          translateX: springX,
          translateY: springY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-50 h-48 w-48 overflow-hidden rounded-lg"
      >
        <motion.div
            animate={{
                opacity: hoveredImage ? 1 : 0,
                scale: hoveredImage ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full w-full"
        >
            {hoveredImage && (
                <Image
                    src={hoveredImage.url}
                    alt={hoveredImage.alt}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                    data-ai-hint={hoveredImage.hint}
                />
            )}
        </motion.div>
      </motion.div>

    </section>
  );
}
