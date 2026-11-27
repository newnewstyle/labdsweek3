import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  Label,
  useComboboxAnchor,
} from "@newnewstyle/ui"

const tenants = [
  "สมชาย ใจกว้าง",
  "สมหญิง รักบ้าน",
  "วีระ ทองดี",
  "มาลี ศรีสุข",
  "ประเสริฐ มั่นคง",
  "อรุณี แสงทอง",
]

type Args = { showClear: boolean; disabled: boolean }

const meta = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  args: { showClear: false, disabled: false },
  argTypes: {
    showClear: { description: "ปุ่ม X ล้างค่าที่เลือก (แทนลูกศร)" },
    disabled: { description: "ปิดช่อง" },
  },
  // Room under the input so the list opens below it on the Docs page
  // instead of flipping up over the story above.
  decorators: [
    (Story) => (
      <div className="min-h-80">
        <Story />
      </div>
    ),
  ],
  render: ({ showClear, disabled }) => (
    <div className="flex max-w-xs flex-col gap-2">
      <Label htmlFor="tenant">ผู้เช่า</Label>
      <Combobox items={tenants}>
        <ComboboxInput
          id="tenant"
          placeholder="พิมพ์ชื่อเพื่อค้นหา"
          showClear={showClear}
          disabled={disabled}
        />
        <ComboboxContent>
          <ComboboxEmpty>ไม่พบผู้เช่า</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Type part of a name to filter; arrows + Enter to pick. */
export const Playground: Story = {}

export const WithClear: Story = { args: { showClear: true } }

function MultipleTenants() {
  const anchor = useComboboxAnchor()
  return (
    <div className="flex max-w-sm flex-col gap-2">
      <Label>ส่งเตือนถึง</Label>
      <Combobox
        items={tenants}
        multiple
        defaultValue={["สมชาย ใจกว้าง", "วีระ ทองดี"]}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: string[]) =>
              values.map((v) => <ComboboxChip key={v}>{v}</ComboboxChip>)
            }
          </ComboboxValue>
          <ComboboxChipsInput
            placeholder="เพิ่มผู้เช่า"
            aria-label="เพิ่มผู้เช่า"
          />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>ไม่พบผู้เช่า</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/** Pick several tenants; each shows as a removable chip. */
export const Multiple: Story = { render: () => <MultipleTenants /> }
