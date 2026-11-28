---
"@newnewstyle/ui": minor
---

Each component now ships as its own file with its own CSS, so apps only load the JavaScript and
styles of the components they use (a page with just `Button` loads about 21 kB of CSS instead of
310 kB). Imports are unchanged: keep `import { … } from "@newnewstyle/ui"` and
`@import "@newnewstyle/ui/styles.css"`, which now holds the design tokens only. Your bundler must
handle CSS imported from `node_modules` (Next.js and Vite do).
