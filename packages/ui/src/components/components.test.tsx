// Render tests for every copied component except Button (see Button/Button.test.tsx).
// They assert roles, data-slot hooks and open/close behavior — not class names, because
// CSS Modules are not compiled under Vitest.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../index";

const user = () => userEvent.setup();

describe("form controls", () => {
  it("Input and Label are associated", () => {
    render(
      <>
        <Label htmlFor="email">อีเมล</Label>
        <Input id="email" />
      </>,
    );
    const input = screen.getByLabelText("อีเมล");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("Textarea accepts typing", async () => {
    render(<Textarea aria-label="ข้อความ" />);
    await user().type(screen.getByLabelText("ข้อความ"), "สวัสดี");
    expect(screen.getByLabelText("ข้อความ")).toHaveValue("สวัสดี");
  });

  it("Checkbox toggles", async () => {
    render(<Checkbox aria-label="ยอมรับ" />);
    const box = screen.getByRole("checkbox", { name: "ยอมรับ" });
    expect(box).not.toBeChecked();
    await user().click(box);
    expect(box).toBeChecked();
  });

  it("Switch toggles", async () => {
    render(<Switch aria-label="แจ้งเตือน" />);
    const sw = screen.getByRole("switch", { name: "แจ้งเตือน" });
    expect(sw).not.toBeChecked();
    await user().click(sw);
    expect(sw).toBeChecked();
  });

  it("Select opens and picks an item", async () => {
    const items = [
      { label: "Apple", value: "apple" },
      { label: "Mango", value: "mango" },
    ];
    render(
      <Select items={items} defaultValue="apple">
        <SelectTrigger aria-label="ผลไม้">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "ผลไม้" });
    expect(trigger).toHaveTextContent("Apple");
    await user().click(trigger);
    await user().click(await screen.findByRole("option", { name: "Mango" }));
    expect(trigger).toHaveTextContent("Mango");
  });
});

describe("display components", () => {
  it("Badge renders variant as data attribute", () => {
    render(<Badge variant="destructive">ใหม่</Badge>);
    expect(screen.getByText("ใหม่")).toHaveAttribute("data-variant", "destructive");
  });

  it("Avatar shows the fallback without an image", () => {
    render(
      <Avatar>
        <AvatarFallback>NW</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("NW")).toBeInTheDocument();
  });

  it("Separator and Skeleton render their slots", () => {
    const { container } = render(
      <>
        <Separator />
        <Skeleton />
      </>,
    );
    expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
  });

  it("Table renders headers and cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>สมชาย</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "ชื่อ" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "สมชาย" })).toBeInTheDocument();
  });

  it("Tabs switch panels", async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">ภาพรวม</TabsTrigger>
          <TabsTrigger value="b">รายละเอียด</TabsTrigger>
        </TabsList>
        <TabsContent value="a">แผง A</TabsContent>
        <TabsContent value="b">แผง B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("แผง A");
    await user().click(screen.getByRole("tab", { name: "รายละเอียด" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("แผง B");
  });

  it("Sidebar renders menu buttons with active state", () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>หน้าแรก</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    const button = screen.getByRole("button", { name: "หน้าแรก" });
    expect(button).toHaveAttribute("data-slot", "sidebar-menu-button");
    expect(button).toHaveAttribute("data-active");
  });

  it("Toaster mounts without a theme provider", () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });
});

describe("overlays", () => {
  it("Dialog opens from its trigger", async () => {
    render(
      <Dialog>
        <DialogTrigger>เปิด</DialogTrigger>
        <DialogContent>
          <DialogTitle>หัวข้อ</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user().click(screen.getByRole("button", { name: "เปิด" }));
    expect(await screen.findByRole("dialog", { name: "หัวข้อ" })).toBeInTheDocument();
  });

  it("AlertDialog opens and closes with Cancel", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>ลบ</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>แน่ใจไหม</AlertDialogTitle>
            <AlertDialogDescription>ย้อนกลับไม่ได้</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction>ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await user().click(screen.getByRole("button", { name: "ลบ" }));
    expect(await screen.findByRole("alertdialog", { name: "แน่ใจไหม" })).toBeInTheDocument();
    await user().click(screen.getByRole("button", { name: "ยกเลิก" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("Sheet opens on the right by default", async () => {
    render(
      <Sheet>
        <SheetTrigger>เมนู</SheetTrigger>
        <SheetContent>
          <SheetTitle>แผงข้าง</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    await user().click(screen.getByRole("button", { name: "เมนู" }));
    const sheet = await screen.findByRole("dialog", { name: "แผงข้าง" });
    expect(sheet).toHaveAttribute("data-side", "right");
  });

  it("DropdownMenu shows its items", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>บัญชี</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>โปรไฟล์</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user().click(screen.getByRole("button", { name: "บัญชี" }));
    expect(await screen.findByRole("menuitem", { name: "โปรไฟล์" })).toBeInTheDocument();
  });

  it("Tooltip shows on keyboard focus", async () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger>ช่วยเหลือ</TooltipTrigger>
          <TooltipContent>คำอธิบาย</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user().tab();
    expect(screen.getByRole("button", { name: "ช่วยเหลือ" })).toHaveFocus();
    expect(await screen.findByText("คำอธิบาย")).toBeInTheDocument();
  });
});
