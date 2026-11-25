/** Result of one WCAG check for a component. */
export type AccessibilityStatus =
  /** Holds in every variant and size. */
  | "pass"
  /** Holds only if the caller does something; `note` says what. */
  | "conditional"
  | "fail"
  /** Not measured yet. */
  | "not-checked"

export type AccessibilityCheck = {
  /** WCAG number and name, e.g. "1.4.3 Contrast (Minimum)". */
  criterion: string
  status: AccessibilityStatus
  /** Evidence or condition, in Thai: numbers, where measured, what to do. */
  note: string
}

/**
 * Shape of a component's `<Name>.spec.ts`: the single source of its usage
 * and decision rules (parts 1–3 of the usage doc). `<Name>.md` holds the
 * rest (props, tokens, example) and does not repeat these rules.
 * Text is Thai; inline code uses backticks and renders as code in Storybook.
 */
export type ComponentSpec = {
  /** Component name, as in the folder. */
  name: string
  /** One line: what it is for. */
  purpose: string
  /**
   * Words a designer or agent might use when they need this component
   * (Thai and English, e.g. "บันทึก", "submit"), so a search finds it.
   */
  keywords: string[]
  /** Situations where it fits, and which variant/size to pick. */
  whenToUse: { situation: string; use: string }[]
  /** Cases where something else fits better, and what to use instead. */
  whenNotToUse: { case: string; instead: string }[]
  /** Deliberate choices, with the reason, so nobody undoes them by accident. */
  decisions: { rule: string; why: string }[]
  /**
   * WCAG 2.2 AA checks, one per criterion, with the evidence. A reviewer
   * (person or agent) checks UI against these. Mark a criterion
   * "not-checked" rather than guessing "pass".
   */
  accessibility: AccessibilityCheck[]
  /** Open questions for the team. Empty when everything is decided. */
  todos: string[]
}
