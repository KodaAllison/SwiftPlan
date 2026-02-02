# SwiftPlan

**SwiftPlan** was developed for my dissertation project in the third year of my degree. It is a Next.js web application that helps educators generate and manage lesson plans. Users sign in with Google, create and edit lesson plans, and can download them. The app uses AI-assisted generation, Mantine for UI, NextAuth for authentication, and Prisma with a SQLite-compatible database.

I researched teacher overwork and the time educators spend on lesson planning, and included statistics in the dissertation on how much a tool like SwiftPlan could save. I also carried out in-depth research into prompt engineering techniques relevant to the application (the landscape has likely changed considerably since the project was written). The dissertation documented the full lifecycle: project planning with Gantt charts, requirements gathering and specification, iterative development, and testing. It concluded with a poster presentation where I summarised my work and demoed SwiftPlan to visitors at my stand.

**Links:** [Dissertation (PDF)](docs/dissertation.pdf) · [Portfolio](#)

The dissertation is included in this repo as a PDF. Add your portfolio URL above when you have it.

*Dissertation: © 2025. Submitted to Newcastle University, School of Computing (BSc). All rights reserved.*

---

## Getting Started

To run the project locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You’ll need to configure environment variables (see below) for full functionality.

### OpenAI API key (lesson plan generation)

Lesson plan generation calls the OpenAI Chat Completions API (GPT-4). You need:

1. **An OpenAI API key** — Create one at [platform.openai.com](https://platform.openai.com/api-keys).
2. **Set it in your environment** — Add `OPENAI_API_KEY=your-key-here` to a `.env` or `.env.local` file in the project root (do not commit this file).
3. **Usage and tokens** — Each generation uses your OpenAI account’s token quota. Usage is billed per token according to [OpenAI’s pricing](https://openai.com/pricing); ensure your account has credits or billing enabled if you want generation to work.

Without a valid `OPENAI_API_KEY`, the generate endpoint will fail when users try to create a lesson plan.

---

## Tech Stack

- **Next.js** (App Router)
- **React** with **Mantine** (UI) and **React Hook Form**
- **NextAuth** (Google sign-in) with **Prisma** adapter
- **Prisma** (database)
- **Tailwind CSS**

---

## Deploy on Vercel

You can deploy this Next.js app on [Vercel](https://vercel.com). See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
