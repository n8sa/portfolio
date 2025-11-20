import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Cloud, Cog } from "lucide-react";

const skills = {
  "Frontend": {
    icon: <Code className="h-6 w-6 text-primary" />,
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]
  },
  "Backend": {
    icon: <Database className="h-6 w-6 text-primary" />,
    items: ["Node.js", "Express", "PHP", "Firebase"]
  },
  "Cloud & Database": {
    icon: <Cloud className="h-6 w-6 text-primary" />,
    items: ["Azure", "GCP", "AWS", "MySQL", "PostgreSQL"]
  },
  "Tools & Other": {
    icon: <Cog className="h-6 w-6 text-primary" />,
    items: ["Git", "GitHub", "Jira", "Figma", "CI/CD", "Docker"]
  }
};

export function Skills() {
  return (
    <section id="skills" className="w-full bg-background py-24 sm:py-32">
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
            <Card key={category} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
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
