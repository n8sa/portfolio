"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    id: "2025-present",
    year: "2025 - Present",
    sentence: "Exploring digital innovation at Astro Awani — building fast web experiences, integrating AI into workflows, and learning to think like a modern creator.",
  },
  {
    id: "2022-2025",
    year: "2022 - 2025",
    sentence: "Engineering cloud and automation solutions at Fujitsu — solving problems, speeding up systems, and growing through real enterprise challenges.",
  },
  {
    id: "2021-2022",
    year: "2021 - 2022",
    sentence: "Designing cleaner interfaces and faster systems at Parkson Credit — where I learned to blend UI, logic, and collaboration.",
  },
  {
    id: "2021",
    year: "2021",
    sentence: "Starting my journey at Petronas Digital — building dashboards, testing APIs, and stepping into the world of modern software.",
  },
];

export function AboutTimeline() {
  const [activeYearId, setActiveYearId] = useState(timelineData[0].id);

  const activeSentence = timelineData.find(item => item.id === activeYearId)?.sentence;

  return (
    <section id="about" className="w-full bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-1">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl">
              About Me
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I build accessible web and cloud solutions with thoughtful front-end design and reliable backend architecture. I love learning, experimenting, and creating meaningful digital experiences with great teams.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-12 md:flex-row md:gap-8">
              <div className="flex flex-row flex-wrap gap-4 md:flex-col md:gap-6">
                {timelineData.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveYearId(item.id)}
                    className={cn(
                      "font-headline text-2xl font-bold tracking-tighter transition-colors duration-300 sm:text-3xl md:text-4xl",
                      activeYearId === item.id
                        ? "text-primary"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    )}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
              
              <div className="relative flex-1 md:pl-8">
                <div className="relative h-40 md:h-full">
                    {timelineData.map(item => (
                        <p
                            key={item.id}
                            className={cn(
                                "absolute inset-0 font-body text-2xl leading-snug text-foreground transition-all duration-500 ease-in-out sm:text-3xl",
                                activeYearId === item.id 
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4 pointer-events-none"
                            )}
                            aria-hidden={activeYearId !== item.id}
                        >
                            {item.sentence}
                        </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
