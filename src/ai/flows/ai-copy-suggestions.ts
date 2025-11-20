'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating AI-powered suggestions to refine descriptions of Astro Awani contributions.
 *
 * - `getAiCopySuggestions` -  An asynchronous function that takes a string describing Astro Awani contributions and returns AI-powered suggestions for improvement.
 * - `AiCopySuggestionsInput` - The input type for the getAiCopySuggestions function (a string).
 * - `AiCopySuggestionsOutput` - The output type for the getAiCopySuggestions function (a string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCopySuggestionsInputSchema = z.string().describe('A description of Astro Awani contributions to be refined.');
export type AiCopySuggestionsInput = z.infer<typeof AiCopySuggestionsInputSchema>;

const AiCopySuggestionsOutputSchema = z.string().describe('AI-powered suggestions for improving the description of Astro Awani contributions.');
export type AiCopySuggestionsOutput = z.infer<typeof AiCopySuggestionsOutputSchema>;

export async function getAiCopySuggestions(input: AiCopySuggestionsInput): Promise<AiCopySuggestionsOutput> {
  return aiCopySuggestionsFlow(input);
}

const aiCopySuggestionsPrompt = ai.definePrompt({
  name: 'aiCopySuggestionsPrompt',
  input: {schema: AiCopySuggestionsInputSchema},
  output: {schema: AiCopySuggestionsOutputSchema},
  prompt: `You are an AI assistant helping a software engineer refine the description of their contributions to Astro Awani.

  Given the following description, suggest improvements to highlight key achievements and present the work in the best possible light. Focus on clarity, impact, and quantifiable results where possible.

  Description: {{{$input}}}

  Suggestions:
  `,
});

const aiCopySuggestionsFlow = ai.defineFlow(
  {
    name: 'aiCopySuggestionsFlow',
    inputSchema: AiCopySuggestionsInputSchema,
    outputSchema: AiCopySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await aiCopySuggestionsPrompt(input);
    return output!;
  }
);
