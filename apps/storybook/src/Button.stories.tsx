import { Button, type ButtonSize, type ButtonVariant } from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRightIcon, PencilIcon, PlusIcon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

// Prop values come from the package's exported types, so a renamed/removed variant breaks typecheck.
const variants = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const satisfies readonly ButtonVariant[];
const textSizes = ["xs", "sm", "default", "lg"] as const satisfies readonly ButtonSize[];
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const satisfies readonly ButtonSize[];

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "บันทึก",
    variant: "default",
    size: "default",
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "Visual style. Rendered as `data-variant`.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: [...textSizes, ...iconSizes],
      description: "Height and padding. `icon*` sizes are square. Rendered as `data-size`.",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: { control: "boolean" },
    "aria-invalid": {
      control: "boolean",
      description: "Error state (destructive border and ring).",
    },
    children: { control: "text" },
    render: {
      control: false,
      description:
        "Base UI render prop: render as another element. Pass `nativeButton={false}` for non-buttons.",
    },
    nativeButton: { control: "boolean" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Change every prop from the Controls panel. */
export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {textSizes.map((size) => (
          <Button key={size} {...args} size={size}>
            size {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {iconSizes.map((size) => (
          <Button key={size} {...args} size={size} aria-label={`แก้ไข (${size})`}>
            <PencilIcon />
          </Button>
        ))}
      </div>
    </div>
  ),
};

/** Every variant disabled: 50% opacity, not clickable. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "default" });
    await expect(button).toBeDisabled();
    // Disabled buttons have pointer-events: none; skip user-event's guard to prove clicks are ignored.
    await userEvent.setup({ pointerEventsCheck: 0 }).click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** `aria-invalid="true"` on every variant. */
export const Invalid: Story = {
  args: { "aria-invalid": true },
  render: Variants.render,
};

const states = [
  { name: "rest", props: {} },
  { name: "hover", props: { "data-pseudo": "hover" } },
  { name: "focus-visible", props: { "data-pseudo": "focus-visible" } },
  { name: "active", props: { "data-pseudo": "active" } },
  { name: "disabled", props: { disabled: true } },
  { name: "invalid", props: { "aria-invalid": true } },
] as const;

/**
 * Every variant in every interaction state. Hover, focus-visible and active are forced with
 * storybook-addon-pseudo-states (a real :focus-visible needs a keyboard, which a story can't fake).
 */
export const States: Story = {
  parameters: {
    layout: "padded",
    pseudo: {
      hover: ['[data-pseudo="hover"]'],
      focusVisible: ['[data-pseudo="focus-visible"]'],
      active: ['[data-pseudo="active"]'],
    },
  },
  render: (args) => (
    <table className="border-separate border-spacing-x-3 border-spacing-y-2 text-sm">
      <thead>
        <tr>
          <th className="pr-2 text-left font-medium text-muted-foreground">state</th>
          {variants.map((variant) => (
            <th key={variant} className="text-left font-medium text-muted-foreground">
              {variant}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {states.map((state) => (
          <tr key={state.name}>
            <th className="pr-2 text-left font-medium text-muted-foreground">{state.name}</th>
            {variants.map((variant) => (
              <td key={variant}>
                <Button {...args} {...state.props} variant={variant}>
                  บันทึก
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

/** Tabbing reaches the button (keyboard accessible). Press Tab yourself to see the ring. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

/** `data-icon="inline-start|inline-end"` trims the padding on that side. */
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <PlusIcon data-icon="inline-start" />
        เพิ่มรายการ
      </Button>
      <Button {...args} variant="outline">
        ถัดไป
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  ),
};

/** Base UI `render` prop instead of `asChild`. The element keeps `role="button"`. */
export const AsLink: Story = {
  args: {
    nativeButton: false,
    render: <a href="#dashboard" />,
    children: "เข้าสู่ระบบจัดการ",
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("button", { name: "เข้าสู่ระบบจัดการ" });
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "#dashboard");
  },
};

/** Clicking calls `onClick` (see the Actions and Interactions panels). */
export const ClickInteraction: Story = {
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "บันทึก" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** `className` utilities win over the module styles (they sit in a later CSS layer). */
export const ClassNameOverride: Story = {
  args: { className: "w-64 rounded-full" },
};
