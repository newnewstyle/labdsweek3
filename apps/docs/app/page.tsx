import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@scope/ui";

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
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
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size} variant="outline">
              size {size}
            </Button>
          ))}
          <Button nativeButton={false} render={<a href="https://base-ui.com" />}>
            render as link
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl">Badge</h2>
        <div className="flex flex-wrap items-center gap-2">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
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
