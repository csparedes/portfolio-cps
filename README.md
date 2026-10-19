# Cristian Paredes Portfolio

Nuxt 4 portfolio backed by typed Nuxt Content collections.

## Adding content

- Copy `docs/templates/blog.md` to `content/blog/<slug>.md` for an article.
- Copy `docs/templates/project.md` to `content/projects/<slug>.md` for a project.
- Keep slugs and public asset folders in kebab-case.
- Leave `draft: true` while editing; drafts are excluded from lists, direct routes, the homepage, and adjacent navigation.
- Dates must use `YYYY-MM-DD`.
- Blog categories are `demo`, `guide`, `learning`, `tips`, or `tutorial`.
- Project categories are `Mobile App` or `Web App`; statuses are `deployed`, `in-development`, or `offline`.
- Project galleries use the explicit `images` list. `image` is the listing and social-sharing cover.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
