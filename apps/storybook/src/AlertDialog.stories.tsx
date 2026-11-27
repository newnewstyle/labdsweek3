import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  type AlertDialogSize,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2Icon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

import { openOverlayStory } from "./story-helpers";

const sizes = ["default", "sm"] as const satisfies readonly AlertDialogSize[];

type AlertDialogStoryArgs = {
  size: AlertDialogSize;
  withMedia: boolean;
  defaultOpen: boolean;
  onConfirm: () => void;
};

function ExampleAlertDialog({ size, withMedia, defaultOpen, onConfirm }: AlertDialogStoryArgs) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>ลบรายการ</AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {withMedia && (
            <AlertDialogMedia>
              <Trash2Icon />
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>ลบรายการนี้ใช่ไหม</AlertDialogTitle>
          <AlertDialogDescription>ย้อนกลับไม่ได้ รายการจะถูกลบถาวร</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            ลบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const meta = {
  title: "Components/AlertDialog",
  component: ExampleAlertDialog,
  args: { size: "default", withMedia: false, defaultOpen: false, onConfirm: fn() },
  argTypes: {
    size: {
      control: "inline-radio",
      options: sizes,
      description: "`AlertDialogContent` size.",
      table: { defaultValue: { summary: "default" } },
    },
    withMedia: { control: "boolean", description: "Adds `AlertDialogMedia` (icon) to the header." },
    defaultOpen: { control: "boolean", description: "`AlertDialog` root starts open." },
  },
} satisfies Meta<typeof ExampleAlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = { ...openOverlayStory, args: { defaultOpen: true } };

export const OpenSmallWithMedia: Story = {
  ...openOverlayStory,
  args: { defaultOpen: true, size: "sm", withMedia: true },
};

/** Cancel closes without confirming; Delete calls the handler. */
export const CancelAndConfirm: Story = {
  play: async ({ args, canvasElement }) => {
    const body = within(document.body);
    const trigger = within(canvasElement).getByRole("button", { name: "ลบรายการ" });

    await userEvent.click(trigger);
    await userEvent.click(await body.findByRole("button", { name: "ยกเลิก" }));
    await expect(args.onConfirm).not.toHaveBeenCalled();

    await userEvent.click(trigger);
    await userEvent.click(await body.findByRole("button", { name: "ลบ" }));
    await expect(args.onConfirm).toHaveBeenCalledOnce();
  },
};
