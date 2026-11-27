# AGENTS.md

This file guides AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository.

## What this is

A public, open-source React design system published to npm as `@newnewstyle/ui` (renamed from the
placeholder `@scope/ui` on 27 Nov; publishing needs an npm account or org named `newnewstyle`).
Components were copied from the app `dsdsmoonew/my-app-2` (shadcn "base-nova"
style on **Base UI**, styled with **CSS Modules**) and must keep that app's props and appearance.
`ProductCard` and all app pages intentionally stay in the app. `Card` moved into the package on
25 Nov (it is a generic primitive and `StatCard` builds on it). my-app-2 remains where new
components are first designed; port them here with the same props and appearance.

Publishing is planned for Week 4; until then only build and `pnpm pack --dry-run`.

## Stack

pnpm workspaces + Turborepo · React 19 · TypeScript (strict) · `@base-ui/react` · CSS Modules with
Tailwind CSS v4 `@apply` · `cn` (npm package: clsx + tailwind-merge replacement) · `lucide-react` ·
`sonner` · `tw-animate-css` · `react-day-picker` + `date-fns` (Calendar) · `recharts` (Chart) · tsup + PostCSS · Vitest + Testing Library (jsdom) · Next.js 16 docs
app · Storybook 10 (`@storybook/react-vite`) · ESLint 9 flat config · Changesets.

pnpm is installed globally via `npm i -g pnpm` (this Node version has no corepack); the version is
pinned in the root `packageManager` field.

## Layout

```
packages/ui/
  src/index.ts                  # public API: only what is exported here is public
  src/components/<Name>/        # <Name>.tsx, <Name>.module.css, index.ts (+ <Name>.types.ts, tests)
                                # + usage docs <Name>.spec.ts / <Name>.md (Badge, Button, Dialog,
                                #   Field, Input, StatusBadge, Tabs)
  src/components/SETUP.md       # one-time consumer setup shown above every usage doc
  src/lib/component-spec.ts     # ComponentSpec type for <Name>.spec.ts (not exported)
  src/hooks/use-mobile.ts       # internal (used by Sidebar, ResponsiveDialog), not exported
  src/styles/tokens.css         # design tokens: shipped as the top of dist/styles.css
  src/styles/shadcn-tailwind.css# shadcn custom variants/utilities (copied from the shadcn package)
  src/styles/reference.css      # build-only @reference target for every *.module.css
  postcss.config.mjs            # Tailwind for compiling the CSS Modules
  tsup.config.ts
apps/docs/                      # Next.js docs/playground; depends on @newnewstyle/ui via workspace:*
apps/storybook/                 # Storybook for reviewing each component's props and states
  .storybook/                   # main.ts (addons, Tailwind vite plugin), preview.ts, preview-head.html
  src/<Name>.stories.tsx        # one file per component
  src/lib/usage-doc.ts          # renders <Name>.spec.ts + <Name>.md as the Docs page description
eslint.config.mjs               # single root ESLint config for all workspaces
```

## Commands

Run from the repo root.

```bash
pnpm install
pnpm dev                          # tsup --watch for ui + next dev (:3000) + storybook (:6006)
pnpm --filter storybook-app dev   # Storybook only, http://127.0.0.1:6006 (binds 127.0.0.1, not localhost)
pnpm --filter storybook-app build # static Storybook in apps/storybook/storybook-static (gitignored)
pnpm build                        # ui first, then docs (turbo ^build)
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @newnewstyle/ui test -- src/components/Button   # single file/folder
pnpm --filter @newnewstyle/ui test -- -t "render prop"        # single test by name
pnpm --filter @newnewstyle/ui test:watch
cd packages/ui && pnpm pack --dry-run                   # list files that would be published
pnpm changeset                    # record a version bump for a user-facing change
```

