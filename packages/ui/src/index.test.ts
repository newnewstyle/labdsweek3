import { describe, expect, it } from "vitest";

import * as ui from "./index";

// Guards the public API: one representative export per component folder.
const expected = [
  "Accordion",
  "Alert",
  "AlertDialog",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "ButtonGroup",
  "Calendar",
  "Card",
  "ChartContainer",
  "Checkbox",
  "Combobox",
  "DataTable",
  "Dialog",
  "Drawer",
  "DropdownMenu",
  "Empty",
  "Field",
  "FileDropzone",
  "Input",
  "InputGroup",
  "Label",
  "Money",
  "formatMoney",
  "Pagination",
  "Popover",
  "Progress",
  "RadioGroup",
  "ResponsiveDialog",
  "ScrollArea",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Toaster",
  "toast",
  "Spinner",
  "StatCard",
  "StatusBadge",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Timeline",
  "Toggle",
  "ToggleGroup",
  "Tooltip",
  "cn",
];

describe("public API", () => {
  it.each(expected)("exports %s", (name) => {
    expect(ui).toHaveProperty(name);
  });

  it("does not export app-only components", () => {
    // Card moved into the package (StatCard builds on it); ProductCard stays in my-app-2.
    expect(ui).not.toHaveProperty("ProductCard");
  });
});
