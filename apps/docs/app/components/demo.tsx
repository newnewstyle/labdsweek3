"use client";

// Ported from my-app-2 src/components/new-components-demo.tsx (+ Sheet and Tooltip from its
// playground) so the package's components can be compared side by side with the original app.
import { HomeIcon, InboxIcon, SettingsIcon } from "lucide-react";
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
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  toast,
} from "@newnewstyle/ui";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
];

const students = [
  { name: "Somchai", score: 85, grade: "A" },
  { name: "Malee", score: 78, grade: "B+" },
  { name: "Niran", score: 66, grade: "C+" },
];

const menu = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Settings", icon: SettingsIcon },
];

export function ComponentsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="font-medium">Select</h2>
        <Select items={fruits} defaultValue="apple">
          <SelectTrigger className="mt-2 w-48">
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
      </section>

      <section>
        <h2 className="font-medium">Textarea</h2>
        <Textarea className="mt-2" placeholder="Type your message here..." />
      </section>

      <section>
        <h2 className="font-medium">Sonner (toast)</h2>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => toast.success("Saved successfully!")}
        >
          Show toast
        </Button>
      </section>

      <section>
        <h2 className="font-medium">Tooltip</h2>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" className="mt-2" />}>
            Hover me
          </TooltipTrigger>
          <TooltipContent>Hello from Tooltip!</TooltipContent>
        </Tooltip>
      </section>

      <section>
        <h2 className="font-medium">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" className="mt-2" />}>
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section>
        <h2 className="font-medium">Alert Dialog</h2>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" className="mt-2" />}>
            Delete item
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone. The item will be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast("Item deleted")}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section>
        <h2 className="font-medium">Sheet</h2>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" className="mt-2" />}>
            Open sheet
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
              <SheetDescription>Content slides in from the right.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>

      <section>
        <h2 className="font-medium">Table</h2>
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.name}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.score}</TableCell>
                <TableCell>{s.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section>
        <h2 className="font-medium">Sidebar</h2>
        <div className="mt-2 h-48 overflow-hidden rounded-xl border">
          <SidebarProvider className="h-full min-h-0">
            <Sidebar collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>My App</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menu.map((item, i) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton isActive={i === 0}>
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </div>
      </section>
    </div>
  );
}
