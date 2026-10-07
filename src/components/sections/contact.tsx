'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import React from 'react';

const iconVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300 },
  },
};

export function Contact() {
  const { toast } = useToast();
  const email = 'farahnisasyahindah@gmail.com';
  const linkedInUrl = 'https://www.linkedin.com/in/farahnisasyahindah';

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast({
        title: 'Email copied to clipboard',
        description: email,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Failed to copy',
        description: 'Could not copy email to clipboard.',
      });
    }
  };

  return (
    <section id="contact" className="h-full w-full bg-background flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center w-full max-w-md"
      >
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Let’s Connect
        </h2>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-headline text-lg font-bold text-primary">
              FN
            </div>
            <div className="min-w-0">
              <p className="font-headline text-lg font-bold text-foreground">Farah Nisa Syahindah</p>
              <p className="text-sm text-muted-foreground">Software &amp; Cloud Engineer</p>
            </div>
            <Linkedin className="ml-auto h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          </div>
          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <Link href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <motion.button
          onClick={handleEmailCopy}
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          aria-label="Copy email address"
        >
          <Mail className="h-4 w-4" />
          {email}
        </motion.button>
      </motion.div>
    </section>
  );
}
