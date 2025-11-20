"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { generateSuggestions } from "@/app/actions";

export function AiHighlighter() {
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const defaultDescription = "Built a Ramadan microsite with a parallax hero and sticky nav. Integrated AI into the CMS to generate summaries and FAQs. Developed a PHP script for AI content generation. Worked on a quiz microsite.";

  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    setSuggestions("");
    const currentDescription = description || defaultDescription;
    
    try {
      const result = await generateSuggestions(currentDescription);
      if (result.success) {
        setSuggestions(result.suggestions || "No suggestions were generated.");
      } else {
        setError(result.error || "An unknown error occurred.");
      }
    } catch (e) {
      setError("Failed to connect to the AI service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-b-0">
          <CardHeader>
            <AccordionTrigger className="p-0 hover:no-underline">
                <div className="text-left">
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                        <Wand2 className="h-6 w-6 text-primary" />
                        AI Copy Enhancer
                    </CardTitle>
                    <CardDescription className="mt-2">
                        Get AI-powered tips to refine project descriptions.
                    </CardDescription>
                </div>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent>
            <CardContent>
              <Textarea
                placeholder="Or enter your own project description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4 min-h-[120px]"
                aria-label="Project description"
              />
              <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get Suggestions"
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              {suggestions && (
                <div className="w-full rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <h4 className="mb-2 flex items-center font-semibold text-primary">
                    <Sparkles className="mr-2 h-5 w-5" />
                    AI Suggestions
                  </h4>
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">{suggestions}</p>
                </div>
              )}
              {error && (
                <div className="w-full rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
                   <h4 className="mb-2 flex items-center font-semibold text-destructive">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Error
                  </h4>
                  <p>{error}</p>
                </div>
              )}
            </CardFooter>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
