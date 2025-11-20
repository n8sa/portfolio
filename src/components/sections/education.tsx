import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

const education = [
    {
        institution: "Universiti Teknikal Malaysia Melaka",
        degree: "Bachelor of Computer Science (Artificial Intelligence)",
        duration: "2019-2023",
    },
    {
        institution: "Universiti Teknikal Malaysia Melaka",
        degree: "Diploma of Information and Communications Technology",
        duration: "2017-2019",
    },
];

const certifications = [
    {
        name: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "Issued Jun 2024",
    },
    {
        name: "Google Cloud Digital Leader",
        issuer: "Google",
        date: "Issued Apr 2023",
    },
    {
        name: "Microsoft Certified: Azure Fundamentals",
        issuer: "Microsoft",
        date: "Issued Mar 2023",
    }
];

export function Education() {
  return (
    <section id="education" className="w-full bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Education & Certifications
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
                My academic background and professional certifications.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                        <GraduationCap className="h-7 w-7 text-primary" />
                        Education
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {education.map((edu, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold">{edu.institution}</h3>
                            <p className="text-primary">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.duration}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                        <Award className="h-7 w-7 text-primary" />
                        Certifications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {certifications.map((cert, index) => (
                           <li key={index}>
                                <h4 className="font-semibold">{cert.name}</h4>
                                <p className="text-sm text-muted-foreground">{cert.issuer} &middot; {cert.date}</p>
                           </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
