import { Separator } from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Separator",
  component: Separator,
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    className: { control: "text" },
  },
  decorators: [
    (Story, { args }) => (
      <div className={args.orientation === "vertical" ? "flex h-10 items-center" : "w-72"}>
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InContent: Story = {
  render: () => (
    <div className="w-80 text-sm">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium">@newnewstyle/ui</h4>
        <p className="text-muted-foreground">React design system บน Base UI</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <span>เอกสาร</span>
        <Separator orientation="vertical" />
        <span>คอมโพเนนต์</span>
        <Separator orientation="vertical" />
        <span>ตัวอย่าง</span>
      </div>
    </div>
  ),
};
