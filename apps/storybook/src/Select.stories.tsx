import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  type SelectTriggerSize,
  SelectValue,
} from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { openOverlayStory, pseudoByAttribute, StateGrid } from "./story-helpers";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
  { label: "Durian (หมด)", value: "durian" },
];
const sizes = ["sm", "default"] as const satisfies readonly SelectTriggerSize[];

type SelectStoryArgs = {
  size: SelectTriggerSize;
  disabled: boolean;
  invalid: boolean;
  defaultValue: string | null;
};

function FruitSelect({ size, disabled, invalid, defaultValue, label = "ผลไม้" }: SelectStoryArgs & { label?: string }) {
  return (
    <Select items={fruits} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger size={size} className="w-48" aria-label={label} aria-invalid={invalid || undefined}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {fruits.map((fruit) => (
          <SelectItem key={fruit.value} value={fruit.value} disabled={fruit.value === "durian"}>
            {fruit.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const meta = {
  title: "Components/Select",
  component: FruitSelect,
  args: { size: "default", disabled: false, invalid: false, defaultValue: "apple" },
  argTypes: {
    size: {
      control: "inline-radio",
      options: sizes,
      description: "`SelectTrigger` size.",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: { control: "boolean", description: "`Select` root `disabled`." },
    invalid: { control: "boolean", description: "`aria-invalid` on `SelectTrigger`." },
    defaultValue: { control: "select", options: [null, ...fruits.map((f) => f.value)] },
  },
} satisfies Meta<typeof FruitSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const states = ["rest", "hover", "focus-visible", "disabled", "invalid"] as const;

export const States: Story = {
  parameters: { pseudo: pseudoByAttribute },
  render: (args) => (
    <StateGrid
      rows={states}
      columns={sizes}
      renderCell={(state, size) => (
        <Select items={fruits} defaultValue="apple" disabled={state === "disabled"}>
          <SelectTrigger
            size={size}
            className="w-40"
            aria-label={`${state} ${size}`}
            data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
            aria-invalid={(state === "invalid" || args.invalid) || undefined}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((fruit) => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  ),
};

/** Groups, labels, a separator and a disabled item, shown open. */
export const OpenWithGroups: Story = {
  ...openOverlayStory,
  render: () => (
    <div className="p-8">
      <Select
        defaultValue="mango"
        items={[...fruits, { label: "Carrot", value: "carrot" }, { label: "Kale", value: "kale" }]}
      >
        <SelectTrigger className="w-48" aria-label="อาหาร">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>ผลไม้</SelectLabel>
            {fruits.map((fruit) => (
              <SelectItem key={fruit.value} value={fruit.value} disabled={fruit.value === "durian"}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>ผัก</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="kale">Kale</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
  // Base UI's Select ignores `defaultOpen` on first render, so open it the way a user would.
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole("combobox", { name: "อาหาร" }).focus();
    await userEvent.keyboard("{Enter}");
    await expect(await within(document.body).findByRole("option", { name: "Carrot" })).toBeInTheDocument();
  },
};

export const PickAnItem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "ผลไม้" });
    // Open with the keyboard: user-event's synthetic click doesn't open Base UI's Select in a
    // real browser (a real mouse click does).
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    // The popup is portalled to document.body.
    const option = await within(document.body).findByRole("option", { name: "Mango" });
    await userEvent.click(option);
    await expect(trigger).toHaveTextContent("Mango");
  },
};
