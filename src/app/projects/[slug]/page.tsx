'use client';

import { projects } from '@/lib/project-data';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function ProjectPage() {
  const params = useParams();
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

  const leftColVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const rightColVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: 0.2,
        },
    },
  };
  
  const imageHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const buttonHoverVariants = {
    hover: {
        scale: 1.05,
        filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))',
        transition: { duration: 0.3 }
    }
  }

  const renderImages = () => {
    if (!project.images || project.images.length === 0) {
      return null;
    }

    // New layout for exactly two images
    if (project.images.length === 2) {
      return (
        <motion.div
          variants={rightColVariants}
          className="grid grid-cols-1 grid-rows-1 gap-4 md:relative md:h-[450px]"
        >
          {project.images.map((img, index) => (
            <motion.div
              key={index}
              className="w-full overflow-hidden rounded-lg shadow-2xl md:absolute md:w-[75%]"
              style={{
                zIndex: 2 - index,
                top: `${index * 20}%`,
                left: `${index * 15}%`,
                rotate: `${index === 0 ? -2 : 5}deg`,
              }}
              variants={imageHoverVariants}
              whileHover="hover"
            >
              <Image
                src={img.url}
                alt={img.alt}
                width={800}
                height={600}
                className="aspect-[4/3] h-full w-full object-cover"
                data-ai-hint={img.hint}
              />
            </motion.div>
          ))}
        </motion.div>
      );
    }

    // Original layout for 1 or 3+ images
    return (
      <motion.div
        variants={rightColVariants}
        className="grid grid-cols-2 gap-4 md:relative md:mt-0 md:h-[450px]"
      >
        {project.images.slice(0, 3).map((img, index) => (
          <motion.div
            key={index}
            className="w-full overflow-hidden rounded-lg shadow-2xl md:absolute md:w-[80%]"
            style={{
              zIndex: 3 - index,
              top: `${index * 15}%`,
              left: `${index * 5}%`,
              rotate: `${(index - 1) * 4}deg`,
            }}
            variants={imageHoverVariants}
            whileHover="hover"
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={800}
              height={600}
              className="aspect-[4/3] h-full w-full object-cover"
              data-ai-hint={img.hint}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };


  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 md:h-screen md:overflow-hidden md:p-8"
    >
        <motion.div variants={leftColVariants} className="absolute top-8 left-8">
            <Link
            href="/?section=projects"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
            <motion.div whileHover={{ x: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                <ArrowLeft className="h-4 w-4" />
            </motion.div>
            Back to Projects
            </Link>
        </motion.div>

        <div className="container mx-auto mt-16 w-full max-w-6xl md:mt-0">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
                {/* Left Column */}
                <motion.div variants={leftColVariants} className="flex flex-col gap-8">
                    <motion.h1
                        variants={leftColVariants}
                        className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl"
                    >
                        {project.title}
                    </motion.h1>

                    <div>
                        <h2 className="text-lg font-bold text-primary">About the project</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                        {project.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-primary">Tech Stack</h2>
                        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            {project.tech.map((tech) => (
                            <li key={tech} className="rounded-md bg-muted/50 px-2 py-1">{tech}</li>
                            ))}
                        </ul>
                    </div>

                    {project.liveUrl && project.liveUrl !== '#' && (
                        <motion.div variants={buttonHoverVariants} whileHover="hover" className="w-full sm:w-auto">
                            <Button asChild size="lg" className="w-full rounded-full sm:w-auto">
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Column */}
                {renderImages()}
            </div>
        </div>
    </motion.main>
  );
}
