// Render tests for the components ported from my-app-2 after the first copy (phase 2: forms, data
// pages, overlays). Same style as components.test.tsx: roles, labels and data-* hooks, never class
// names (CSS Modules are not compiled under Vitest).
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartContainer,
  Combobox,
  ComboboxInput,
  DataTable,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FileDropzone,
  formatMoney,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Money,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
  ScrollArea,
  Spinner,
  StatCard,
  StatusBadge,
  Timeline,
  TimelineItem,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "../index";

describe("Field", () => {
  it("links label, description and error to the control", () => {
    render(
      <Field data-invalid>
        <FieldLabel htmlFor="rent">ค่าเช่า</FieldLabel>
        <Input id="rent" aria-invalid />
        <FieldDescription>บาทต่อเดือน</FieldDescription>
        <FieldError>กรอกค่าเช่า</FieldError>
      </Field>,
    );
    expect(screen.getByLabelText("ค่าเช่า")).toHaveAttribute("id", "rent");
    expect(screen.getByRole("group")).toHaveAttribute("data-slot", "field");
    expect(screen.getByRole("alert")).toHaveTextContent("กรอกค่าเช่า");
  });

  it("renders no error element without a message", () => {
    render(<FieldError />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("InputGroup", () => {
  it("groups an addon with its input", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="ค้นหา" />
        <InputGroupAddon>฿</InputGroupAddon>
      </InputGroup>,
    );
    const input = screen.getByRole("textbox", { name: "ค้นหา" });
    expect(input).toHaveAttribute("data-slot", "input-group-control");
    expect(input.closest('[data-slot="input-group"]')).toHaveTextContent("฿");
  });
});

describe("RadioGroup", () => {
  it("selects one option at a time", async () => {
    render(
      <RadioGroup defaultValue="cash" aria-label="วิธีชำระ">
        <label>
          <RadioGroupItem value="cash" /> เงินสด
        </label>
        <label>
          <RadioGroupItem value="transfer" /> โอน
        </label>
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
    await userEvent.click(radios[1]!);
    expect(radios[1]).toHaveAttribute("aria-checked", "true");
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
  });
});

describe("Combobox", () => {
  it("renders a combobox input", () => {
    render(
      <Combobox items={["บ้าน 12/1", "บ้าน 12/2"]}>
        <ComboboxInput aria-label="เลือกบ้าน" />
      </Combobox>,
    );
    expect(screen.getByRole("combobox", { name: "เลือกบ้าน" })).toBeInTheDocument();
  });
});

describe("Calendar", () => {
  it("shows Thai month names and Buddhist-era years", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 10, 1)} />);
    expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    expect(screen.getByText("พฤศจิกายน 2569")).toBeInTheDocument();
  });
});

describe("Popover", () => {
  it("opens from its trigger", async () => {
    render(
      <Popover>
        <PopoverTrigger render={<Button />}>รายละเอียด</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>บ้าน 12/1</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "รายละเอียด" });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByText("บ้าน 12/1")).toBeInTheDocument();
  });
});

describe("Alert", () => {
  it("is an alert with a variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>ชำระไม่สำเร็จ</AlertTitle>
        <AlertDescription>ลองอีกครั้ง</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "destructive");
    expect(alert).toHaveTextContent("ชำระไม่สำเร็จ");
  });
});

describe("Empty", () => {
  it("renders title and description", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>ยังไม่มีผู้เช่า</EmptyTitle>
          <EmptyDescription>เพิ่มผู้เช่าคนแรก</EmptyDescription>
        </EmptyHeader>
      </Empty>,
    );
    expect(screen.getByText("ยังไม่มีผู้เช่า").closest('[data-slot="empty"]')).toBeInTheDocument();
  });
});

describe("Spinner", () => {
  it("is a status for assistive tech", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("data-slot", "spinner");
  });
});

