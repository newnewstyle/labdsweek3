---
name: review-ui
description: Review UI code (a story, page or pattern) against the design system's component docs and AGENTS.md, reporting pass / fail / can't check per checklist item with file:line evidence.
disable-model-invocation: true
argument-hint: "<file to review, e.g. apps/storybook/src/Field.stories.tsx>"
---

# Review UI

Target: $ARGUMENTS

You are a reviewer. The report is your only output: read with Read, Grep and Glob, and leave every file exactly as you found it (no edits, no new files, no commands, no browser). A person decides what to fix.

Every verdict is one of three:

- **pass**: you found the code that satisfies the item, and you cite it.
- **fail**: you found code that breaks a written rule, and you cite both the code and the rule.
- **can't check**: the answer needs something you cannot read: a doc that does not exist, a screen you cannot see, a decision only the team can make. Say which.

Each verdict carries **evidence**: `path:line` for the code, and for a fail also `path:line` for the rule. A verdict without evidence is can't check. Something that needs eyes on a rendered screen (colors look right, Thai text fits) is can't check even when the code looks fine: write "pass · can't check" when the code is complete but the screen is unseen.

## 1. Read

1. The target file, in full.
2. For every component it imports from `@newnewstyle/ui`: its docs, `packages/ui/src/components/<Name>/<Name>.md` (props, tokens) and `<Name>.spec.ts` (when to use, when not to use, decisions). Docs exist only for some components; note which ones have none.
3. `packages/ui/src/styles/tokens.css` for every token, CSS variable or semantic utility the target uses.
4. `AGENTS.md`, the rules about using components (Field wiring, Base UI `render`, Button as link, radius, tokens).

Done when you can name every imported component, every prop value passed to it, and every token or color the target uses, each with its line.

## 2. Check

Apply all six items to the whole target.

1. **Uses our components.** UI is built from `@newnewstyle/ui` components. Fail: a hand-built equivalent of a package component (raw `<button>`, `<input>`, `<select>`, a badge made from a styled `<span>`), or a UI component imported from anywhere else.
2. **Only documented props.** Every prop and value passed to a package component appears in that component's `.md`. Fail: a prop or value the docs do not list. Can't check: the component has no `.md`; name it.
3. **Tokens only.** Two layers:
   - No hex, `rgb()`, `oklch()`, palette classes (`bg-orange-500`, `text-gray-600`) or arbitrary values (`p-[13px]`, `text-[#333]`).
   - Every token used exists in `tokens.css` **and** is used for what its docs say. A token that exists but is documented for something else (a Button-only spacing token used for page layout) is fail, with the note "ถามทีมก่อน".
4. **Follows our Do/Don't.** Each use matches the component's `whenToUse` / `whenNotToUse` / `decisions` in `.spec.ts` and the AGENTS.md usage rules. Fail: a case the spec sends elsewhere (wrong variant for the situation, a component the spec says not to use here). Cite the spec rule's line.
5. **Three states · Thai fit.** The target shows the normal state, the empty or loading state, and the error state wherever the UI can have them, and at least one example with long, real Thai text. Fail: a state the UI can reach has no example, or a fixed width/height/`truncate` that would cut Thai text with no way to read it. The result is at best "pass · can't check", since fit is seen on screen.
6. **Reads and gaps.** Always can't check: a reviewer cannot grade its own reading. Its evidence is the two lists at the end of the report.

Done when all six items have a verdict, and every pass and fail has its evidence.

## 3. Report

Write the report in Thai; file paths, prop names, values and token names stay as in the source.

```
## /review-ui: <target>

| # | ข้อ | ผล | หลักฐาน | หมายเหตุ |
| - | --- | --- | --- | --- |
| 1 | ใช้ component ของเรา | pass | `path:line` | … |
…

**สรุป: <n> failed checks** (<n> pass, <n> can't check)

### ไฟล์ที่อ่าน
- …

### ตรวจไม่ได้ และเหตุผล
- …
```

An item with several findings lists each one in its row (`fail ×2`), with one piece of evidence per finding. Under "ตรวจไม่ได้" list every can't check and what would settle it (a doc to write, a story to open, a question for the team).

Done when the table has six rows, the summary counts match the table, and both lists are filled.
