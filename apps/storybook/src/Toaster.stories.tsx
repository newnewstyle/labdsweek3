import { Button, Toaster, toast } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

const meta = {
  title: "Components/Toaster (Sonner)",
  component: Toaster,
  args: { position: "bottom-right", richColors: false, closeButton: false, expand: false },
  argTypes: {
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] satisfies Position[],
    },
    richColors: { control: "boolean" },
    closeButton: { control: "boolean" },
    expand: { control: "boolean" },
    theme: {
      control: false,
      description: "Defaults to next-themes' theme. Here it follows the toolbar theme.",
    },
  },
  parameters: { layout: "fullscreen" },
  // Toaster normally reads next-themes; in Storybook pass the toolbar theme instead.
  render: (args, { globals }) => (
    <div className="flex min-h-80 flex-wrap content-start gap-2 p-8">
      <Toaster {...args} theme={globals.theme === "dark" ? "dark" : "light"} />
      <Button variant="outline" onClick={() => toast("บันทึกแบบร่างแล้ว")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("บันทึกสำเร็จ")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("มีอัปเดตใหม่")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("พื้นที่ใกล้เต็ม")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("บันทึกไม่สำเร็จ")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.loading("กำลังอัปโหลด...")}>
        Loading
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("ลบรายการแล้ว", {
            description: "รายการถูกย้ายไปถังขยะ",
            action: { label: "เลิกทำ", onClick: () => toast.success("กู้คืนแล้ว") },
          })
        }
      >
        With action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "กำลังส่ง...",
            success: "ส่งเรียบร้อย",
            error: "ส่งไม่สำเร็จ",
          })
        }
      >
        Promise
      </Button>
    </div>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a button to show each toast type; change position and options in Controls. */
export const Playground: Story = {};

export const RichColors: Story = { args: { richColors: true, closeButton: true } };

export const ShowsSuccessToast: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Success" }));
    // sonner's toast store is global, so earlier toasts may still be on screen.
    const toasts = await within(document.body).findAllByText("บันทึกสำเร็จ");
    await expect(toasts.length).toBeGreaterThan(0);
  },
};
