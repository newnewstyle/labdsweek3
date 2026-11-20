import { Skeleton } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  args: { className: "h-4 w-48" },
  argTypes: {
    className: {
      control: "text",
      description: "Size and shape come from utilities, e.g. `h-4 w-48` or `size-10 rounded-full`.",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Placeholder for a profile row while it loads. */
export const ProfileRow: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  ),
};

/** Placeholder for a card while it loads. */
export const Card: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Skeleton className="h-36 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
