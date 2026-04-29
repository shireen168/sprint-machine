# Sprint Machine

AI-powered 30-day marketing sprint generator for solo founders and small businesses.

Answer 8 questions about your product, audience, and goals. Get back a complete, ready-to-execute 30-day marketing plan with channel strategy, daily content calendar, copy frameworks, and success metrics.

**Live:** [sprint-machine.vercel.app](https://sprint-machine.vercel.app)

---

## Tech Stack

- **Framework:** Next.js 16.2.4
- **Database:** Supabase (Postgres)
- **Auth:** Clerk
- **AI:** Claude (Anthropic SDK)
- **UI:** shadcn/ui, Tailwind CSS 4, Framer Motion
- **Deployment:** Vercel

---

## Clone & Run Locally

```bash
git clone https://github.com/shireen168/sprint-machine.git
cd sprint-machine/codebase
npm install
cp .env.local.example .env.local  # Add your API keys
npm run dev
```

Visit `http://localhost:3000`

---

## Project Structure

```
codebase/
├── app/                    # Next.js app routes
├── components/             # React components
├── lib/                    # Utilities and helpers
├── types/                  # TypeScript types
└── public/                 # Static assets
```

---

## Key Features

- 8-question intake form
- AI-generated 30-day sprint plan
- Edit and regenerate sprints
- Download sprint as PDF
- Guest mode (no sign-up required)
- Authentication with Clerk

---

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## License

Open source. 
