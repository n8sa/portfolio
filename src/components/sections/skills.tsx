import { Badge } from "@/components/ui/badge";

const skills = [
  "HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS",
  "Node.js", "Express", "PHP", "Firebase", "Azure", "GCP", "AWS",
  "MySQL", "PostgreSQL", "Git", "GitHub", "Jira", "Figma", "CI/CD", "Docker"
];

export function Skills() {
  return (
    <section id="skills" className="w-full bg-background py-24 sm:py-32">
      <div className="container text-center">
        <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
          Skills
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {skills.map(skill => (
            <Badge key={skill} variant="secondary" className="px-4 py-2 text-base transition-colors hover:bg-primary hover:text-primary-foreground">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
