# @scope/ui

React design system built on [shadcn/ui](https://ui.shadcn.com), Radix UI and Tailwind CSS v4.

## Install

```bash
npm install @scope/ui
```

Requires `react` / `react-dom` 19 and Tailwind CSS v4 in your app.

## Setup

In your app's main CSS file, import the tokens after Tailwind:

```css
@import "tailwindcss";
@import "@scope/ui/styles.css";
```

The stylesheet tells Tailwind to scan the package, so no extra `@source` is needed. Add the `dark`
class to a parent element (usually `<html>`) to switch to dark mode.

## Usage

```tsx
import { Button } from "@scope/ui";

export default function Page() {
  return <Button variant="outline">Click me</Button>;
}
```
