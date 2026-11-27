import { Label, Switch, type SwitchSize } from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";

const sizes = ["sm", "default"] as const satisfies readonly SwitchSize[];

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: {
    "aria-label": "แจ้งเตือน",
    size: "default",
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: sizes,
      table: { defaultValue: { summary: "default" } },
    },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean", description: "Error state." },
    className: { control: "text" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} id="notify" aria-label={undefined} />
      <Label htmlFor="notify">เปิดการแจ้งเตือน</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StateGrid
      corner="size"
      rows={sizes}
      columns={["off", "on"] as const}
      renderCell={(size, value) => (
        <Switch {...args} size={size} aria-label={`${size} ${value}`} defaultChecked={value === "on"} />
      )}
    />
  ),
};

const states = ["rest", "hover", "focus-visible", "disabled", "invalid"] as const;

export const States: Story = {
  parameters: { pseudo: pseudoByAttribute },
  render: (args) => (
    <StateGrid
      rows={states}
      columns={["off", "on"] as const}
      renderCell={(state, value) => (
        <Switch
          {...args}
          aria-label={`${state} ${value}`}
          data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
          defaultChecked={value === "on"}
          disabled={state === "disabled"}
          aria-invalid={state === "invalid" || undefined}
        />
      )}
    />
  ),
};

export const Toggle: Story = {
  play: async ({ args, canvasElement }) => {
    const sw = within(canvasElement).getByRole("switch", { name: "แจ้งเตือน" });
    await userEvent.click(sw);
    await expect(sw).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalled();
  },
};
