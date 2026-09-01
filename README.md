# Davide Lanza - Software Developmet Portfolio

Next.js portfolio and blog, published through GitHub Pages.

## Project structure

```text
.
├── app/          # Routes, page metadata, blog articles, sitemap and robots
├── components/   # Reusable portfolio and article UI components
├── lib/          # Portfolio and notes data shared by pages
├── public/       # CNAME, article images and downloadable PDF notes
└── styles/       # Commented SCSS tokens and page/component partials
```

Each article is a normal Next.js page under `app/blog/<slug>/page.tsx`. Its metadata and TSX content live together in that file. `app/blog/posts.ts` contains only the short summaries used by the homepage, blog index and sitemap.

## Interactive development shell

Start one disposable Node container with the development port exposed:

```bash
docker run --rm -it \
  -p 3000:3000 \
  -v "$PWD:/app" \
  -w /app \
  node:22-alpine sh
```

Run the remaining commands inside that shell:

```bash
corepack enable
pnpm install --frozen-lockfile
```

## Commands

```bash
# Development server: http://localhost:3000
pnpm dev --hostname 0.0.0.0
# Apply automatic formatting
pnpm format
# Verify formatting only
pnpm format:check
# Run ESLint
pnpm lint
# Export the production site to out/
pnpm build
# Run formatting checks, linting and the production build
pnpm check
```

## Deployment

The GitHub Actions workflow runs formatting, linting and the production build before publishing `out/` to GitHub Pages on pushes to `main`.