`apps/docs` and `apps/storybook` consume the **built** `packages/ui/dist`, not its source. If they
show stale styles or fail to resolve `@newnewstyle/ui`, run `pnpm --filter @newnewstyle/ui build`. `pnpm build`
deletes `dist/` first, so a running dev server briefly logs "Can't resolve '@newnewstyle/ui'" — harmless.

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
- **How styles reach consumers.** Consumers write `@import "tailwindcss"; @import "@newnewstyle/ui/styles.css";`.
  `styles.css` must not import Tailwind itself; it imports `tw-animate-css` and
  `./shadcn-tailwind.css` (both must ship), and its `@source "./"` lets Tailwind scan `dist/`.
  `apps/docs/app/globals.css` mirrors exactly what consumers do; keep it and
  `packages/ui/README.md` in sync.
- **Imports inside the package** are relative (`../Button`); there are no `@/` aliases. Components
  import `cn` from the `cn` npm package, as in the original app.
- **Base UI API, not Radix.** Use the `render` prop instead of `asChild`; with a non-`<button>`
  element pass `nativeButton={false}` (the element keeps `role="button"`). A Button that navigates
  also sets `role="link"`.
- **Dependencies:** `react`, `react-dom`, `next-themes` (used by `Toaster`) are
  `peerDependencies`. `@base-ui/react`, `cn`, `lucide-react`, `sonner`, `tw-animate-css`,
  `react-day-picker`, `date-fns`, `recharts` are `dependencies`. Tailwind is the consumer's
  dependency. Consumers who compose charts import recharts primitives (`BarChart`, `Bar`…) inside
  `ChartContainer`, so they add `recharts` themselves (the Storybook app does).
- **Adding a component:** create `src/components/<Name>/` following the rules above, export it from
  `src/index.ts`, add it to `src/index.test.ts`, add a render test, show it in `apps/docs`
  (`app/page.tsx` is a Server Component: only demos without function props), add a story,
  add a changeset.
  Removing or renaming a public export is a major bump.
- **`toast`** is re-exported from `sonner` (`src/components/Sonner/index.ts`) so consumers use the
  same sonner instance as `Toaster` without installing it themselves.
