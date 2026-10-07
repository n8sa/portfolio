
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
    linkedInPostUrl?: string;
    images: ProjectImage[];
};

export const projects: Project[] = [
    {
        slug: "kuiz-belanjawan-2027",
        category: "Web App",
        title: "KUIZ BELANJAWAN 2027",
        description: "Astro AWANI's Belanjawan 2027 microsite, made up of two parts: Dunia Belanjawan, an interactive city where each building reveals a ministry's allocation year by year, and Kalkulator Manfaat, a 10-question quiz that shows which budget benefits may apply to you.",
        features: [
            "Interactive city map of the six largest ministry allocations",
            "Year-by-year timeline from 2022 to 2026",
            "10-question benefits calculator quiz",
            "Buildings light up to match the benefits in your result"
        ],
        tech: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://pulse.astroawani.com/belanjawan-2027-infografik/",
        images: [
            { url: "/images/belanjawan2027-1.png", alt: "Dunia Belanjawan interactive city map", hint: "interactive infographic" },
            { url: "/images/belanjawan2027-2.png", alt: "Kalkulator Manfaat quiz question", hint: "quiz interface" },
        ]
    },
    {
        slug: "berita-swipe",
        category: "Web App",
        title: "BERITA SWIPE",
        description: "An AI-personalized news swipe prototype for Astro AWANI that cuts through news overload: no endless scrolling, just the 5 most relevant stories of the day. It uses the OpenAI API to tag articles and generate questions, then personalizes each reader's stories from their answers to mood-based questions, what is happening that day, and how they interact during the session.",
        features: [
            "AI article tagging and categorization with the OpenAI API",
            "AI-generated, mood-based questions to personalize the feed",
            "Recommendations from session-based reader signals and the day's news",
            "Editorial dashboard tracking readers, swipes, and article opens"
        ],
        tech: ["HTML", "CSS", "JavaScript", "OpenAI API"],
        liveUrl: "#",
        linkedInPostUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7509853351384313856?collapsed=1",
        images: [
            { url: "/images/beritaswipe1.png", alt: "Berita Swipe welcome screen", hint: "news app" },
            { url: "/images/beritaswipe2.png", alt: "Newsroom AI editorial dashboard", hint: "dashboard ui" },
        ]
    },
    {
        slug: "jiwa-sme",
        category: "Website",
        title: "JIWA SME",
        description: "The official website for Jiwa SME, Astro AWANI's nationwide initiative connecting entrepreneurs with opportunities, inspiration, and community. It brings together the speaker line-up, impact numbers, news coverage, and a gallery of events held across Malaysia.",
        features: [
            "Speaker line-up for each event location",
            "Impact metrics section",
            "Photo and video hub from 2023 to 2026",
            "Sponsors, partners, and event registration"
        ],
        tech: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://www.jiwasme.com.my/",
        images: [
            { url: "/images/jiwa1.png", alt: "Jiwa SME homepage hero", hint: "website homepage" },
            { url: "/images/jiwa2.png", alt: "Jiwa SME speaker profiles section", hint: "speaker profiles" },
        ]
    },
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
            { url: "/images/ai1.png", alt: "AI content generator interface", hint: "dashboard ui" },
            { url: "/images/ai2.png", alt: "Generated content example", hint: "text editor" },
        ]
    }
];
