import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@newnewstyle/ui"

const thaiDate = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" })

type Args = {
  captionLayout: "label" | "dropdown"
  showOutsideDays: boolean
}

function SingleDate({ captionLayout, showOutsideDays }: Args) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout={captionLayout}
      showOutsideDays={showOutsideDays}
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
      options: ["label", "dropdown"],
      description: "หัวเดือน: ข้อความ หรือเลือกเดือน/ปีจากรายการ",
    },
    showOutsideDays: { description: "แสดงวันของเดือนก่อน/ถัดไป" },
  },
  render: (args) => <SingleDate {...args} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Thai month names and Buddhist-era year (พ.ศ.). */
export const Playground: Story = {}

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
export const DatePickerPattern: Story = { render: () => <DatePicker /> }
