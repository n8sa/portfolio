import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Cloud, Cog } from "lucide-react";

const skills = {
  "Frontend": {
    icon: <Code className="h-6 w-6 text-primary" />,
    items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript"]
  },
  "Backend": {
    icon: <Database className="h-6 w-6 text-primary" />,
    items: ["Node.js", "Firebase Functions", "PHP", "REST APIs"]
  },
  "Cloud & DevOps": {
    icon: <Cloud className="h-6 w-6 text-primary" />,
    items: ["Firebase", "Google Cloud", "CI/CD", "Vercel"]
  },
  "Tools & Other": {
    icon: <Cog className="h-6 w-6 text-primary" />,
    items: ["Git", "GitHub", "SendGrid", "CMS Integration", "Accessibility (WCAG)"]
  }
};

export function Skills() {
  return (
    <section id="skills" className="w-full bg-card py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                My Tech Stack
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                Technologies and tools I use to build modern, reliable applications.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, { icon, items }]) => (
            <Card key={category} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex-row items-center gap-4">
                {icon}
                <CardTitle className="font-headline text-xl">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