describe("Breadcrumb", () => {
  it("marks the current page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ผู้เช่า</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-slot", "breadcrumb");
    expect(screen.getByRole("link", { name: "หน้าแรก" })).toHaveAttribute("href", "/");
    expect(screen.getByText("ผู้เช่า")).toHaveAttribute("aria-current", "page");
  });
});

describe("Pagination", () => {
  it("marks the active page", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-slot", "pagination");
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
  });
});

describe("Drawer", () => {
  it("opens from its trigger", async () => {
    render(
      <Drawer>
        <DrawerTrigger render={<Button />}>เปิด</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>บันทึกการชำระ</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByRole("button", { name: "เปิด" }));
    expect(await screen.findByRole("dialog")).toHaveTextContent("บันทึกการชำระ");
  });
});

describe("ChartContainer", () => {
  it("writes each series colour as a CSS variable", () => {
    render(
      <ChartContainer config={{ rent: { label: "ค่าเช่า", color: "var(--chart-1)" } }}>
        <div />
      </ChartContainer>,
    );
    const chart = document.querySelector('[data-slot="chart"]');
    expect(chart).toBeInTheDocument();
    const css = chart?.querySelector("style")?.textContent ?? "";
    expect(css).toContain("--color-rent: var(--chart-1)");
    expect(css).toContain('[data-theme="dark"]');
  });
});

