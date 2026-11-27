import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  type SheetSide,
  SheetTitle,
  SheetTrigger,
} from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { openOverlayStory } from "./story-helpers";

const sides = ["top", "right", "bottom", "left"] as const satisfies readonly SheetSide[];

type SheetStoryArgs = { side: SheetSide; showCloseButton: boolean; defaultOpen: boolean };

function ExampleSheet({ side, showCloseButton, defaultOpen }: SheetStoryArgs) {
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger render={<Button variant="outline" />}>เปิดแผง ({side})</SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>ตัวกรอง</SheetTitle>
          <SheetDescription>เลือกเงื่อนไขแล้วกดใช้</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          <Label htmlFor={`sheet-search-${side}`}>คำค้น</Label>
          <Input id={`sheet-search-${side}`} placeholder="ค้นหา..." />
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>ใช้ตัวกรอง</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const meta = {
  title: "Components/Sheet",
  component: ExampleSheet,
  args: { side: "right", showCloseButton: true, defaultOpen: false },
  argTypes: {
    side: {
      control: "inline-radio",
      options: sides,
      description: "`SheetContent` side.",
      table: { defaultValue: { summary: "right" } },
    },
    showCloseButton: { control: "boolean", description: "`SheetContent`: the × button." },
    defaultOpen: { control: "boolean", description: "`Sheet` root starts open." },
  },
} satisfies Meta<typeof ExampleSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** One trigger per side. */
export const Sides: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      {sides.map((side) => (
        <ExampleSheet key={side} {...args} side={side} />
      ))}
    </div>
  ),
};

export const OpenRight: Story = { ...openOverlayStory, args: { defaultOpen: true, side: "right" } };
export const OpenBottom: Story = { ...openOverlayStory, args: { defaultOpen: true, side: "bottom" } };
export const OpenLeft: Story = { ...openOverlayStory, args: { defaultOpen: true, side: "left" } };

export const OpenAndClose: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "เปิดแผง (right)" });
    await userEvent.click(trigger);
    const sheet = await within(document.body).findByRole("dialog", { name: "ตัวกรอง" });
    await expect(sheet).toHaveAttribute("data-side", "right");
    await userEvent.click(within(sheet).getByRole("button", { name: "ใช้ตัวกรอง" }));
    // Assert state, not unmounting: the slide-out transition doesn't advance in a background tab.
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};
