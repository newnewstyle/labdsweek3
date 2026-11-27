import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  type AvatarSize,
} from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { avatarDataUri, StateGrid } from "./story-helpers";

const sizes = ["sm", "default", "lg"] as const satisfies readonly AvatarSize[];

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: { size: "default" },
  argTypes: {
    size: {
      control: "inline-radio",
      options: sizes,
      table: { defaultValue: { summary: "default" } },
    },
    className: { control: "text" },
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={avatarDataUri("NW", 25)} alt="นวพร" />
      <AvatarFallback>NW</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Image, fallback (no image) and with a status badge, at every size. */
export const Sizes: Story = {
  render: () => (
    <StateGrid
      corner="size"
      rows={sizes}
      columns={["image", "fallback", "badge"] as const}
      renderCell={(size, kind) => (
        <Avatar size={size}>
          {kind !== "fallback" && <AvatarImage src={avatarDataUri("SM", 200)} alt="สมชาย" />}
          <AvatarFallback>SM</AvatarFallback>
          {kind === "badge" && (
            <AvatarBadge>
              <span className="sr-only">ออนไลน์</span>
            </AvatarBadge>
          )}
        </Avatar>
      )}
    />
  ),
};

/** A broken image URL falls back to the initials. */
export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="data:image/png;base64,broken" alt="ผู้ใช้" />
      <AvatarFallback>ผู้</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByText("ผู้")).toBeInTheDocument();
  },
};

export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      {[
        ["NW", 25],
        ["SM", 200],
        ["ML", 300],
      ].map(([initials, hue]) => (
        <Avatar key={initials} {...args}>
          <AvatarImage src={avatarDataUri(String(initials), Number(hue))} alt={String(initials)} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
};
