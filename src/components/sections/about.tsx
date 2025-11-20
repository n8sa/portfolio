import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { AiHighlighter } from "@/components/ai-highlighter";

const contributions = [
    { title: "AWANI Ramadan Microsite", description: "Built baseline with parallax hero, scroll-spied sticky nav, and various content features." },
    { title: "AI Integration in CMS", description: "Integrated 'Generate AI' workflow in CKEditor for auto-generating summaries & FAQs from an AI endpoint." },
    { title: "PHP AI Content Generator", description: "Developed a PHP loader script as a prompt builder and for cost calculation." },
    { title: "Quiz Microsite UI/UX", description: "Worked on UI and sessionStorage logic for resetting quiz data on the Belanjawan 2026 microsite." },
];

export function About() {
  return (
    <section id="about" className="w-full bg-card py-24 sm:py-32">
      <div className="container">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About Me
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                A brief look at my recent work and technical highlights, especially my contributions at Astro Awani.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Key Contributions at Astro Awani</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {contributions.map((item, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <AiHighlighter />
            </div>
        </div>
      </div>
    </section>
  );
}
