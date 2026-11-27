import type { Meta, StoryObj } from "@storybook/react-vite"
import { SlashIcon } from "lucide-react"
import { expect, within } from "storybook/test"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@newnewstyle/ui"

import { pseudoByAttribute, StateGrid } from "./story-helpers"

type Args = { parent: string; current: string }

const meta = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  args: { parent: "บ้านเช่า", current: "บ้านเลขที่ 12/3" },
  argTypes: {
    parent: {
      control: "text",
      description: "ลิงก์ระดับบน (`BreadcrumbLink`, รับ `href` หรือ `render`)",
    },
    current: {
      control: "text",
      description: "หน้าปัจจุบัน (`BreadcrumbPage`, ได้ `aria-current=\"page\"`)",
    },
  },
  render: ({ parent, current }) => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{parent}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Detail page: list › item. The last crumb is the current page. */
export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation")).toHaveAttribute(
      "data-slot",
      "breadcrumb"
    )
    await expect(canvas.getByRole("link", { name: args.parent })).toHaveAttribute(
      "href",
      "#"
    )
    await expect(canvas.getByText(args.current)).toHaveAttribute(
      "aria-current",
      "page"
    )
  },
}

/** Long trail: middle levels fold into an ellipsis. */
export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">ภาพรวม</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">บ้านเลขที่ 12/3</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>สัญญาเช่า 2569</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** Pass children to BreadcrumbSeparator to change the divider. */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">ผู้เช่า</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>สมชาย ใจกว้าง</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

const states = ["rest", "hover", "focus-visible"] as const

/** Link states (hover darkens the text, keyboard focus shows the ring). */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={states}
      columns={["link"] as const}
      renderCell={(state) => (
        <BreadcrumbLink
          href="#"
          data-pseudo={state === "rest" ? undefined : state}
        >
          บ้านเช่า
        </BreadcrumbLink>
      )}
    />
  ),
}
