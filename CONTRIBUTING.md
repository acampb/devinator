# Contributing to Agentic Validation Testbed

Thank you for taking the time to contribute! This document covers how to report
issues, submit changes, and get the project running locally.

---

## How to Report Issues

Use **GitHub Issues** to report bugs or request enhancements.

When filing a bug report, please include:

- **Steps to reproduce** — the smallest sequence of actions that triggers the problem.
- **Expected behaviour** — what you thought would happen.
- **Actual behaviour** — what actually happened (error messages, stack traces, screenshots).
- **Environment** — Node.js version (`node -v`), npm version (`npm -v`), OS, and browser (if relevant).

Before opening a new issue, search existing issues to avoid duplicates.

---

## How to Submit Changes

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b fix/short-description
   # or
   git checkout -b feat/short-description
   ```

2. **Make your changes** — keep commits focused; one logical change per commit.
   Write a clear commit message in the imperative mood, e.g.
   `fix: prevent duplicate todo entries`.

3. **Verify locally** — the same checks run in CI, in this order:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
   All three must pass before you open a PR.

4. **Open a Pull Request** against `main`. Describe *what* changed and *why*;
   link any related issue with `Closes #<number>`.

CI runs automatically on every pull request (Node 20,
[`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

---

## Development Setup

**Prerequisites:** Node.js 20+, npm 10+.

```bash
# 1. Install dependencies (use the committed lockfile for reproducibility)
npm ci

# 2. Start the Vite dev server with hot-module replacement
npm run dev
#    → open the printed localhost URL in your browser

# 3. Run the full local check suite
npm run lint   # ESLint
npm test       # Vitest (non-watch)
npm run build  # TypeScript type-check + production build
```

That's the complete setup — no additional services or environment variables are
required.
