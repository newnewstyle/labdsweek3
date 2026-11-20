import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoIcon } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

type Side = "top" | "right" | "bottom" | "left";

type TooltipStoryArgs = { side: Side; text: string; defaultOpen: boolean };

function ExampleTooltip({ side, text, defaultOpen }: TooltipStoryArgs) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="ข้อมูลเพิ่มเติม" />}>
        <InfoIcon />
      </TooltipTrigger>
      <TooltipContent side={side}>{text}</TooltipContent>
    </Tooltip>
  );
}

const meta = {
  title: "Components/Tooltip",
  component: ExampleTooltip,
  args: { side: "top", text: "ข้อมูลเพิ่มเติม", defaultOpen: false },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
      description: "`TooltipContent` side.",
      table: { defaultValue: { summary: "top" } },
    },
    text: { control: "text" },
    defaultOpen: { control: "boolean", description: "`Tooltip` root starts open." },
  },
  // Apps mount one TooltipProvider at the root (see apps/docs layout).
  decorators: [(Story) => <TooltipProvider delay={0}>{Story()}</TooltipProvider>],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ExampleTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** All four sides, open. */
export const Sides: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-x-32 gap-y-16 p-16">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <ExampleTooltip key={side} {...args} side={side} text={side} defaultOpen />
      ))}
    </div>
  ),
};

/**
 * Opens on hover. (It also opens on keyboard focus, but only real keyboard focus counts as
 * :focus-visible, which a play function can't produce — press Tab yourself to check.)
 */
export const OpensOnHover: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole("button", { name: "ข้อมูลเพิ่มเติม" }));
    await waitFor(() =>
      expect(document.querySelector('[data-slot="tooltip-content"]')).toHaveTextContent("ข้อมูลเพิ่มเติม"),
    );
  },
};
