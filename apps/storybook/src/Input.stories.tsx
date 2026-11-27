import { Input, Label } from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";
import { usageDoc } from "./lib/usage-doc";
import usage from "@ui-docs/components/Input/Input.md?raw";
import { inputSpec } from "@ui-docs/components/Input/Input.spec";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    docs: { description: { component: usageDoc(usage, inputSpec) } },
  },
  args: {
    placeholder: "name@example.com",
    type: "email",
    disabled: false,
    "aria-label": "อีเมล",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url", "file"],
    },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean", description: "Error state (destructive border and ring)." },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    className: { control: "text" },
  },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">อีเมล</Label>
      <Input {...args} id="email" aria-label={undefined} />
    </div>
  ),
};

const states = ["rest", "hover", "focus-visible", "filled", "disabled", "invalid"] as const;

/** Every state side by side; hover and focus-visible are forced by the pseudo-states addon. */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  decorators: [(Story) => <div>{Story()}</div>],
  render: (args) => (
    <StateGrid
      rows={states}
      columns={["input"] as const}
      renderCell={(state) => (
        <Input
          {...args}
          className="w-64"
          aria-label={`อีเมล (${state})`}
          data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
          defaultValue={state === "filled" || state === "invalid" ? "name@example" : undefined}
          disabled={state === "disabled"}
          aria-invalid={state === "invalid" || undefined}
        />
      )}
    />
  ),
};

export const File: Story = {
  args: { type: "file", "aria-label": "แนบไฟล์" },
};

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "อีเมล" });
    await userEvent.type(input, "hello@example.com");
    await expect(input).toHaveValue("hello@example.com");
  },
};
