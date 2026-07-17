# BuzzFeed-Style Quiz — Plan

Stack: **TanStack Start + Neon (Drizzle) + shadcn/ui**

Users enter a name (no login), answer mixed-type questions (select, multi-select, ordering, free text), navigate back/forward without losing answers, submit, and get ranked on a leaderboard.

## 1. Stack & scaffolding

- **TanStack Start** — file-based routing via TanStack Router plus server functions, so no separate API is needed. `npm create @tanstack/start` (or the CLI's current equivalent).
- **Drizzle ORM** + `@neondatabase/serverless` for Neon — schema-in-TypeScript, works over Neon's HTTP driver (important for edge/serverless deploys).
- **shadcn/ui** init — needed components: `Button`, `Input`, `RadioGroup`, `Checkbox`, `Card`, `Progress`, `Table` (leaderboard). shadcn has no built-in sortable — use **dnd-kit** for the "order things" question and style it with shadcn primitives.

## 2. Data model (Neon)

Decision: hardcode questions in a typed TS config file instead of storing them in the DB. For a one-off quiz this skips an admin UI and gives full type safety. The DB only stores submissions:

```
submissions
  id            uuid pk
  name          text
  score         int
  answers       jsonb      -- keyed by question id, for auditing/re-scoring
  created_at    timestamptz
```

If reusable quizzes are wanted later, add `quizzes` and `questions` tables — skip for v1.

Question config sketch:

```ts
type Question =
    | { id: string; type: 'select'; prompt: string; options: string[]; correct: string }
    | { id: string; type: 'multi'; prompt: string; options: string[]; correct: string[] }
    | { id: string; type: 'order'; prompt: string; items: string[]; correctOrder: string[] }
    | { id: string; type: 'text'; prompt: string; accepted: string[] }; // normalized matching
```

This discriminated union is the backbone of the app — each question type gets its own renderer component and its own scoring function, all switched on `type`.

## 3. Routing & back/forward navigation

Two options:

- One route, step in component state — simplest, but the browser back button exits the quiz.
- **One route per step with the step index in the URL** (`/quiz/$step`), answers held in a store _above_ the routes — browser back/forward "just works", refresh keeps your place.

Chosen: `/quiz/$step` with a **Zustand store persisted to `sessionStorage`** (via its `persist` middleware) holding `{ name, answers: Record<questionId, Answer> }`. This gives:

- Seamless back/forward: navigating steps just changes the URL; answers never unmount from the store, so each step's component hydrates its inputs from `answers[questionId]`.
- Refresh-safety for free from the storage persistence.
- No form library needed — a multi-step wizard with heterogeneous question types is often simpler with a plain store + per-step validation function than one giant form.

Route sketch:

```
/                  → name entry, writes name to store, navigates to /quiz/1
/quiz/$step        → renders question[step-1] via a QuestionRenderer switch
/quiz/review       → optional: summary of answers before submit
/leaderboard       → results table
```

Guard: in `/quiz/$step`'s `beforeLoad`, redirect to `/` if there's no name in the store.

## 4. Per-question UX

- **select** → `RadioGroup`
- **multi** → `Checkbox` group
- **text** → `Input`, normalize on scoring (trim, lowercase)
- **order** → dnd-kit sortable list of shadcn `Card`s; store the current ordering as `string[]`
- `Progress` bar from `step / questions.length`, Back/Next buttons. Next is disabled (or shows a nudge) until the step has an answer — Back is always free, which is what makes back/forward feel seamless.

## 5. Submission & scoring (server-side!)

**Score on the server, never the client** — it's a leaderboard, so treat the client as untrusted. The client submits `{ name, answers }` to a TanStack Start server function, which:

1. Validates the payload with Zod (schema derived from the question config).
2. Runs scoring per question type: exact match for select, set-equality for multi, pairwise-order scoring for order (partial credit, feels fairer than positional), Levenshtein-or-exact for text.
3. Inserts into `submissions` and returns `{ score, rank }` — rank via `SELECT count(*) + 1 FROM submissions WHERE score > $score`.
4. Client clears the persisted store and navigates to `/leaderboard?highlight=<submissionId>`.

No login means names collide — decide upfront: allow duplicates (simplest, show timestamp) or suffix duplicates. Cap name length and sanitize; it's the only user input displayed to others.

## 6. Leaderboard

- Route loader calls a server function: `SELECT name, score, created_at FROM submissions ORDER BY score DESC, created_at ASC LIMIT 50`. Tie-break on earliest submission.
- shadcn `Table`, highlight the just-submitted row, medal emojis for top 3 for the BuzzFeed vibe.
- Index on `(score DESC, created_at ASC)` if it ever gets big; irrelevant at small scale.

## 7. Build order

1. Scaffold TanStack Start + shadcn + Drizzle, create the Neon project, push schema.
2. Question config + the Zustand persisted store.
3. Name entry page → `/quiz/$step` shell with Back/Next + Progress (dummy questions).
4. The four question renderers (do `order`/dnd-kit last — it's the fiddly one).
5. Server function: validate → score → insert → return rank.
6. Leaderboard page.
7. Polish: transitions between steps (even a simple slide animation sells the wizard feel), empty states, duplicate-name handling.

## Design notes

- The URL-step + external-store split is the classic wizard pattern: the router owns _position_, the store owns _data_. Coupling them (answers in route state) breaks on refresh; merging them (step in component state) breaks the browser back button.
- Server-side scoring isn't just anti-cheat hygiene — storing raw `answers` as jsonb means a scoring bug can be fixed later and everyone re-ranked without retaking the quiz.
- The discriminated union on `type` pays off three times with the same switch: rendering, validation, and scoring all narrow on it, so adding a fifth question type is one union member + three small functions.
