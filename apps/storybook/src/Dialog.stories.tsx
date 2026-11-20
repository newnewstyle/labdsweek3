import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { openOverlayStory } from "./story-helpers";

type DialogStoryArgs = {
  showCloseButton: boolean;
  footerCloseButton: boolean;
  defaultOpen: boolean;
};

function ExampleDialog({ showCloseButton, footerCloseButton, defaultOpen }: DialogStoryArgs) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger render={<Button variant="outline" />}>แก้ไขโปรไฟล์</DialogTrigger>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
          <DialogDescription>เปลี่ยนข้อมูลแล้วกดบันทึก</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dialog-name">ชื่อ</Label>
          <Input id="dialog-name" defaultValue="นวพร" />
        </div>
        <DialogFooter showCloseButton={footerCloseButton}>
          <DialogClose render={<Button />}>บันทึก</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  title: "Components/Dialog",
  component: ExampleDialog,
  args: { showCloseButton: true, footerCloseButton: false, defaultOpen: false },
  argTypes: {
    showCloseButton: { control: "boolean", description: "`DialogContent`: the × button top-right." },
    footerCloseButton: { control: "boolean", description: "`DialogFooter showCloseButton`: adds a Close button." },
    defaultOpen: { control: "boolean", description: "`Dialog` root starts open." },
  },
} satisfies Meta<typeof ExampleDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = { ...openOverlayStory, args: { defaultOpen: true } };

export const OpenWithFooterClose: Story = {
  ...openOverlayStory,
  args: { defaultOpen: true, showCloseButton: false, footerCloseButton: true },
};

/**
 * Opens from the trigger and closes with Escape. Asserts open/closed state, not visibility:
 * the fade transitions don't advance in a background tab, which made visibility checks flaky.
 */
export const OpenAndClose: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "แก้ไขโปรไฟล์" });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole("dialog", { name: "แก้ไขโปรไฟล์" });
    await expect(dialog).toHaveAttribute("data-open");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};
