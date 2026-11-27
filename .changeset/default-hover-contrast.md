---
"@newnewstyle/ui": patch
---

Button and link-Badge `default` hover now mixes in 10% `--foreground` (darker in light mode,
lighter in dark mode) instead of fading to `primary/80`, so the label stays readable: 5.75:1 /
7.89:1 measured, was 3.48:1 in light mode.
