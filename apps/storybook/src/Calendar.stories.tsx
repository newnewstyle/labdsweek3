import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@newnewstyle/ui"

const thaiDate = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" })

const captionLayouts = ["label", "dropdown"] as const

type Args = {
  captionLayout: (typeof captionLayouts)[number]
  showOutsideDays: boolean
}

// Fixed month so the story (and its play) look the same every day.
const NOV_2026 = new Date(2026, 10, 15)

function SingleDate({ captionLayout, showOutsideDays }: Args) {
  const [date, setDate] = React.useState<Date | undefined>(NOV_2026)
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout={captionLayout}
      showOutsideDays={showOutsideDays}
      defaultMonth={NOV_2026}
      className="rounded-lg border"
    />
  )
}

const meta = {
  title: "Components/Calendar",
  tags: ["autodocs"],
  args: { captionLayout: "label", showOutsideDays: true },
  argTypes: {
    captionLayout: {
      control: "inline-radio",
      options: captionLayouts,
      description: "หัวเดือน: ข้อความ หรือเลือกเดือน/ปีจากรายการ",
      table: { defaultValue: { summary: "label" } },
    },
    showOutsideDays: {
      control: "boolean",
      description: "แสดงวันของเดือนก่อน/ถัดไป",
      table: { defaultValue: { summary: "true" } },
    },
  },
  render: (args) => <SingleDate {...args} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Thai month names and Buddhist-era year (พ.ศ.). */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("พฤศจิกายน 2569")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: /ถัดไป|next/i }))
    await expect(await canvas.findByText("ธันวาคม 2569")).toBeInTheDocument()
  },
}

/** Month and year dropdowns: jump far, e.g. a lease start years ago. */
export const Dropdown: Story = { args: { captionLayout: "dropdown" } }

function LeaseRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 10, 1),
    to: new Date(2026, 10, 14),
  })
  return (
    <Calendar
      mode="range"
      defaultMonth={range?.from}
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  )
}

/** Range over two months, e.g. a short-term lease. */
export const Range: Story = { render: () => <LeaseRange /> }

function DatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <Label htmlFor="due">วันครบกำหนดชำระ</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id="due"
              variant="outline"
              className="justify-start font-normal"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" aria-hidden />
          {date ? thaiDate.format(date) : "เลือกวันที่"}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/**
 * Date picker = Popover + Calendar (a pattern, not a separate component).
 * The button shows the chosen date in Thai; picking a day closes it.
 */
export const DatePickerPattern: Story = {
  render: () => <DatePicker />,
  play: async ({ canvasElement }) => {
    // The <Label htmlFor="due"> names the button; its text shows the date.
    const trigger = within(canvasElement).getByRole("button", {
      name: "วันครบกำหนดชำระ",
    })
    await expect(trigger).toHaveTextContent("เลือกวันที่")
    await userEvent.click(trigger)
    const popup = await within(document.body).findByRole("dialog")
    const day = within(popup)
      .getAllByRole("button")
      .find((b) => b.textContent === "15")
    await userEvent.click(day!)
    await waitFor(() => expect(trigger).not.toHaveTextContent("เลือกวันที่"))
  },
}
