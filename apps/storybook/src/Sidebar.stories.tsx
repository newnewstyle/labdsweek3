import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  type SidebarProps,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeIcon, InboxIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";

type Variant = NonNullable<SidebarProps["variant"]>;
type Side = NonNullable<SidebarProps["side"]>;
type Collapsible = NonNullable<SidebarProps["collapsible"]>;

const variants = ["sidebar", "floating", "inset"] as const satisfies readonly Variant[];
const sides = ["left", "right"] as const satisfies readonly Side[];
const collapsibles = ["offcanvas", "icon", "none"] as const satisfies readonly Collapsible[];

const menu = [
  { title: "หน้าแรก", icon: HomeIcon, badge: undefined },
  { title: "กล่องข้อความ", icon: InboxIcon, badge: "12" },
  { title: "ผู้ใช้", icon: UsersIcon, badge: undefined },
  { title: "ตั้งค่า", icon: SettingsIcon, badge: undefined },
];

type SidebarStoryArgs = {
  variant: Variant;
  side: Side;
  collapsible: Collapsible;
  defaultOpen: boolean;
  loading: boolean;
};

function AppShell({ variant, side, collapsible, defaultOpen, loading }: SidebarStoryArgs) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="min-h-[480px]">
      <Sidebar variant={variant} side={side} collapsible={collapsible}>
        <SidebarHeader>
          <SidebarInput aria-label="ค้นหาเมนู" placeholder="ค้นหา..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {loading
                  ? Array.from({ length: 4 }, (_, i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuSkeleton showIcon />
                      </SidebarMenuItem>
                    ))
                  : menu.map((item, i) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={i === 0} tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                        {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                      </SidebarMenuItem>
                    ))}
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="รายงาน">
                    <InboxIcon />
                    <span>รายงาน</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive href="#monthly">
                        รายเดือน
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#yearly">รายปี</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="บัญชี">
                <UsersIcon />
                <span>นวพร · ผู้ดูแล</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">หน้าแรก</span>
        </header>
        {/* SidebarInset already renders <main>; don't nest another landmark. */}
        <div className="p-4 text-sm text-muted-foreground">เนื้อหาของหน้า</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = {
  title: "Components/Sidebar",
  component: AppShell,
  args: { variant: "sidebar", side: "left", collapsible: "offcanvas", defaultOpen: true, loading: false },
  argTypes: {
    variant: { control: "inline-radio", options: variants, description: "`Sidebar` variant." },
    side: { control: "inline-radio", options: sides, description: "`Sidebar` side." },
    collapsible: {
      control: "inline-radio",
      options: collapsibles,
      description: "`Sidebar` collapse mode. Try `icon`, then the trigger (or Ctrl/⌘+B).",
    },
    defaultOpen: { control: "boolean", description: "`SidebarProvider` starts expanded." },
    loading: { control: "boolean", description: "Shows `SidebarMenuSkeleton` rows." },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Floating: Story = { args: { variant: "floating" } };
export const Inset: Story = { args: { variant: "inset" } };
export const RightSide: Story = { args: { side: "right" } };

/** Collapsed to icons; hover an icon to see its tooltip. */
export const CollapsedToIcons: Story = { args: { collapsible: "icon", defaultOpen: false } };

export const Loading: Story = { args: { loading: true } };

/** `SidebarMenuButton` sizes and states. */
export const MenuButtonStates: Story = {
  parameters: { layout: "centered", pseudo: pseudoByAttribute },
  render: () => (
    <SidebarProvider className="min-h-0">
      <div className="w-full rounded-lg bg-sidebar p-2 text-sidebar-foreground">
        <StateGrid
          rows={["rest", "hover", "focus-visible", "active", "disabled"] as const}
          columns={["sm", "default", "lg"] as const}
          renderCell={(state, size) => (
            <SidebarMenu className="w-44">
              <SidebarMenuItem>
                <SidebarMenuButton
                  size={size}
                  isActive={state === "active"}
                  disabled={state === "disabled"}
                  data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
                >
                  <HomeIcon />
                  <span>หน้าแรก</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        />
      </div>
    </SidebarProvider>
  ),
};

/**
 * The trigger collapses the sidebar on desktop. Below 768px (useIsMobile) the sidebar is a Sheet
 * instead, and the trigger opens it.
 */
export const ToggleWithTrigger: Story = {
  args: { collapsible: "icon" },
  play: async ({ canvasElement }) => {
    // SidebarRail shares the trigger's accessible name on desktop, so select the trigger by slot.
    const trigger = canvasElement.querySelector<HTMLElement>('[data-slot="sidebar-trigger"]');
    if (!trigger) throw new Error("SidebarTrigger not rendered");
    if (window.innerWidth < 768) {
      await userEvent.click(trigger);
      await expect(await within(document.body).findByRole("dialog")).toBeInTheDocument();
      return;
    }
    const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
    await expect(sidebar).toHaveAttribute("data-state", "expanded");
    await userEvent.click(trigger);
    await expect(sidebar).toHaveAttribute("data-state", "collapsed");
  },
};
