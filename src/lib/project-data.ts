
export type ProjectImage = {
    url: string;
    alt: string;
    hint: string;
};

export type Project = {
    slug: string;
    category: string;
    title: string;
    description: string;
    features: string[];
    tech: string[];
    liveUrl: string;
    images: ProjectImage[];
};

export const projects: Project[] = [
    {
        slug: "kuiz-belanjawan-2026",
        category: "Web App",
        title: "KUIZ BELANJAWAN 2026",
        description: "A fast, modern microsite built for millennials and designed to attract the younger generation by making budget information fun, simple, and accessible through an interactive quiz experience.",
        features: [
            "Cyber UI",
            "Smooth transitions",
            "Responsive layout",
            "Lightweight AI logic"
        ],
        tech: ["HTML", "CSS", "GSAP", "JavaScript"],
        liveUrl: "https://pulse.astroawani.com/kuiz-belanjawan-2026",
        images: [
            { url: "/images/kuiz1.png", alt: "Kuiz Belanjawan main screen", hint: "website mockup" },
            { url: "/images/kuiz2.png", alt: "Kuiz Belanjawan results screen", hint: "quiz results" },
        ]
    },
    {
        slug: "awani-ramadan-microsite",
        category: "Web App",
        title: "AWANI RAMADAN MICROSITE",
        description: "A fully interactive Ramadan microsite with prayer times, news content, sliders, and animated hero sections.",
        features: [
            "Real-time prayer display",
            "Animation system",
            "Islamic-themed UI"
        ],
        tech: ["HTML", "Tailwind CSS", "JavaScript", "GSAP", "APIs"],
        liveUrl: "#",
        images: [
            { url: "https://picsum.photos/seed/rm-1/1200/800", alt: "Ramadan microsite hero section", hint: "islamic pattern" },
            { url: "https://picsum.photos/seed/rm-2/1200/800", alt: "Ramadan microsite prayer times", hint: "mobile app" },
        ]
    },
    {
        slug: "awani-ai-content-generator",
        category: "AI Tool",
        title: "AWANI AI CONTENT GENERATOR",
        description: "A CMS enhancement tool that generates summaries and FAQ using AI to speed up editorial workflow.",
        features: [
            "Auto-summary",
            "AI-powered FAQ",
            "Structured output",
            "Editor-friendly UI"
        ],
        tech: ["PHP", "JavaScript", "OpenAI API", "HTML/CSS"],
        liveUrl: "#",
        images: [
            { url: "https://picsum.photos/seed/ai-1/1200/800", alt: "AI content generator interface", hint: "dashboard ui" },
            { url: "https://picsum.photos/seed/ai-2/1200/800", alt: "Generated content example", hint: "text editor" },
        ]
    },
    {
        slug: "octopost",
        category: "Web App",
        title: "OCTOPOST",
        description: "A multi-phase content publishing and dashboard project. It includes a Post module for managing and scheduling content, and a Dashboard module for analytics and insights. My work included planning the entire development timeline and structuring the architecture for a cleaner, more modern workflow.",
        features: [
            "Post module for content publishing",
            "Dashboard module with analytics overview",
            "Clean timeline planning with weekly sprints",
            "Modern UI layout with smooth interactions"
        ],
        tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "API Integration"],
        liveUrl: "#",
        images: [
            { url: "https://picsum.photos/seed/octo-1/1200/800", alt: "Octopost dashboard view", hint: "dashboard analytics" },
            { url: "https://picsum.photos/seed/octo-2/1200/800", alt: "Octopost content scheduling UI", hint: "content calendar" },
        ]
    }
];
