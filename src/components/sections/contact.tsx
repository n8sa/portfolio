'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';
import { ContactForm } from '../contact-form';

const iconVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))',
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

        <div className="mt-8 flex items-center justify-center gap-10">
          <motion.button
            onClick={handleEmailCopy}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="cursor-pointer"
            aria-label="Copy email address"
          >
            <Mail className="h-12 w-12 text-primary transition-colors duration-300 hover:text-accent" />
          </motion.button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.button
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="cursor-pointer"
                aria-label="Open LinkedIn profile"
              >
                <Linkedin className="h-12 w-12 text-primary transition-colors duration-300 hover:text-accent" />
              </motion.button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Open LinkedIn profile?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to navigate to an external site.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Link href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                    Continue
                  </Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">...or just send me a message here.</p>
        </div>

        <div className="mt-6 w-full">
            <ContactForm />
        </div>

      </motion.div>
    </section>
  );
}
