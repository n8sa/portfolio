import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle } from "lucide-react";

const workExperience = [
    {
        company: "Fujitsu System Global Solution Sdn Bhd",
        role: "System Engineer",
        duration: "Feb 2022 - Apr 2025",
        responsibilities: [
            "Deployed and configured 10+ Azure Virtual Machines (Windows Server 2016/2019/2022 with Japanese locale).",
            "Streamlined deployments by 15% through efficient resource group setup and server parameter tuning.",
            "Migrated data across VMs using PowerShell, OneDrive, and SharePoint automation in ServiceNow-driven workflows.",
            "Explored Microsoft Power Apps and Power Automate through self-learning and exposure to an internal productivity tracking system.",
            "Automated bulk Excel processing using VBScript, cutting manual effort by over 50%.",
            "Enhanced financial reporting visibility by integrating PowerShell and Batch scripts for log tracking and system auditing.",
            "Converted legacy VBA logic into T-SQL, accelerating query performance by 40% for Japanese backend applications."
        ]
    },
    {
        company: "Parkson Credit Sdn Bhd",
        role: "Software Engineer",
        duration: "Sep 2021 - Feb 2022",
        responsibilities: [
            "Redesigned UI for enterprise web system using React.js and Ant Design, improving load times by 30% and user satisfaction.",
            "Developed standardized layout components, resulting in 50% faster feature deployments.",
            "Streamlined team workflows using GitHub and Jira, enhancing project tracking accuracy by 25%.",
            "Expanded backend proficiency through hands-on experience with Node.js, C#, and SQL."
        ]
    },
    {
        company: "Astro Awani Network",
        role: "Digital Tech Apprentice",
        duration: "Aug 2023 - May 2024",
        responsibilities: [
            "Spearheaded the development and maintenance of web applications using React, Next.js, and Node.js, resulting in a 20% increase in user engagement.",
            "Integrated AI-powered content generation features into the company's CMS, reducing content creation time by 30%.",
            "Managed cloud infrastructure on AWS and GCP, ensuring high availability and scalability for all applications.",
            "Contributed to the development of the Ramadan and Budget 2026 microsites, attracting over 1 million unique visitors.",
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
