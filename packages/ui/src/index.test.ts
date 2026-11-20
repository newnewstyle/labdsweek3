import { describe, expect, it } from "vitest";

import * as ui from "./index";

// Guards the public API: one representative export per copied component folder.
const expected = [
  "AlertDialog",
  "Avatar",
  "Badge",
  "Button",
  "Checkbox",
  "Dialog",
  "DropdownMenu",
  "Input",
  "Label",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Toaster",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Tooltip",
  "cn",
];

describe("public API", () => {
  it.each(expected)("exports %s", (name) => {
    expect(ui).toHaveProperty(name);
  });

  it("does not export app-only components", () => {
    expect(ui).not.toHaveProperty("Card");
    expect(ui).not.toHaveProperty("ProductCard");
  });
});
