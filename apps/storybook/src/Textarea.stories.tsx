import { Label, Textarea } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "พิมพ์ข้อความที่นี่...",
    disabled: false,
    "aria-label": "ข้อความ",
  },
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean", description: "Error state (destructive border and ring)." },
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 12 } },
    defaultValue: { control: "text" },
    className: { control: "text" },
  },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="message">ข้อความถึงผู้ดูแล</Label>
      <Textarea {...args} id="message" aria-label={undefined} />
    </div>
  ),
};

const states = ["rest", "hover", "focus-visible", "filled", "disabled", "invalid"] as const;

export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  decorators: [(Story) => <div>{Story()}</div>],
  render: (args) => (
    <StateGrid
      rows={states}
      columns={["textarea"] as const}
      renderCell={(state) => (
        <Textarea
          {...args}
          className="w-72"
          aria-label={`ข้อความ (${state})`}
          data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
          defaultValue={state === "filled" || state === "invalid" ? "ข้อความตัวอย่าง" : undefined}
          disabled={state === "disabled"}
          aria-invalid={state === "invalid" || undefined}
        />
      )}
    />
  ),
};

/** The field grows with its content (field-sizing). */
export const AutoGrow: Story = {
  play: async ({ canvasElement }) => {
    const textarea = within(canvasElement).getByRole("textbox", { name: "ข้อความ" });
    const before = textarea.getBoundingClientRect().height;
    await userEvent.type(textarea, "บรรทัด 1{enter}บรรทัด 2{enter}บรรทัด 3{enter}บรรทัด 4");
    await expect(textarea.getBoundingClientRect().height).toBeGreaterThanOrEqual(before);
  },
};
