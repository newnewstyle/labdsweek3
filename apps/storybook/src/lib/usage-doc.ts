import setupMd from "@ui-docs/components/SETUP.md?raw"
import type { AccessibilityStatus, ComponentSpec } from "@ui-docs/lib/component-spec"

/** Escapes characters that would break a Markdown table cell. */
function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\r?\n/g, " ")
}

/** Thai label for each status; the icon keeps it readable without colour. */
const STATUS_LABEL: Record<AccessibilityStatus, string> = {
  pass: "✅ ผ่าน",
  conditional: "⚠️ ผ่านถ้าใช้ถูก",
  fail: "❌ ไม่ผ่าน",
  "not-checked": "❔ ยังไม่ได้ตรวจ",
}

/** Parts 1–3 of the usage doc, rendered from the component's spec. */
function specToMarkdown(spec: ComponentSpec): string {
  const lines = [
    "## 1. Purpose",
    "",
    spec.purpose,
    "",
    `**คำค้น:** ${spec.keywords.join(", ")}`,
    "",
    "## 2. When to use (ควรใช้ตอนไหน)",
    "",
    "| สถานการณ์ | ใช้แบบนี้ |",
    "| --- | --- |",
    ...spec.whenToUse.map((r) => `| ${cell(r.situation)} | ${cell(r.use)} |`),
    "",
    "## 3. When not to use (ไม่ควรใช้ตอนไหน)",
    "",
    "| กรณี | ใช้อะไรแทน |",
    "| --- | --- |",
    ...spec.whenNotToUse.map((r) => `| ${cell(r.case)} | ${cell(r.instead)} |`),
    "",
    "### การตัดสินใจ (ตั้งใจ)",
    "",
    ...spec.decisions.map((d) => `- **${d.rule}**: ${d.why}`),
    "",
    "### Accessibility (WCAG 2.2 AA)",
    "",
    "| เกณฑ์ | ผล | หลักฐาน / เงื่อนไข |",
    "| --- | --- | --- |",
    ...spec.accessibility.map(
      (a) =>
        `| ${cell(a.criterion)} | ${STATUS_LABEL[a.status]} | ${cell(a.note)} |`
    ),
    "",
  ]
  if (spec.todos.length > 0) {
    lines.push("### TODO", "", ...spec.todos.map((t) => `- ${t}`), "")
  }
  return lines.join("\n")
}

/** Matches the `## Import and usage` section up to the next `##` heading. */
const IMPORT_SECTION = /^## Import and usage[\s\S]*?(?=^## |(?![\s\S]))/m

/**
 * The one-time app setup shared by every component, as a `###` subsection.
 * Single source: packages/ui/src/components/SETUP.md (its `# ` title becomes `### `).
 */
const setupSection = setupMd.trim().replace(/^# /, "### ")

/**
 * Builds the Storybook Docs description for a component.
 *
 * Order on the page: `## Import and usage` first (the shared one-time
 * setup, then how to import and use this component), then the rules, then
 * the rest.
 *
 * - With a spec: parts 1–3 come from `<Name>.spec.ts`, then the `.md`
 *   from its first `##` heading on (props, tokens, example).
 * - Without a spec (components not migrated yet): the whole `.md`.
 *
 * The doc's own `# Title` and intro line are dropped because the Docs page
 * already shows the component name.
 */
export function usageDoc(markdown: string, spec?: ComponentSpec): string {
  const importSection = markdown.match(IMPORT_SECTION)?.[0].trim() ?? ""
  const rest = markdown.replace(IMPORT_SECTION, "")
  const body = rest.slice(Math.max(0, rest.search(/^## /m)))
  const rules = spec ? `${specToMarkdown(spec)}\n---\n\n` : ""
  let top = ""
  if (importSection) {
    const [heading, ...steps] = importSection.replace(/\n---$/, "").split("\n")
    top = [
      heading,
      "",
      setupSection,
      "",
      `### ใช้ ${spec?.name ?? markdown.match(/^# (.+)$/m)?.[1] ?? "component นี้"}`,
      ...steps,
      "",
      "---",
      "",
      "",
    ].join("\n")
  }
  return `${top}${rules}${body}`
}
