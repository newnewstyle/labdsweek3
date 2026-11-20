# @scope/ui

React design system built on [Base UI](https://base-ui.com) in the
[shadcn/ui](https://ui.shadcn.com) style, with Tailwind CSS v4 design tokens.

## Install

```bash
npm install @scope/ui
```

Peer dependencies: `react` and `react-dom` 19, `next-themes` (used by `Toaster`), and Tailwind CSS v4
in your app.

## Setup

In your app's main CSS file, import the stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "@scope/ui/styles.css";
```

The stylesheet contains the design tokens and all component styles, and tells Tailwind to scan the
package, so no extra `@source` is needed.

- **Dark mode:** set `data-theme="dark"` on a parent element (with `next-themes`, use
  `attribute="data-theme"`).
- **Fonts:** the tokens use `--font-plex-thai` and `--font-geist-mono` when present (for example
  from `next/font` with those `variable` names) and otherwise fall back to the system fonts.

## Usage

```tsx
import { Button } from "@scope/ui";

export default function Page() {
  return <Button variant="outline">Click me</Button>;
}
```

To render as a link, use Base UI's `render` prop:

```tsx
<Button nativeButton={false} render={<a href="/dashboard" />}>
  Dashboard
</Button>
```

## Components

AlertDialog, Avatar, Badge, Button, Checkbox, Dialog, DropdownMenu, Input, Label, Select,
Separator, Sheet, Sidebar, Skeleton, Toaster (Sonner), Switch, Table, Tabs, Textarea, Tooltip, and
the `cn` class-name helper.