describe("Progress", () => {
  it("is a progressbar with its value", () => {
    render(<Progress value={40} aria-label="เก็บค่าเช่าแล้ว" />);
    const bar = screen.getByRole("progressbar", { name: "เก็บค่าเช่าแล้ว" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
  });
});

describe("Accordion", () => {
  it("expands a panel", async () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>ก๊อกน้ำรั่ว</AccordionTrigger>
          <AccordionContent>ช่างนัดวันพรุ่งนี้</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "ก๊อกน้ำรั่ว" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Toggle and ToggleGroup", () => {
  it("toggles pressed state", async () => {
    render(<Toggle aria-label="ตัวหนา">B</Toggle>);
    const toggle = screen.getByRole("button", { name: "ตัวหนา" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("passes variant to its items", () => {
    render(
      <ToggleGroup variant="outline" aria-label="มุมมอง">
        <ToggleGroupItem value="table">ตาราง</ToggleGroupItem>
        <ToggleGroupItem value="cards">การ์ด</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button", { name: "ตาราง" })).toHaveAttribute("data-variant", "outline");
  });
});

describe("ScrollArea", () => {
  it("renders its content in a viewport", () => {
    render(
      <ScrollArea>
        <p>รายการยาว</p>
      </ScrollArea>,
    );
    const viewport = document.querySelector('[data-slot="scroll-area-viewport"]');
    expect(viewport).toHaveTextContent("รายการยาว");
  });
});

describe("StatusBadge", () => {
  it.each([
    ["repair-pending", "warning", "รอซ่อม"],
    ["repair-in-progress", "outline", "กำลังซ่อม"],
    ["repair-done", "success", "ซ่อมเสร็จ"],
    ["repair-urgent", "destructive", "ด่วน"],
    ["overdue", "destructive", "ค้างชำระ"],
  ] as const)("%s → %s badge labelled %s", (status, variant, label) => {
    render(<StatusBadge status={status} />);
    const badge = screen.getByText(label);
    expect(badge).toHaveAttribute("data-status", status);
    expect(badge).toHaveAttribute("data-variant", variant);
  });

  it("accepts a custom label", () => {
    render(<StatusBadge status="overdue" label="ค้างชำระ 12 วัน" />);
    expect(screen.getByText("ค้างชำระ 12 วัน")).toBeInTheDocument();
  });
});

describe("Money", () => {
  it("formats baht in Thai", () => {
    expect(formatMoney(8500)).toBe("฿8,500");
    expect(formatMoney(8500, { display: "word" })).toBe("8,500 บาท");
    expect(formatMoney(-120.5, { fractionDigits: 2 })).toBe("−฿120.50");
  });

  it("flags negative amounts", () => {
    render(<Money value={-500} />);
    expect(screen.getByText("−฿500")).toHaveAttribute("data-negative", "true");
  });
});

describe("Card and StatCard", () => {
  it("renders Card parts", () => {
    render(
      <Card size="sm">
        <CardHeader>
          <CardTitle>สรุปเดือนนี้</CardTitle>
        </CardHeader>
        <CardContent>เนื้อหา</CardContent>
      </Card>,
    );
    const card = screen.getByText("สรุปเดือนนี้").closest('[data-slot="card"]');
    expect(card).toHaveAttribute("data-size", "sm");
  });

  it("shows label, value and description", () => {
    render(
      <StatCard label="ค้างชำระรวม" value={<Money value={12500} />} description="3 ราย" />,
    );
    const card = screen.getByText("ค้างชำระรวม").closest('[data-slot="stat-card"]');
    expect(card).toHaveTextContent("฿12,500");
    expect(card).toHaveTextContent("3 ราย");
  });
});

describe("DataTable", () => {
  type Row = { id: string; name: string; rent: number };
  const data: Row[] = [
    { id: "1", name: "สมชาย", rent: 8500 },
    { id: "2", name: "มาลี", rent: 6000 },
  ];
  const columns = [
    { key: "name", header: "ชื่อ", cell: (r: Row) => r.name, sortValue: (r: Row) => r.name },
    { key: "rent", header: "ค่าเช่า", cell: (r: Row) => r.rent, sortValue: (r: Row) => r.rent, align: "end" as const },
  ];

  it("renders a labelled table with one row per item", () => {
    render(<DataTable data={data} columns={columns} getRowId={(r) => r.id} label="รายการผู้เช่า" />);
    const table = screen.getByRole("table", { name: "รายการผู้เช่า" });
    // header row + 2 data rows
    expect(within(table).getAllByRole("row")).toHaveLength(3);
  });

  it("filters rows and shows the empty state", async () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        getRowId={(r) => r.id}
        label="รายการผู้เช่า"
        filters={[
          { value: "all", label: "ทั้งหมด" },
          { value: "none", label: "ไม่มี", predicate: () => false },
        ]}
        empty="ไม่พบรายการ"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /ไม่มี/ }));
    expect(screen.getByText("ไม่พบรายการ")).toBeInTheDocument();
  });
});

describe("ResponsiveDialog", () => {
  it("is a Dialog on desktop", async () => {
    render(
      <ResponsiveDialog>
        <ResponsiveDialogTrigger render={<Button />}>บันทึกการชำระ</ResponsiveDialogTrigger>
        <ResponsiveDialogContent>
          <ResponsiveDialogTitle>บันทึกการชำระ</ResponsiveDialogTitle>
        </ResponsiveDialogContent>
      </ResponsiveDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "บันทึกการชำระ" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
  });
});

describe("FileDropzone", () => {
  it("has a labelled file input", () => {
    const onFilesChange = vi.fn();
    render(
      <>
        <label htmlFor="photos">รูปภาพ</label>
        <FileDropzone id="photos" files={[]} onFilesChange={onFilesChange} />
      </>,
    );
    const input = screen.getByLabelText("รูปภาพ");
    expect(input).toHaveAttribute("type", "file");
    expect(input.closest('[data-slot="file-dropzone"]')).toBeInTheDocument();
  });
});

describe("Timeline", () => {
  it("renders an ordered list of events", () => {
    render(
      <Timeline>
        <TimelineItem title="ส่งเตือนทาง LINE" time="1 พ.ย." />
        <TimelineItem title="ชำระแล้ว" time="3 พ.ย." tone="success" />
      </Timeline>,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveAttribute("data-slot", "timeline");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("ButtonGroup", () => {
  it("is a group with orientation", () => {
    render(
      <ButtonGroup aria-label="ตัวเลือก" orientation="vertical">
        <Button>ก</Button>
        <Button>ข</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "ตัวเลือก" });
    expect(group).toHaveAttribute("data-orientation", "vertical");
  });
});
