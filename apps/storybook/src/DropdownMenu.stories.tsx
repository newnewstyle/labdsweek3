import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

import { openOverlayStory } from "./story-helpers";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

type MenuStoryArgs = {
  side: Side;
  align: Align;
  defaultOpen: boolean;
  onSelectProfile: () => void;
};

function ExampleMenu({ side, align, defaultOpen, onSelectProfile }: MenuStoryArgs) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={<Button variant="outline" />}>บัญชีของฉัน</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>บัญชี</DropdownMenuLabel>
          <DropdownMenuItem onClick={onSelectProfile}>
            <UserIcon />
            โปรไฟล์
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            ตั้งค่า
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>ทีม (เร็ว ๆ นี้)</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>การแสดงผล</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>แถบสถานะ</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>แผงข้าง</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="th">
          <DropdownMenuLabel inset>ภาษา</DropdownMenuLabel>
          <DropdownMenuRadioItem value="th">ไทย</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>เชิญเพื่อน</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>อีเมล</DropdownMenuItem>
            <DropdownMenuItem>ลิงก์</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: "Components/DropdownMenu",
  component: ExampleMenu,
  args: { side: "bottom", align: "start", defaultOpen: false, onSelectProfile: fn() },
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"], description: "`DropdownMenuContent` side." },
    align: { control: "inline-radio", options: ["start", "center", "end"], description: "`DropdownMenuContent` align." },
    defaultOpen: { control: "boolean", description: "`DropdownMenu` root starts open." },
  },
} satisfies Meta<typeof ExampleMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * Every item type: label, shortcut, disabled item, inset labels, checkbox items, radio group,
 * submenu and a destructive item.
 */
export const Open: Story = {
  ...openOverlayStory,
  args: { defaultOpen: true },
  render: (args) => (
    <div className="p-8">
      <ExampleMenu {...args} />
    </div>
  ),
};

export const SelectItem: Story = {
  play: async ({ args, canvasElement }) => {
    // Open with the keyboard: user-event's synthetic click opens Base UI menus unreliably in a
    // real browser (a real mouse click always works).
    within(canvasElement).getByRole("button", { name: "บัญชีของฉัน" }).focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.click(await within(document.body).findByRole("menuitem", { name: /โปรไฟล์/ }));
    await expect(args.onSelectProfile).toHaveBeenCalledOnce();
  },
};
