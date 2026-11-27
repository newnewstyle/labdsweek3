import { Checkbox, Input, Label } from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Components/Label",
  component: Label,
  args: { children: "อีเมล" },
  argTypes: {
    children: { control: "text" },
    htmlFor: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithInput: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-2">
      <Label {...args} htmlFor="label-email" />
      <Input id="label-email" placeholder="name@example.com" />
    </div>
  ),
};

/** The label dims when the control right before it is disabled (`:disabled ~ label`). */
export const DisabledControl: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-disabled" disabled />
      <Label htmlFor="label-disabled">ตัวเลือกที่ปิดใช้งาน</Label>
    </div>
  ),
};

/** The label also dims inside a wrapper marked `data-disabled="true"`. */
export const DisabledGroup: Story = {
  render: () => (
    <div data-disabled="true" className="flex w-72 flex-col gap-2">
      <Label htmlFor="label-group">ชื่อผู้ใช้</Label>
      <Input id="label-group" disabled />
    </div>
  ),
};

/** Clicking the label moves focus to its control. */
export const FocusesControl: Story = {
  render: WithInput.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("อีเมล"));
    await expect(canvas.getByRole("textbox")).toHaveFocus();
  },
};
