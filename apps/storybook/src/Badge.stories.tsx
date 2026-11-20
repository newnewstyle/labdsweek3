import { Badge, type BadgeVariant } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeCheckIcon, ClockIcon } from "lucide-react";
import { expect, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const satisfies readonly BadgeVariant[];

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "ใหม่", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "Visual style. Rendered as `data-variant`.",
      table: { defaultValue: { summary: "default" } },
    },
    children: { control: "text" },
    render: {
      control: false,
      description: "Base UI render prop, e.g. `render={<a href=\"…\" />}` for a link badge.",
    },
    className: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="secondary">
        <BadgeCheckIcon data-icon="inline-start" />
        ยืนยันแล้ว
      </Badge>
      <Badge {...args} variant="outline">
        <ClockIcon data-icon="inline-start" />
        รอดำเนินการ
      </Badge>
      <Badge {...args} variant="destructive">
        เกินกำหนด
      </Badge>
    </div>
  ),
};

/** Hover/focus styles only apply when the badge is interactive (rendered as a link). */
export const States: Story = {
  parameters: { pseudo: pseudoByAttribute },
  render: (args) => (
    <StateGrid
      rows={["rest", "hover", "focus-visible", "invalid"] as const}
      columns={variants}
      renderCell={(state, variant) => (
        <Badge
          {...args}
          variant={variant}
          render={<a href="#badge" />}
          data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
          aria-invalid={state === "invalid" || undefined}
        >
          {variant}
        </Badge>
      )}
    />
  ),
};

export const AsLink: Story = {
  args: { render: <a href="#inbox" />, children: "3 ข้อความใหม่" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "3 ข้อความใหม่" });
    await expect(link).toHaveAttribute("data-slot", "badge");
  },
};