- **Tests** query by role/label and assert `data-*` attributes rather than class names (CSS Modules
  are not compiled in Vitest). `src/test/setup.ts` polyfills `PointerEvent` (Base UI Checkbox/Switch)
  and `matchMedia` (Sidebar's `useIsMobile`), which jsdom lacks.
- **Storybook stories** (`apps/storybook/src/<Name>.stories.tsx`) import from `@newnewstyle/ui` like a
  consumer; `src/styles.css` mirrors the consumer CSS setup and the theme toolbar sets
  `data-theme` on `<html>`. Because stories use the built JS, prop tables are not inferred —
  declare `argTypes` explicitly, and type option lists with the exported unions
  (`satisfies readonly ButtonVariant[]`) so a renamed variant fails typecheck. Cover each prop
  with a control plus a `States` matrix; `:hover`/`:focus-visible`/`:active` are forced with
  `storybook-addon-pseudo-states` via `parameters.pseudo` selectors (`userEvent.tab()` focuses but
  never triggers `:focus-visible`). `play` functions assert behavior (click, disabled, render prop).
  Telemetry is disabled in `main.ts`. Every exported component has a story file; shared pieces
  (`StateGrid`, `pseudoByAttribute`, `avatarDataUri`, `openOverlayStory`) live in
  `src/story-helpers.tsx`. Multi-part components (Dialog, Select, Sidebar…) use a small
  `Example*` wrapper as the meta `component` so its args map to the parts' props.
- **Usage docs** (`<Name>.spec.ts` rules typed by `ComponentSpec` + `<Name>.md` manual) live next
  to the component in the package but are not exported, bundled or published. Storybook reads them
  from source via the `@ui-docs/*` alias (→ `packages/ui/src/*`, set in `.storybook/main.ts`
  `resolve.alias` and `tsconfig.json` `paths`) and renders them with `src/lib/usage-doc.ts`, after
  the shared setup in `packages/ui/src/components/SETUP.md`. Import lines in docs are always
  `from "@newnewstyle/ui"`. Write new ones with the `/usage-doc` skill (`.claude/skills/usage-doc`).
- **Writing `play` functions against Base UI in a real browser** (all learned the hard way):
  - Open Select/DropdownMenu with the keyboard (`trigger.focus(); userEvent.keyboard("{Enter}")`)
    — user-event's synthetic click opens them unreliably, though a real click works.
  - Select ignores `defaultOpen` on first render; open it in `play` instead.
  - Portalled popups live in `document.body`, not `canvasElement`.
  - Assert state (`aria-expanded`, `data-open`, `aria-selected`), not visibility/unmounting:
    enter/exit transitions don't advance while the tab is in the background, so `toBeVisible()`
    and "removed from DOM" checks are flaky.
  - Disabled controls have `pointer-events: none`; use `userEvent.setup({ pointerEventsCheck: 0 })`
    to prove clicks are ignored.
  - sonner's toast store is global — use `findAllByText`.
  - Tooltips open only on real keyboard focus (`:focus-visible`) or hover; test with `hover`.
  - The Sidebar switches to its mobile Sheet below 768px (`useIsMobile`), including in a narrow
    Storybook canvas.
  - Storybook's `phase === "finished"` does not mean the play passed; check the
    `storyFinished` event's `status`.
  - The preview has no global `<Toaster />`: a story that asserts a toast renders its own.
  - Below 768px DataTable shows cards instead of the table and ResponsiveDialog renders a
    Drawer; plays check `matchMedia("(min-width: 768px)")` or query both forms.
  - Combobox does not re-filter on user-event typing (real typing does). Pick with the keyboard
    (`{ArrowDown}` opens with the first option highlighted, `{Enter}` picks it), or set the value
    with an `InputEvent` carrying `inputType` (`typeLikeBrowser` in `Combobox.stories.tsx`).
- **Color contrast is a token concern.** `--destructive` (both themes; my-app-2's newer
  `oklch(0.53 0.22 27)` was not taken, it drops to 4.01:1 on the hover tint) and light
  `--muted-foreground` were adjusted from my-app-2's values so destructive text passes WCAG AA on
  its own tint at rest *and* hover (10%/20% light, 20%/30% dark) and muted text passes on `--muted`;
  the reasoning and ratios are in comments in `tokens.css`. When changing a color token, check the
  worst state (hover tints), not just rest — axe in Storybook only tests the light theme by default
  (open a story with `&globals=theme:dark` to test dark). Dark `--primary` is a lighter orange with
  a **dark** `--primary-foreground` (my-app-2 had dark orange + white text, which left the `link`
  variant at 2.79:1); keep text-on-primary ≥ 4.5:1 on the `primary/80` hover too, and remember the
  Switch thumb uses `--primary-foreground` in dark mode. Remaining third-party a11y findings: Base UI's focus guards trigger axe `aria-hidden-focus` on an
  open Select/Menu, the Select listbox has no accessible name, and sonner's `richColors` palette
  fails contrast.
- **Visual parity:** `apps/docs/app/components` ports my-app-2's `/playground` demo; compare
  computed styles of the same `data-slot` elements in both apps after any style change. Measure
  after transitions finish and with the page visible — background tabs don't advance CSS
  transitions, which reads as false opacity/translate differences.

## Publishing (Week 4)

Use Changesets: `pnpm changeset` → `pnpm version-packages` → `pnpm release` (builds `@newnewstyle/ui`, then
`changeset publish`). Do not hand-edit `version` or run `npm publish` directly. `apps/docs` is
private and ignored by Changesets. Before the first publish: log in to npm as (or create the org)
`newnewstyle`, which owns the `@newnewstyle` scope. The MIT
`LICENSE` is at the repo root with a copy in `packages/ui/` (npm packs only the package folder);
keep the two identical.
