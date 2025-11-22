# Farah Nisa's Personal Portfolio

This is the source code for Farah Nisa Syahindah's personal portfolio website. It's a modern, single-page application designed to showcase her journey, projects, and skills as a software and cloud engineer. The site is built with a focus on clean aesthetics, smooth animations, and a cinematic user experience.

## Tech Stack

This project is built with a modern, production-ready tech stack:

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit) (for potential AI-powered features)

## Key Features

*   **Single-Page Experience:** A seamless, single-page application where sections transition smoothly without full page reloads.
*   **Animated & Interactive UI:** Built with Framer Motion to create a fluid and engaging user experience.
*   **Project Showcase:** A dedicated, cinematic layout for each project, highlighting key details and images.
*   **Responsive Design:** Fully responsive layout that adapts beautifully from large desktops to mobile devices.
*   **Centralized Project Data:** Project information is managed in `src/lib/project-data.ts`, making it simple to add, update, or remove projects.

## Getting Started

To run this project locally, you'll need to have [Node.js](https://nodejs.org/) and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

## Project Structure

*   `src/app/`: Contains the main pages and layouts of the application.
*   `src/components/`: Reusable React components, including UI elements from ShadCN and custom sections.
*   `src/lib/`: Contains utility functions (`utils.ts`), project data (`project-data.ts`), and schemas.
*   `public/`: Static assets, including images.
*   `tailwind.config.ts`: Configuration for Tailwind CSS.
*   `next.config.ts`: Configuration for Next.js.
