# Repository Guidelines

## Project Structure & Module Organization

This is a Nuxt 4 portfolio and content site. Application code lives in `app/`: route components are under `app/pages/`, reusable Vue components under `app/components/`, shared composables under `app/composables/`, and global styling under `app/assets/css/`. Markdown articles and project records belong in `content/`; keep their frontmatter aligned with `content.config.ts`. Static files that must retain their public URL belong in `public/`, with project screenshots grouped by slug (for example, `public/projects/health-tracker-app/`). Server-side code belongs in `server/`, and framework-independent helpers in `utils/`.

Tests are organized by scope in `tests/unit/`, `tests/integration/`, and `tests/e2e/`; common fixtures and helpers live in `tests/utils/`.

## Build, Test, and Development Commands

Use pnpm, as recorded by `pnpm-lock.yaml` and `pnpm-workspace.yaml`.

- `pnpm install` installs dependencies and runs Nuxt preparation.
- `pnpm dev` starts the development server at `http://localhost:3000`.
- `pnpm build` creates the production build.
- `pnpm generate` produces a statically generated site.
- `pnpm preview` serves the production output locally.
- `pnpm test` runs Vitest in watch mode.
- `pnpm test:run` runs the complete suite once, suitable for CI.
- `pnpm test:ui` opens Vitest's interactive UI.
- `pnpm exec eslint .` checks the Nuxt ESLint ruleset.

## Coding Style & Naming Conventions

Write Vue Single-File Components with `<script setup lang="ts">`. Follow the existing two-space indentation, single quotes in TypeScript, and generally omit semicolons. Use PascalCase for components (`ProjectGallery.vue`), `useXxx` for composables (`useDateFormatter.ts`), and kebab-case slugs for pages, content files, and public asset folders. Prefer typed props and Nuxt auto-imports where already supported. Run ESLint before submitting changes.

## Testing Guidelines

Vitest runs in the Nuxt environment through `@nuxt/test-utils`; browser workflows use its Playwright integration. Name test files `*.test.ts` and place them in the directory matching their scope. Add focused assertions for new content queries, page rendering, error handling, or navigation. Run a subset with `pnpm test:run tests/unit`, then run the full suite before opening a pull request. No numeric coverage threshold is configured; cover changed behavior and meaningful edge cases.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit-style subjects such as `feat(projects): add ...` and `chore(config): optimize ...`. Use an imperative, concise subject with a relevant scope. Pull requests should explain the change and validation performed, link related issues, and include before/after screenshots for visible UI changes. Keep unrelated refactors out of feature or fix pull requests.
