---
"@newnewstyle/ui": minor
---

`Field` now links its label, description and error to the control inside it: `Input`,
`Textarea`, `Checkbox`, `Switch`, `SelectTrigger` and the InputGroup / Combobox inputs get an
`id` (used by `FieldLabel`), `aria-describedby` pointing at the shown `FieldDescription` /
`FieldError`, and `aria-invalid` when the Field has `data-invalid`. A `RadioGroup` in a Field is
named by its `FieldLabel` (`aria-labelledby`), and each `RadioGroupItem` is wired by its own
option Field. With several controls in one Field, only the first keeps the label id. Props you pass still win,
so existing code with explicit ids keeps working.
