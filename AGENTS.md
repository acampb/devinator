# AGENTS.md — Agentic Validation Testbed

## Project Overview

A lightweight React + TypeScript single-page application used as an **agentic validation testbed** — i.e., a sandbox for testing agent-driven code changes. It ships a simple multi-page Todo app (home, About, FAQ, Pricing) rendered entirely client-side via React 19. There is no backend, no router library, and no state-management library; page navigation is handled with a single `useState` in `App.tsx`.

---

## Build, Test & Dev Commands

All commands run from the repo root. **Use `npm` — there is no Yarn or pnpm config here.**

| Purpose | Command |
|---|---|
| Start dev server (HMR) | `npm run dev` |
| Type-check + production build | `npm run build` |
| Run tests (single pass) | `npm run test` |
| Lint (ESLint) | `npm run lint` |
| Preview production build locally | `npm run preview` |

- **Dev server**: Vite on `http://localhost:5173` (default).
- **Build output**: `dist/` (gitignored).
- **Test runner**: Vitest with `jsdom` environment and `@testing-library/react`. Setup file is `src/test/setup.ts` (imports `@testing-library/jest-dom/vitest`).
- **Type-checking**: `tsc -b` (project references via `tsconfig.app.json` + `tsconfig.node.json`). `noEmit: true` — the compiler never writes output files; Vite handles bundling.

---

## Directory Layout

```
/
├── index.html              # HTML entry point; mounts #root
├── index.js                # Legacy Node "Hello World" stub (pre-existing, not part of the app)
├── package.json
├── vite.config.ts          # Vite config; also configures Vitest
├── tsconfig.json           # Project-references root (no compilerOptions here)
├── tsconfig.app.json       # Compiler settings for src/
├── tsconfig.node.json      # Compiler settings for vite.config.ts
├── eslint.config.js        # ESLint flat config (TS + React hooks + React Refresh)
├── public/                 # Static assets served verbatim
└── src/
    ├── main.tsx            # React root — renders <App /> into #root
    ├── App.tsx             # Root component; owns page-state and todo-list state
    ├── App.css             # Global / App-scoped styles
    ├── App.test.tsx        # Integration tests for App
    ├── index.css           # Base/reset styles
    ├── About.tsx           # About page component
    ├── FAQ.tsx             # FAQ page component (accordion, has own FAQ.css)
    ├── FAQ.css
    ├── Pricing.tsx         # Pricing page component
    └── test/
        └── setup.ts        # Vitest global setup (jest-dom matchers)
```

---

## Key Conventions & Coding Style

### TypeScript
- **All new source files must be `.tsx` or `.ts`** — no new `.js`/`.cjs`/`.mjs` files.
- Target: `es2023`; module resolution: `bundler`. Import source files with their extensions where required (`import './App.css'`).
- `verbatimModuleSyntax` is on — use `import type` for type-only imports.
- Strict unused-variable checks: `noUnusedLocals` and `noUnusedParameters` are both enabled. Don't leave dead code.

### React
- **Functional components only** — no class components.
- Named exports for page components (`export function About()`). Default export only for `App`.
- Co-locate a component's CSS file next to it (`FAQ.css` beside `FAQ.tsx`).
- No router library — page switching is a `useState<'home'|'about'|...>` in `App.tsx`. Add new pages there.

### ESLint
- Config: `eslint.config.js` (flat config). Rules in play: `@eslint/js` recommended, `typescript-eslint` recommended, `react-hooks`, `react-refresh`.
- Run `npm run lint` before committing. Fix all errors; don't suppress rules without justification.

### Testing
- Test files live alongside source as `*.test.tsx` (or `*.test.ts`).
- Use `@testing-library/react` + `@testing-library/user-event` for all component tests.
- Prefer querying by accessible roles/labels (`getByRole`, `getByLabelText`) over test IDs.
- Every new component or behaviour that can be tested **should** have a test.

### Styling
- Plain CSS files — no CSS-in-JS, no preprocessors.
- Scoped by filename convention, not CSS Modules (not configured).

---

## Do's and Don'ts

### ✅ Do
- Write TypeScript (`.ts`/`.tsx`) for all new code.
- Keep components small and co-located with their styles and tests.
- Add new pages by: creating `MyPage.tsx` in `src/`, adding its route to the `page` union type in `App.tsx`, and wiring up a nav button.
- Run `npm run build` to catch type errors before pushing — `tsc -b` runs as part of it.
- Keep tests passing: `npm run test`.

### ❌ Don't
- **Do not create new `.js`, `.cjs`, or `.mjs` files.** Use TypeScript.
- Don't add a router, state-management, or UI component library without explicit approval — this is a minimal testbed by design.
- Don't put business logic in `main.tsx` — it is a mount-only entry point.
- Don't `import` from `dist/` — it's build output, not source.
- Don't commit secrets, tokens, or `.env` files.
- Don't add `// eslint-disable` comments without explaining why in the same line comment.
