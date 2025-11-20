import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle } from "lucide-react";

const workExperience = [
    {
        company: "Astro Awani Network",
        role: "Full-stack Developer",
        duration: "Aug 2023 - May 2024",
        responsibilities: [
            "Spearheaded the development and maintenance of web applications using React, Next.js, and Node.js, resulting in a 20% increase in user engagement.",
            "Integrated AI-powered content generation features into the company's CMS, reducing content creation time by 30%.",
            "Managed cloud infrastructure on AWS and GCP, ensuring high availability and scalability for all applications.",
            "Contributed to the development of the Ramadan and Budget 2026 microsites, attracting over 1 million unique visitors.",
        ]
    },
    {
        company: "Telekom Malaysia",
        role: "Software Engineer Intern",
        duration: "Feb 2023 - Aug 2023",
        responsibilities: [
            "Developed and maintained web applications using React and Node.js.",
            "Collaborated with cross-functional teams to deliver high-quality software products.",
            "Participated in code reviews and contributed to the team's best practices."
        ]
    }
];

export function Experience() {
  return (
    <section id="experience" className="w-full bg-card py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Work Experience
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                My professional journey and key accomplishments.
            </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
            {workExperience.map((job, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="font-headline text-2xl">{job.role}</CardTitle>
                                <CardDescription className="text-base">{job.company}</CardDescription>
                            </div>
                            <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                                {job.duration}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {job.responsibilities.map((task, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                    <span className="text-foreground/90">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
