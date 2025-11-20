import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CopyButton } from "@/components/copy-button";

export function Contact() {
  const email = "farah.nisa.dev@example.com";

  return (
    <section id="contact" className="w-full bg-secondary/20 py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                Get In Touch
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
        </div>
        
        <div className="mx-auto max-w-lg">
            <Card className="border-border bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Send a message</CardTitle>
                    <CardDescription>I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card className="bg-card/50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <Mail className="h-8 w-8 mb-2 text-primary"/>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground text-sm mb-4">For direct inquiries.</p>
                        <CopyButton textToCopy={email} />
                    </CardContent>
                 </Card>
                 <Card className="bg-card/50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                        <Linkedin className="h-8 w-8 mb-2 text-primary"/>
                        <h3 className="font-semibold">LinkedIn</h3>
                        <p className="text-muted-foreground text-sm mb-4">Connect with me.</p>
                        <Button asChild className="w-full rounded-full">
                            <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                Visit LinkedIn
                            </Link>
                        </Button>
                    </CardContent>
                 </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
