import type { Meta, StoryObj } from "@storybook/react-vite"
import { HouseIcon, PlusIcon, SearchXIcon } from "lucide-react"

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  type EmptyMediaVariant,
  EmptyTitle,
} from "@scope/ui"

type Args = { mediaVariant: EmptyMediaVariant }

const meta = {
  title: "Components/Empty",
  tags: ["autodocs"],
  args: { mediaVariant: "icon" },
  argTypes: {
    mediaVariant: {
      control: "inline-radio",
      options: ["default", "icon"],
      description: "ไอคอนเปล่า หรือไอคอนในกล่องพื้นเทา",
    },
  },
  render: ({ mediaVariant }) => (
    <Empty className="max-w-md border">
      <EmptyHeader>
        <EmptyMedia variant={mediaVariant}>
          <HouseIcon aria-hidden />
        </EmptyMedia>
        <EmptyTitle>ยังไม่มีบ้านเช่า</EmptyTitle>
        <EmptyDescription>
          เพิ่มบ้านหลังแรกเพื่อเริ่มบันทึกผู้เช่าและค่าเช่า
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" aria-hidden />
          เพิ่มบ้าน
        </Button>
      </EmptyContent>
    </Empty>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** First use: explain, then offer the one action that fills the page. */
export const Playground: Story = {}

/** No search results: suggest how to widen the search. */
export const NoResults: Story = {
  render: () => (
    <Empty className="max-w-md border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon aria-hidden />
        </EmptyMedia>
        <EmptyTitle>ไม่พบผู้เช่าที่ค้นหา</EmptyTitle>
        <EmptyDescription>ลองค้นด้วยชื่อเล่นหรือเบอร์โทร</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">ล้างการค้นหา</Button>
      </EmptyContent>
    </Empty>
  ),
}
