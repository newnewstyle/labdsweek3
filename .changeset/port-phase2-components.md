---
"@scope/ui": minor
---

Port the design-system work from my-app-2 (phase 2).

- New components: Accordion, Alert, Breadcrumb, ButtonGroup, Calendar (Thai months, Buddhist-era
  years), Card, Chart (recharts), Combobox, DataTable, Drawer, Empty, Field, FileDropzone,
  InputGroup, Money (+ `formatMoney`), Pagination, Popover, Progress, RadioGroup,
  ResponsiveDialog, ScrollArea, Spinner, StatCard, StatusBadge, Timeline, Toggle, ToggleGroup.
- Button: `loading` prop, new `destructive-solid` variant, `link` uses the `--link` token and drops
  its height/padding. **Breaking:** the `secondary` variant was removed (as in my-app-2).
- Badge: new `success` and `warning` variants, no `aria-invalid` style. **Breaking:** the `ghost`
  and `link` variants were removed (as in my-app-2).
- Dialog: the body scrolls between a fixed header and footer; overlays (Dialog, AlertDialog, Sheet)
  use the new `--overlay` token.
- Tokens: `--destructive-foreground`, `--success`, `--warning`, `--link`, `--overlay`, and a
  validated colour-blind-safe chart palette `--chart-1..5` for both themes.
- New dependencies: `react-day-picker`, `date-fns`, `recharts`.

Not yet published, so the removed variants are released as a minor (pre-1.0) bump.
