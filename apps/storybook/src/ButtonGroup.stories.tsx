import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "lucide-react"

import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Input,
} from "@newnewstyle/ui"

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">วันนี้</Button>
      <Button variant="outline">สัปดาห์นี้</Button>
      <Button variant="outline">เดือนนี้</Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Try orientation with the controls panel. */
export const Playground: Story = {}

export const Vertical: Story = {
  args: { orientation: "vertical" },
}

/** Pagination: icon buttons around a page label. */
export const WithText: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon" aria-label="หน้าก่อนหน้า">
        <ChevronLeftIcon />
      </Button>
      <ButtonGroupText className="tabular-nums">หน้า 2 / 5</ButtonGroupText>
      <Button variant="outline" size="icon" aria-label="หน้าถัดไป">
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  ),
}

/** Split button: a main action plus a menu of related ones. */
export const SplitButton: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>
        <DownloadIcon data-icon="inline-start" />
        ส่งออก
      </Button>
      <ButtonGroupSeparator />
      <Button size="icon" aria-label="ตัวเลือกการส่งออก">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  ),
}

/** Input with a trailing unit label. */
export const WithInput: Story = {
  render: (args) => (
    <ButtonGroup {...args} className="w-64">
      <Input
        aria-label="ค่าเช่าต่อเดือน"
        placeholder="8,500"
        inputMode="numeric"
      />
      <ButtonGroupText>บาท</ButtonGroupText>
    </ButtonGroup>
  ),
}
