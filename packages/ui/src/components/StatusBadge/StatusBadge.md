# StatusBadge

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/StatusBadge`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `StatusBadge.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import จากแพ็กเกจ `@newnewstyle/ui`

   ```tsx
   import { StatusBadge } from "@newnewstyle/ui"
   ```

2. ใส่ `status` อย่างเดียว สี ไอคอน และข้อความมาเอง

   ```tsx
   <StatusBadge status="overdue" />
   ```

3. ต้องการข้อความละเอียดขึ้น ใส่ `label` (สีและไอคอนคงเดิม)

   ```tsx
   <StatusBadge status="overdue" label="ค้างชำระ 12 วัน" />
   ```

4. ถ้าต้องใช้ชนิดของสถานะ (เช่น ข้อมูลจาก API) import แบบ type หรืออ่านตาราง `STATUS`

   ```tsx
   import { STATUS, type StatusKey } from "@newnewstyle/ui"
   ```

---

## 4. Props and variants

**`status`** (ต้องใส่) เลือกจากตารางนี้

| กลุ่ม     | `status`             | ข้อความ        | ระดับ (Badge)  |
| --------- | -------------------- | -------------- | -------------- |
| บ้าน      | `vacant`             | ว่าง           | `outline`      |
| บ้าน      | `occupied`           | มีผู้เช่า      | `success`      |
| สัญญา     | `lease-ending`       | สัญญาใกล้หมด   | `warning`      |
| ค่าเช่า   | `paid`               | ชำระแล้ว       | `success`      |
| ค่าเช่า   | `due-soon`           | ใกล้ครบกำหนด   | `warning`      |
| ค่าเช่า   | `overdue`            | ค้างชำระ       | `destructive`  |
| งานซ่อม   | `repair-pending`     | รอซ่อม         | `warning`      |
| งานซ่อม   | `repair-in-progress` | กำลังซ่อม      | `outline`      |
| งานซ่อม   | `repair-done`        | ซ่อมเสร็จ      | `success`      |
| ความด่วน  | `repair-urgent`      | ด่วน           | `destructive`  |

**`label`** แทนข้อความเริ่มต้น เช่น `"ค้างชำระ 12 วัน"`

รับ props อื่นของ `Badge` ได้ (`render`, `className`) ยกเว้น `variant` และ `children` ซึ่ง StatusBadge กำหนดเอง ขนาดเท่า Badge: สูง 20px ไอคอน 12px

---

## 5. Tokens used

ใช้สีของ Badge ไม่มี token ของตัวเอง

| Token           | สว่าง                       | มืด                          | ใช้กับ                        |
| --------------- | --------------------------- | ---------------------------- | ----------------------------- |
| `--success`     | `oklch(0.47 0.13 150)`      | `oklch(0.76 0.15 150)`       | ระดับ `success`               |
| `--warning`     | `oklch(0.5 0.11 70)`        | `oklch(0.8 0.14 85)`         | ระดับ `warning`               |
| `--destructive` | `oklch(0.49 0.2 27.325)`    | `oklch(0.76 0.16 22.216)`    | ระดับ `destructive`           |
| `--border`      | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)`         | เส้นขอบระดับ `outline`        |
| `--foreground`  | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ตัวอักษรระดับ `outline`       |

---

## 6. Example

จาก story `RepairWithUrgency`:

```tsx
<li className="flex items-center justify-between gap-3">
  น้ำรั่วจากเพดานห้องน้ำ
  <span className="flex gap-1.5">
    <StatusBadge status="repair-urgent" />
    <StatusBadge status="repair-pending" />
  </span>
</li>
```
