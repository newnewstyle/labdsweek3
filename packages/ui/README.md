# @newnewstyle/ui

React design system built on [Base UI](https://base-ui.com) in the
[shadcn/ui](https://ui.shadcn.com) style, with Tailwind CSS v4 design tokens.

## Install

```bash
npm install @newnewstyle/ui
```

Peer dependencies: `react` and `react-dom` 19, `next-themes` (used by `Toaster`), and Tailwind CSS v4
in your app.

## Setup

In your app's main CSS file, import the stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "@newnewstyle/ui/styles.css";
```

The stylesheet contains the design tokens and tells Tailwind to scan the package, so no extra
`@source` is needed. Each component imports its own CSS, so your bundler only ships the styles of
the components you use. This needs a bundler that handles CSS imported from `node_modules`
(Next.js and Vite do).

- **Dark mode:** set `data-theme="dark"` on a parent element (with `next-themes`, use
  `attribute="data-theme"`).
- **Fonts:** the tokens use `--font-plex-thai` and `--font-geist-mono` when present (for example
  from `next/font` with those `variable` names) and otherwise fall back to the system fonts.

## Usage

```tsx
import { Button } from "@newnewstyle/ui";

export default function Page() {
  return <Button variant="outline">Click me</Button>;
}
```

To render as a link, use Base UI's `render` prop and set `role="link"` so it is announced as one:

```tsx
<Button nativeButton={false} role="link" render={<a href="/dashboard" />}>
  Dashboard
</Button>
```

## Components

Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card,
Chart, Checkbox, Combobox, DataTable, Dialog, Drawer, DropdownMenu, Empty, Field, FileDropzone,
Input, InputGroup, Label, Money (+ `formatMoney`), Pagination, Popover, Progress, RadioGroup,
ResponsiveDialog, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Spinner, StatCard,
StatusBadge, Switch, Table, Tabs, Textarea, Timeline, Toaster (Sonner, + `toast`), Toggle,
ToggleGroup, Tooltip, and the `cn` class-name helper.

**Charts:** `ChartContainer` wraps [recharts](https://recharts.org) primitives that you compose
yourself, so add `recharts` to your app to build charts. Use the `--chart-1` … `--chart-5` tokens
in that order for series colours.

**Calendar** shows Thai month names and Buddhist-era years by default.
