# AGENTS.md

This file guides AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository.

## What this is

A public, open-source React design system published to npm as `@scope/ui` (placeholder name —
replace in `packages/ui/package.json`, its README, imports in `apps/docs`, and this file once the
real name is chosen). Components follow **shadcn/ui** patterns (Radix UI + Tailwind CSS v4 +
`class-variance-authority`), are written in **TypeScript**, and are verified inside a **Next.js 16**
App Router docs app.

Consumers install the compiled package and import components; they do not copy source.

## Stack

pnpm workspaces + Turborepo · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-first, no
`tailwind.config.js`) · `radix-ui` (unified package) · `cva` + `clsx` + `tailwind-merge` · tsup ·
Vitest + Testing Library (jsdom) · Next.js 16 (Turbopack) · ESLint 9 flat config · Changesets.

pnpm is installed globally via `npm i -g pnpm` (this Node version has no corepack); the version is
pinned in the root `packageManager` field.

## Layout

```
packages/ui/        # the published package
  src/index.ts      # public API: only what is exported here is public
  src/components/<name>/   # <name>.tsx, <name>.test.tsx, index.ts
  src/lib/utils.ts  # cn()
  src/styles/globals.css   # design tokens; copied to dist/styles.css on build
apps/docs/          # Next.js docs/playground; depends on @scope/ui via workspace:*
eslint.config.mjs   # single root ESLint config for all workspaces
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
pnpm --filter @scope/ui test -- src/components/button   # single file/folder
pnpm --filter @scope/ui test -- -t "asChild"            # single test by name
pnpm --filter @scope/ui test:watch
pnpm changeset                    # record a version bump for a user-facing change
```

`apps/docs` consumes the **built** `packages/ui/dist`, not its source. If docs show stale behavior or
fail to resolve `@scope/ui`, build the ui package (`pnpm --filter @scope/ui build`).

## Architecture rules that span multiple files

- **Unbundled ESM build.** `tsup.config.ts` uses `bundle: false`, so every source file becomes its own
  file in `dist/`. This keeps per-file `"use client"` directives (esbuild drops them when bundling),
  so Server Components can import server-safe components while interactive ones stay client-only.
  Two consequences:
  - Relative imports in `src/` **must end in `.js`** (`import { cn } from "../../lib/utils.js"`),
    otherwise the published ESM fails to resolve.
  - Output is ESM only (no CJS).
- **`"use client"` only where needed.** Add it to a component file only if it uses hooks, context, or
  event-driven Radix primitives (Dialog, Popover, …). Stateless components like `Button` stay
  server-safe so `buttonVariants()` can be called from Server Components. `apps/docs/app/page.tsx` is
  intentionally a Server Component to catch mistakes here.
- **Adding a component:** create `src/components/<name>/`, export it from `src/index.ts`, add a test,
  show it in `apps/docs`, and add a changeset. Removing or renaming a public export is a major bump.
- **Component conventions (shadcn v4 style):** plain function components with
  `React.ComponentProps<"el">` (React 19 passes `ref` as a prop, so no `forwardRef`); set
  `data-slot="<name>"`; merge `className` through `cn()`; spread remaining props on the root; support
  `asChild` via `Slot.Root` from `radix-ui` where shadcn does; export the `cva` variants
  (e.g. `buttonVariants`) alongside the component.
- **Tokens, not raw values.** Colors and radius are CSS variables in `src/styles/globals.css`
  (`:root` / `.dark`, mapped to utilities in `@theme inline`). Use semantic classes (`bg-primary`,
  `text-muted-foreground`), never hex values or palette classes like `bg-blue-500`. Dark mode is the
  `.dark` class on an ancestor (`@custom-variant dark`).
- **How styles reach consumers.** Consumers write `@import "tailwindcss"; @import "@scope/ui/styles.css";`.
  `styles.css` must **not** import Tailwind itself, and its `@source "./"` makes Tailwind scan the
  JS files next to it in `dist/`. Do not remove that line or move `styles.css` out of `dist/` root.
  `apps/docs/app/globals.css` mirrors exactly what consumers do; keep it and `packages/ui/README.md`
  in sync.
- **Dependencies:** `react`/`react-dom` are `peerDependencies` (plus devDependencies for tests).
  Runtime libs (`radix-ui`, `cva`, `clsx`, `tailwind-merge`) are `dependencies`. Tailwind is the
  consumer's dependency.
- **Tests** query by role/label (Testing Library), which doubles as an accessibility check. Keep Radix
  keyboard/ARIA behavior intact when customizing.

## Publishing

Use Changesets: `pnpm changeset` → `pnpm version-packages` → `pnpm release` (builds `@scope/ui`, then
`changeset publish`). Do not hand-edit `version` or run `npm publish` directly. `apps/docs` is
private and ignored by Changesets.
