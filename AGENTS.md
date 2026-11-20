# AGENTS.md

This file guides AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository.

## What this is

A public, open-source React design system published to npm as `@scope/ui` (placeholder name —
replace in `packages/ui/package.json`, its README, imports in `apps/docs`, and this file once the
real name is chosen). Components were copied from the app `dsdsmoonew/my-app-2` (shadcn "base-nova"
style on **Base UI**, styled with **CSS Modules**) and must keep that app's props and appearance.
`Card`, `ProductCard` and all app pages intentionally stay in the app.

Publishing is planned for Week 4; until then only build and `pnpm pack --dry-run`.

## Stack

pnpm workspaces + Turborepo · React 19 · TypeScript (strict) · `@base-ui/react` · CSS Modules with
Tailwind CSS v4 `@apply` · `cn` (npm package: clsx + tailwind-merge replacement) · `lucide-react` ·
`sonner` · `tw-animate-css` · tsup + PostCSS · Vitest + Testing Library (jsdom) · Next.js 16 docs
app · ESLint 9 flat config · Changesets.

pnpm is installed globally via `npm i -g pnpm` (this Node version has no corepack); the version is
pinned in the root `packageManager` field.

## Layout

```
packages/ui/
  src/index.ts                  # public API: only what is exported here is public
  src/components/<Name>/        # <Name>.tsx, <Name>.module.css, index.ts (+ tests, README)
  src/hooks/use-mobile.ts       # internal (used by Sidebar), not exported
  src/styles/tokens.css         # design tokens: shipped as the top of dist/styles.css
  src/styles/shadcn-tailwind.css# shadcn custom variants/utilities (copied from the shadcn package)
  src/styles/reference.css      # build-only @reference target for every *.module.css
  postcss.config.mjs            # Tailwind for compiling the CSS Modules
  tsup.config.ts
apps/docs/                      # Next.js docs/playground; depends on @scope/ui via workspace:*
eslint.config.mjs               # single root ESLint config for all workspaces
```

## Commands

Run from the repo root.

```bash
pnpm install
pnpm dev                          # tsup --watch for ui + next dev (http://localhost:3000)
pnpm build                        # ui first, then docs (turbo ^build)
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @scope/ui test -- src/components/Button   # single file/folder
pnpm --filter @scope/ui test -- -t "render prop"        # single test by name
pnpm --filter @scope/ui test:watch
cd packages/ui && pnpm pack --dry-run                   # list files that would be published
pnpm changeset                    # record a version bump for a user-facing change
```

`apps/docs` consumes the **built** `packages/ui/dist`, not its source. If docs show stale styles or
fail to resolve `@scope/ui`, run `pnpm --filter @scope/ui build`.

## Architecture rules that span multiple files

- **Build (tsup, bundled).** `src/index.ts` is bundled into `dist/index.js` (ESM only). CSS imports
  use esbuild's `local-css` loader, so `styles.x` in JS maps to scoped names like `Button_button`,
  and keyframes are renamed per file (`Dialog_enter`). tsup first runs each CSS file through
  `postcss.config.mjs` (Tailwind) to resolve `@apply`. `onSuccess` then writes
  `dist/styles.css` = `src/styles/tokens.css` + the compiled component CSS, copies
  `shadcn-tailwind.css`, and deletes the intermediate `dist/index.css`. The build script deletes
  `dist/` first so stale files never get packed.
- **`"use client"`** is a banner on the whole bundle (esbuild strips per-file directives when
  bundling). Components still render from Server Components; `apps/docs/app/page.tsx` is a Server
  Component on purpose to catch regressions.
- **Styles live in CSS Modules, not in TSX.** Components set `data-slot`, `data-variant`,
  `data-size` and merge `cn(styles.x, className)`; variants are CSS selectors such as
  `.button[data-variant="outline"]`, not `cva`. Every rule sits in `@layer components` so a
  consumer's utility `className` always wins. Don't put Tailwind classes in component TSX, and don't
  use `group-*` / `peer-*` inside `@apply`.
- **Every `*.module.css` starts with `@reference "../../styles/reference.css";`** (replaces the app's
  `@reference "../../../app/globals.css"`). New components must do the same.
- **Tokens.** Colors/radius/fonts are CSS variables in `src/styles/tokens.css` (`:root`,
  `[data-theme="dark"]`, mapped in `@theme inline`). Adding a token means editing all three places.
  Use semantic utilities (`bg-primary`), never hex values or palette classes.
- **Dark mode is `data-theme="dark"`** on an ancestor, not a `.dark` class: CSS Modules rename
  class selectors, which would break `dark:` inside `@apply`.
- **Fonts.** The package cannot load fonts. Tokens read `--font-plex-thai` / `--font-geist-mono`
  (set by `next/font` in the app/docs) and fall back to the system stack.
- **How styles reach consumers.** Consumers write `@import "tailwindcss"; @import "@scope/ui/styles.css";`.
  `styles.css` must not import Tailwind itself; it imports `tw-animate-css` and
  `./shadcn-tailwind.css` (both must ship), and its `@source "./"` lets Tailwind scan `dist/`.
  `apps/docs/app/globals.css` mirrors exactly what consumers do; keep it and
  `packages/ui/README.md` in sync.
- **Imports inside the package** are relative (`../Button`); there are no `@/` aliases. Components
  import `cn` from the `cn` npm package, as in the original app.
- **Base UI API, not Radix.** Use the `render` prop instead of `asChild`; with a non-`<button>`
  element pass `nativeButton={false}` (the element keeps `role="button"`).
- **Dependencies:** `react`, `react-dom`, `next-themes` (used by `Toaster`) are
  `peerDependencies`. `@base-ui/react`, `cn`, `lucide-react`, `sonner`, `tw-animate-css` are
  `dependencies`. Tailwind is the consumer's dependency.
- **Adding a component:** create `src/components/<Name>/` following the rules above, export it from
  `src/index.ts`, add it to `src/index.test.ts`, show it in `apps/docs`, add a changeset.
  Removing or renaming a public export is a major bump.
- **Tests** query by role/label and assert `data-*` attributes rather than class names (CSS Modules
  are not compiled in Vitest).

## Publishing (Week 4)

Use Changesets: `pnpm changeset` → `pnpm version-packages` → `pnpm release` (builds `@scope/ui`, then
`changeset publish`). Do not hand-edit `version` or run `npm publish` directly. `apps/docs` is
private and ignored by Changesets. Before the first publish: choose the real package name and add a
`LICENSE` file (package.json declares MIT).
