# Agentic Validation Testbed

A deliberately small, fast, and deterministic web app used as a clean validation
target for agentic coding tools. An agent can clone the repo, make a change on a
branch, run the local checks, and open a PR that triggers CI.

The app itself is a tiny todo list (a single `App` component) so that changes are
observable in the browser and assertable in tests.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/) (jsdom) for tests
- ESLint (Vite `react-ts` template defaults)

## Scripts

| Command         | What it does                                              |
| --------------- | --------------------------------------------------------- |
| `npm run dev`   | Start the Vite dev server with HMR                        |
| `npm run build` | Type-check (`tsc -b`) and produce a production build      |
| `npm run lint`  | Run ESLint over the project                               |
| `npm test`      | Run the Vitest suite once (non-watch, `vitest run`)       |

## Getting started

```bash
npm install   # or `npm ci` against the committed lockfile
npm run dev    # open the printed localhost URL
```

## Verifying a change

The same checks run locally and in CI, in this order:

```bash
npm run lint
npm test
npm run build
```

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request
on Node 20 and executes, in order: `npm ci`, `npm run lint`, `npm test`,
`npm run build`.
