import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@scope/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { pseudoByAttribute } from "./story-helpers";

const invoices = [
  { id: "INV-001", status: "ชำระแล้ว", method: "โอนเงิน", amount: 2500 },
  { id: "INV-002", status: "รอชำระ", method: "บัตรเครดิต", amount: 1500 },
  { id: "INV-003", status: "เกินกำหนด", method: "เงินสด", amount: 3500 },
  { id: "INV-004", status: "ชำระแล้ว", method: "โอนเงิน", amount: 4500 },
];
const total = invoices.reduce((sum, i) => sum + i.amount, 0);
const baht = (n: number) => n.toLocaleString("th-TH", { style: "currency", currency: "THB" });

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "padded" },
  argTypes: { className: { control: "text" } },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caption, header, body, footer and right-aligned money column (tabular numbers). */
export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>รายการใบแจ้งหนี้ล่าสุด</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">เลขที่</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>ช่องทาง</TableHead>
          <TableHead className="text-right">จำนวนเงิน</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge variant={invoice.status === "เกินกำหนด" ? "destructive" : "secondary"}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{baht(invoice.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>รวม</TableCell>
          <TableCell className="text-right">{baht(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(4);
    await expect(canvas.getByText(baht(total))).toBeInTheDocument();
  },
};

/** Row states: rest, hover (forced) and selected (`data-state="selected"`). */
export const RowStates: Story = {
  parameters: { pseudo: pseudoByAttribute },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>แถว</TableHead>
          <TableHead className="text-right">จำนวนเงิน</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>rest</TableCell>
          <TableCell className="text-right">{baht(1000)}</TableCell>
        </TableRow>
        <TableRow data-pseudo="hover">
          <TableCell>hover</TableCell>
          <TableCell className="text-right">{baht(2000)}</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>selected</TableCell>
          <TableCell className="text-right">{baht(3000)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
