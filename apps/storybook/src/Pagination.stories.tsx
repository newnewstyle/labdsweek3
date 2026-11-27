import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@newnewstyle/ui"

import { pseudoByAttribute, StateGrid } from "./story-helpers"

type Args = { page: number; previousText: string; nextText: string }

const meta = {
  title: "Components/Pagination",
  tags: ["autodocs"],
  args: { page: 2, previousText: "ก่อนหน้า", nextText: "ถัดไป" },
  argTypes: {
    page: {
      control: { type: "range", min: 1, max: 3, step: 1 },
      description:
        "หน้าที่เปิดอยู่: `PaginationLink isActive` ได้ขอบ (outline) และ `aria-current=\"page\"`",
    },
    previousText: {
      control: "text",
      description: "`text` ของ PaginationPrevious (ซ่อนบนจอมือถือ เหลือลูกศร)",
    },
    nextText: { control: "text", description: "`text` ของ PaginationNext" },
  },
  render: ({ page, previousText, nextText }) => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text={previousText} />
        </PaginationItem>
        {[1, 2, 3].map((n) => (
          <PaginationItem key={n}>
            <PaginationLink href="#" isActive={n === page}>
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text={nextText} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Page 2 of 12 under a long table. On phones the "ก่อนหน้า / ถัดไป" text
 * hides and only the arrows remain.
 */
export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation")).toHaveAttribute(
      "data-slot",
      "pagination"
    )
    // Page links are links (Button rendered as <a> with role="link").
    const current = canvas.getByRole("link", { name: String(args.page) })
    await expect(current).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("link", { name: "1" })).not.toHaveAttribute(
      "aria-current"
    )
  },
}

const states = ["rest", "hover", "focus-visible", "current"] as const

/** Page link states. */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={states}
      columns={["page link"] as const}
      renderCell={(state) => (
        <PaginationLink
          href="#"
          isActive={state === "current"}
          data-pseudo={
            state === "hover" || state === "focus-visible" ? state : undefined
          }
        >
          2
        </PaginationLink>
      )}
    />
  ),
}
