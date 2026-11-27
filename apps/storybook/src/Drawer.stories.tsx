import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  toast,
} from "@newnewstyle/ui"

type Args = {
  swipeDirection: "down" | "up" | "left" | "right"
  showSwipeHandle: boolean
}

const meta = {
  title: "Components/Drawer",
  tags: ["autodocs"],
  args: { swipeDirection: "down", showSwipeHandle: true },
  argTypes: {
    swipeDirection: {
      control: "inline-radio",
      options: ["down", "up", "left", "right"],
      description: "ทิศที่ปัดเพื่อปิด (down = แผ่นเลื่อนจากล่าง)",
    },
    showSwipeHandle: { description: "แถบจับสำหรับปัด" },
  },
  render: ({ swipeDirection, showSwipeHandle }) => (
    <Drawer swipeDirection={swipeDirection} showSwipeHandle={showSwipeHandle}>
      <DrawerTrigger render={<Button variant="outline" />}>
        บันทึกการชำระ
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>บันทึกการชำระ</DrawerTitle>
          <DrawerDescription>บ้านเลขที่ 12/3 · สมชาย ใจกว้าง</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-sm tabular-nums">
          ค่าเช่าเดือนพฤศจิกายน 8,500 บาท
        </div>
        <DrawerFooter>
          <DrawerClose
            render={<Button />}
            onClick={() => toast.success("บันทึกการชำระแล้ว")}
          >
            ยืนยันรับเงิน
          </DrawerClose>
          <DrawerClose render={<Button variant="outline" />}>
            ยกเลิก
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Bottom sheet for phones. Swipe down, press Esc, or tap the backdrop to
 * close. Try it at mobile width.
 */
export const Playground: Story = {}

/** Side panel: slides in from the right, swipe right to close. */
export const Right: Story = { args: { swipeDirection: "right" } }
