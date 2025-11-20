import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CopyButton } from "@/components/copy-button";

export function Contact() {
  const email = "farah.nisa.dev@example.com";

  return (
    <section id="contact" className="w-full bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get In Touch
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Send me a message</CardTitle>
                    <CardDescription>I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
            <div className="flex flex-col justify-center gap-6">
                 <Card className="bg-card">
                    <CardContent className="p-6">
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground text-sm mb-4">For direct inquiries.</p>
                        <CopyButton textToCopy={email} />
                    </CardContent>
                 </Card>
                 <Card className="bg-card">
                    <CardContent className="p-6">
                        <h3 className="font-semibold">LinkedIn</h3>
                        <p className="text-muted-foreground text-sm mb-4">Connect with me professionally.</p>
                        <Button asChild className="w-full">
                            <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-2 h-4 w-4" />
                                Visit my LinkedIn
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
