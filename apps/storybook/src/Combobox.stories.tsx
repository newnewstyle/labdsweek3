import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

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

import { StateGrid } from "./story-helpers"

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
    showClear: {
      control: "boolean",
      description: "ปุ่ม X ล้างค่าที่เลือก (แทนลูกศร) ที่ `ComboboxInput`",
    },
    disabled: { control: "boolean", description: "ปิดช่อง" },
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
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("combobox", { name: "ผู้เช่า" })
    // Open with the keyboard and pick the first tenant. Base UI's Combobox does
    // not re-filter on user-event's synthetic typing (real typing does), so
    // filtering is checked in NoMatch with typeLikeBrowser.
    input.focus()
    await userEvent.keyboard("{ArrowDown}")
    await waitFor(() =>
      expect(within(document.body).getAllByRole("option").length).toBeGreaterThan(0)
    )
    await expect(input).toHaveAttribute("aria-expanded", "true")
    // Opening with ArrowDown highlights the first option; Enter picks it.
    await userEvent.keyboard("{Enter}")
    await waitFor(() => expect(input).toHaveValue("สมชาย ใจกว้าง"), {
      timeout: 3000,
    })
  },
}

/**
 * Sets the value the way a real keyboard does (an InputEvent with inputType).
 * Base UI's Combobox does not re-filter on user-event's synthetic typing,
 * though real typing filters correctly (checked by hand).
 */
function typeLikeBrowser(input: HTMLInputElement, text: string) {
  const setValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )!.set!
  setValue.call(input, text)
  input.dispatchEvent(
    new InputEvent("input", { bubbles: true, data: text, inputType: "insertText" })
  )
}

/** No match shows the ComboboxEmpty message. */
export const NoMatch: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole<HTMLInputElement>("combobox", {
      name: "ผู้เช่า",
    })
    input.focus()
    typeLikeBrowser(input, "ไม่มีชื่อนี้")
    await expect(
      await within(document.body).findByText("ไม่พบผู้เช่า", {}, { timeout: 3000 })
    ).toBeInTheDocument()
  },
}

export const WithClear: Story = { args: { showClear: true } }

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("combobox", { name: "ผู้เช่า" })
    ).toBeDisabled()
  },
}

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

const states = ["rest", "focus-visible", "invalid", "disabled"] as const

/**
 * The input (an InputGroup) in each state. Focus is forced on the inner input; the group's
 * `:has(:focus-visible)` rule draws the ring.
 */
export const States: Story = {
  parameters: {
    layout: "padded",
    pseudo: { focusVisible: ['[data-pseudo="focus-visible"]'] },
  },
  render: () => (
    <StateGrid
      rows={states}
      columns={["input"] as const}
      renderCell={(state) => (
        <Combobox items={tenants}>
          <ComboboxInput
            aria-label={`ผู้เช่า (${state})`}
            placeholder="พิมพ์ชื่อเพื่อค้นหา"
            disabled={state === "disabled"}
            aria-invalid={state === "invalid" || undefined}
            data-pseudo={state === "focus-visible" ? state : undefined}
            className="w-64"
          />
        </Combobox>
      )}
    />
  ),
}
