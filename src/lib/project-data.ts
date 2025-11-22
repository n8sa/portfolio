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
        title: "Kuiz Belanjawan 2026",
        description: "A fast and modern quiz microsite for younger audiences, built with cyber-style UI and AI-enhanced elements to make budget information fun and accessible.",
        features: [
            "Cyber UI",
            "Smooth transitions",
            "Responsive layout",
            "Lightweight AI logic"
        ],
        tech: ["Next.js", "React", "Tailwind CSS", "AI Integration", "PHP"],
        liveUrl: "https://pulse.astroawani.com/kuiz-belanjawan-2026",
        images: [
            { url: "https://picsum.photos/seed/kb-1/1200/800", alt: "Kuiz Belanjawan main screen", hint: "website mockup" },
            { url: "https://picsum.photos/seed/kb-2/1200/800", alt: "Kuiz Belanjawan UI flow", hint: "quiz interface" },
        ]
    },
    {
        slug: "awani-ramadan-microsite",
        category: "Web App",
        title: "AWANI Ramadan Microsite",
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
        title: "AWANI AI Content Generator (CMS)",
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
        slug: "budget-calculator-2026",
        category: "Web App",
        title: "Budget Calculator 2026",
        description: "A lightweight quiz calculator with a simple step-by-step UI for public engagement.",
        features: [
            "Clean steps",
            "Responsive UI",
            "Fast scoring logic",
        ],
        tech: ["JavaScript", "HTML", "Tailwind CSS"],
        liveUrl: "#",
        images: [
            { url: "https://picsum.photos/seed/bc-1/1200/800", alt: "Budget calculator step 1", hint: "form interface" },
            { url: "https://picsum.photos/seed/bc-2/1200/800", alt: "Budget calculator results screen", hint: "chart graph" },
        ]
    },
    {
        slug: "personal-portfolio",
        category: "Web App",
        title: "Personal Portfolio",
        description: "A cinematic one-page experience with static sections, bold typography, and animated transitions designed to reflect my identity and craft.",
        features: [
            "Full-viewport sections",
            "FARAH timeline animation",
            "Smooth navigation"
        ],
        tech: ["Next.js/React", "Tailwind", "GSAP", "Framer Motion"],
        liveUrl: "/",
        images: [
             { url: "https://picsum.photos/seed/pp-1/1200/800", alt: "Portfolio hero section", hint: "minimalist website" },
             { url: "https://picsum.photos/seed/pp-2/1200/800", alt: "Portfolio about section", hint: "timeline design" },
        ]
    }
];
