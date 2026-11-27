import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import { expect, waitFor } from "storybook/test"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@newnewstyle/ui"

const monthly = [
  { month: "มิ.ย.", collected: 86000, overdue: 8500 },
  { month: "ก.ค.", collected: 91500, overdue: 4200 },
  { month: "ส.ค.", collected: 88000, overdue: 12700 },
  { month: "ก.ย.", collected: 95700, overdue: 3500 },
  { month: "ต.ค.", collected: 94200, overdue: 6800 },
  { month: "พ.ย.", collected: 79500, overdue: 24500 },
]

const config = {
  collected: { label: "เก็บได้", color: "var(--chart-1)" },
  overdue: { label: "ค้างชำระ", color: "var(--chart-2)" },
} satisfies ChartConfig

type Args = { config: ChartConfig }

const meta = {
  title: "Components/Chart",
  tags: ["autodocs"],
  args: { config },
  argTypes: {
    config: {
      control: "object",
      description:
        "One entry per series: `label` and `color` (a token such as `var(--chart-1)`) or `theme` ({ light, dark }). Each becomes `--color-<key>` inside the chart. Use chart-1…5 in order.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`ChartContainer` takes `config` and one recharts chart as children; give it a height with `className` (e.g. `h-72`). Add `ChartTooltip` / `ChartLegend` with their `*Content` parts.",
      },
    },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/**
 * Collected vs overdue per month. Two series use chart slots 1–2 (blue,
 * orange); hover a month for the exact amounts; the legend names them.
 */
export const CollectedVsOverdue: Story = {
  play: async ({ canvasElement }) => {
    const chart = canvasElement.querySelector('[data-slot="chart"]')!
    const css = chart.querySelector("style")?.textContent ?? ""
    // Series colours are written per theme; dark mode is keyed on data-theme.
    await expect(css).toContain("--color-collected: var(--chart-1)")
    await expect(css).toContain('[data-theme="dark"]')
    await waitFor(() =>
      expect(chart.querySelectorAll(".recharts-bar-rectangle").length).toBeGreaterThan(0)
    )
  },
  render: (args) => (
    <ChartContainer config={args.config} className="h-72 w-full max-w-2xl">
      <BarChart data={monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v: number) => `${v / 1000}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="collected" fill="var(--color-collected)" radius={4} />
        <Bar dataKey="overdue" fill="var(--color-overdue)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

const onTime = [
  { month: "มิ.ย.", rate: 88 },
  { month: "ก.ค.", rate: 92 },
  { month: "ส.ค.", rate: 85 },
  { month: "ก.ย.", rate: 95 },
  { month: "ต.ค.", rate: 93 },
  { month: "พ.ย.", rate: 81 },
]

/** One series over time: no legend needed, the title names it. */
export const OnTimeRate: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-2">
      <h3 className="text-sm font-semibold">อัตราจ่ายตรงเวลา (%)</h3>
      <ChartContainer
        config={{ rate: { label: "ตรงเวลา", color: "var(--chart-1)" } }}
        className="h-56 w-full"
      >
        <LineChart data={onTime} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={32}
            domain={[0, 100]}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            dataKey="rate"
            stroke="var(--color-rate)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
}
