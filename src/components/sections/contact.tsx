import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CopyButton } from "@/components/copy-button";

export function Contact() {
  const email = "farah.nisa.dev@example.com";

  return (
    <section id="contact" className="w-full bg-secondary/20 py-24 sm:py-32 flex justify-center items-center h-full">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                Contact
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Let's build something great together.
            </p>
        </div>
        
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-primary"/>
                    <div className="flex-1">
                        <h3 className="font-semibold">Email</h3>
                        <CopyButton textToCopy={email} />
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <Linkedin className="h-8 w-8 text-primary"/>
                    <div className="flex-1">
                        <h3 className="font-semibold">LinkedIn</h3>
                        <Button asChild variant="outline" className="w-full justify-start rounded-full">
                            <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                Connect with me
                            </Link>
                        </Button>
                    </div>
                 </div>
            </div>
            <div>
                 <ContactForm />
            </div>
        </div>
      </div>
    </section>
  );
}
