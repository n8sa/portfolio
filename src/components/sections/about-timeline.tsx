"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    id: "2023-present",
    year: "Aug 2023 - Present",
    sentence: "Exploring digital innovation at Astro Awani — building fast web experiences and integrating AI into workflows.",
  },
  {
    id: "2022-2023",
    year: "2022 - 2023",
    sentence: "Engineering cloud and automation solutions at Fujitsu — solving meaningful problems.",
  },
  {
    id: "2021-2022",
    year: "2021 - 2022",
    sentence: "Designing cleaner interfaces at Parkson Credit.",
  },
  {
    id: "2021",
    year: "May 2021 - Aug 2021",
    sentence: "Starting my journey at Petronas Digital.",
  },
];

export function AboutTimeline() {
  const [activeYearId, setActiveYearId] = useState(timelineData[0].id);

  return (
    <section id="about" className="w-full bg-background py-24 sm:py-32 flex justify-center items-center h-full">
      <div className="container">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-24">
          <div className="lg:col-span-1">
            <h2 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl">
              About
            </h2>
            <p className="mt-6 text-base text-muted-foreground md:text-lg">
              I build accessible web and cloud solutions with thoughtful front-end design and reliable backend architecture. I love learning, experimenting, and creating meaningful digital experiences with great teams.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-12">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {timelineData.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveYearId(item.id)}
                    className={cn(
                      "font-headline text-2xl font-bold tracking-tighter transition-colors duration-300 sm:text-3xl",
                      activeYearId === item.id
                        ? "text-primary"
                        : "text-muted-foreground/40 hover:text-muted-foreground"
                    )}
                  >
                    {item.year}
                  </button>
                ))}
              </div>
              
              <div className="relative h-20">
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
    </section>
  );
}
