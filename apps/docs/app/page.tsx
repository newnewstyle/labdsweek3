import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  type BadgeVariant,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  type ButtonVariant,
  Calendar,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Money,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Spinner,
  StatCard,
  StatusBadge,
  type StatusKey,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Timeline,
  TimelineItem,
  Toggle,
} from "@scope/ui";

const variants = [
  "default",
  "outline",
  "ghost",
  "destructive",
  "destructive-solid",
  "link",
] as const satisfies readonly ButtonVariant[];
const badgeVariants = [
  "default",
  "secondary",
  "success",
  "warning",
  "destructive",
  "outline",
] as const satisfies readonly BadgeVariant[];
const statuses = [
  "paid",
  "due-soon",
  "overdue",
  "repair-pending",
  "repair-in-progress",
  "repair-done",
  "repair-urgent",
] as const satisfies readonly StatusKey[];
const sizes = ["xs", "sm", "default", "lg"] as const;

function Showcase() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Button</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button disabled>disabled</Button>
          <Button loading>loading</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size} variant="outline">
              size {size}
            </Button>
          ))}
          <Button nativeButton={false} role="link" render={<a href="https://base-ui.com" />}>
            render as link
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Badge</h2>
        <div className="flex flex-wrap items-center gap-2">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
      </section>

      <section className="flex max-w-sm flex-col gap-3">
        <h2 className="text-xl">Form controls</h2>
        <Label htmlFor="email">อีเมล</Label>
        <Input id="email" type="email" placeholder="name@example.com" />
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">ยอมรับเงื่อนไข</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="notify" />
          <Label htmlFor="notify">แจ้งเตือน</Label>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Tabs, Dialog, Skeleton</h2>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">ภาพรวม</TabsTrigger>
            <TabsTrigger value="b">รายละเอียด</TabsTrigger>
          </TabsList>
          <TabsContent value="a">เนื้อหาแท็บภาพรวม</TabsContent>
          <TabsContent value="b">เนื้อหาแท็บรายละเอียด</TabsContent>
        </Tabs>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="w-fit" />}>
            เปิด Dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ยืนยันการบันทึก</DialogTitle>
              <DialogDescription>ตัวอย่าง Dialog จาก @scope/ui</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
              <DialogClose render={<Button />}>ตกลง</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Phase 2 (full demos in Storybook)</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">หน้าแรก</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ผู้เช่า</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard label="ค้างชำระรวม" value={<Money value={12500} />} description="3 ราย" />
          <StatCard label="เก็บค่าเช่าแล้ว" value="18 / 24" description={<Progress value={75} aria-label="เก็บแล้ว" />} />
        </div>
        <Alert>
          <AlertTitle>มีบิลค่าน้ำใหม่ 2 รายการ</AlertTitle>
          <AlertDescription>ตรวจสอบก่อนส่งให้ผู้เช่า</AlertDescription>
        </Alert>
        <div className="flex max-w-sm flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="rent">ค่าเช่า</FieldLabel>
            <InputGroup>
              <InputGroupAddon>฿</InputGroupAddon>
              <InputGroupInput id="rent" defaultValue="8,500" />
            </InputGroup>
            <FieldDescription>บาทต่อเดือน</FieldDescription>
          </Field>
          <RadioGroup defaultValue="cash" aria-label="วิธีชำระ">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="cash" id="pay-cash" />
              <Label htmlFor="pay-cash">เงินสด</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="transfer" id="pay-transfer" />
              <Label htmlFor="pay-transfer">โอน</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-3">
          <Spinner />
          <Toggle aria-label="ปักหมุด">ปักหมุด</Toggle>
        </div>
        <Accordion className="max-w-md">
          <AccordionItem value="a">
            <AccordionTrigger>ก๊อกน้ำห้องครัวรั่ว</AccordionTrigger>
            <AccordionContent>ช่างนัดเข้าวันพรุ่งนี้ 10:00</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Timeline>
          <TimelineItem title="ส่งเตือนทาง LINE" time="1 พ.ย." />
          <TimelineItem title="ชำระแล้ว" time="3 พ.ย." tone="success" />
        </Timeline>
        <Calendar mode="single" className="w-fit rounded-lg border" />
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>ยังไม่มีงานซ่อม</EmptyTitle>
            <EmptyDescription>งานซ่อมที่ผู้เช่าแจ้งจะแสดงที่นี่</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    </div>
  );
}

// Server Component on purpose: verifies @scope/ui (a "use client" bundle) renders under the App Router.
export default function Home() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 p-8">
      <h1 className="text-3xl">@scope/ui</h1>
      <Showcase />
      <Separator />
      <div data-theme="dark" className="rounded-xl bg-background p-8 text-foreground">
        <p className="mb-6 text-sm text-muted-foreground">data-theme=&quot;dark&quot;</p>
        <Showcase />
      </div>
    </main>
  );
}
