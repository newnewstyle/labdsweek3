import { Tabs, TabsContent, TabsList, type TabsListVariant, TabsTrigger } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";

const listVariants = ["default", "line"] as const satisfies readonly TabsListVariant[];

type TabsStoryArgs = {
  variant: TabsListVariant;
  orientation: "horizontal" | "vertical";
  disableThird: boolean;
};

function ExampleTabs({ variant, orientation, disableThird }: TabsStoryArgs) {
  return (
    <Tabs defaultValue="overview" orientation={orientation} className="w-96">
      <TabsList variant={variant}>
        <TabsTrigger value="overview">
          <HomeIcon />
          ภาพรวม
        </TabsTrigger>
        <TabsTrigger value="profile">
          <UserIcon />
          โปรไฟล์
        </TabsTrigger>
        <TabsTrigger value="settings" disabled={disableThird}>
          <SettingsIcon />
          ตั้งค่า
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">เนื้อหาแท็บภาพรวม</TabsContent>
      <TabsContent value="profile">เนื้อหาแท็บโปรไฟล์</TabsContent>
      <TabsContent value="settings">เนื้อหาแท็บตั้งค่า</TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "Components/Tabs",
  component: ExampleTabs,
  args: { variant: "default", orientation: "horizontal", disableThird: false },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: listVariants,
      description: "`TabsList` variant.",
      table: { defaultValue: { summary: "default" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "`Tabs` root orientation.",
    },
    disableThird: { control: "boolean", description: "`disabled` on the third `TabsTrigger`." },
  },
} satisfies Meta<typeof ExampleTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {listVariants.map((variant) => (
        <ExampleTabs key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};

/** Trigger states per list variant. */
export const TriggerStates: Story = {
  parameters: { pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={["inactive", "active", "hover", "focus-visible", "disabled"] as const}
      columns={listVariants}
      renderCell={(state, variant) => (
        <Tabs defaultValue={state === "active" ? "a" : "x"}>
          <TabsList variant={variant}>
            <TabsTrigger
              value="a"
              disabled={state === "disabled"}
              data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
            >
              แท็บ
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    />
  ),
};

export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "โปรไฟล์" }));
    await expect(canvas.getByRole("tab", { name: "โปรไฟล์" })).toHaveAttribute("aria-selected", "true");
    // Query the panel by its tab's name: the previous panel can linger while it unmounts.
    await waitFor(() =>
      expect(canvas.getByRole("tabpanel", { name: /โปรไฟล์/ })).toHaveTextContent("เนื้อหาแท็บโปรไฟล์"),
    );
  },
};
