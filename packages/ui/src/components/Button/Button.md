# Button

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Button`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `Button.spec.ts`** ไฟล์นี้เก็บเฉพาะ props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import จากแพ็กเกจ `@newnewstyle/ui` เสมอ (ไม่ import จากไฟล์ภายในแพ็กเกจ)

   ```tsx
   import { Button } from "@newnewstyle/ui"
   ```

2. ใส่ข้อความเป็นคำกริยา แล้วเลือก `variant` และ `size` ตามกฎใน "When to use" ถ้าไม่ใส่จะได้ `default` ทั้งคู่

   ```tsx
   <Button variant="outline">ยกเลิก</Button>
   <Button type="submit" loading={pending}>
     บันทึก
   </Button>
   ```

3. ถ้าต้องใช้ชนิดข้อมูลของ prop (เช่น สร้างรายการ variant) import แบบ type จากที่เดียวกัน

   ```tsx
   import type { ButtonVariant } from "@newnewstyle/ui"
   ```

4. ปุ่มที่พาไปหน้าอื่น ทำเป็นลิงก์ ใส่ครบ 3 อย่าง: `render`, `nativeButton={false}` และ `role="link"`

   ```tsx
   import Link from "next/link"

   ;<Button
     nativeButton={false}
     role="link"
     render={<Link href="/dashboard" />}
   >
     ไปหน้าภาพรวม
   </Button>
   ```

5. ปรับหน้าตาเฉพาะจุดด้วย `className` เช่น `className="w-full"` ส่วนสีให้เปลี่ยนที่ token ไม่ใช่ใส่สีเอง

---

## 4. Props and variants

**`variant`** ค่าเริ่มต้น `default`

| variant             | หน้าตา                                                                  | contrast ตัวอักษร (สว่าง / มืด) |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------- |
| `default`           | พื้นสีแบรนด์ (ส้ม) ตัวขาว (โหมดมืด: ส้มสว่าง ตัวเข้ม)                   | 4.87 / 7.00                     |
| `outline`           | พื้นขาว เส้นขอบเทา                                                      | –                               |
| `ghost`             | ไม่มีพื้นและขอบ มีพื้นเทาตอนชี้เมาส์                                    | –                               |
| `destructive`       | พื้นแดงอ่อน ตัวแดงเข้ม                                                  | 5.76 / 6.09                     |
| `destructive-solid` | พื้นแดงทึบ ตัวขาว (โหมดมืด: ตัวเข้ม)                                    | 6.66 / 7.53                     |
| `link`              | ตัวสีลิงก์ (ส้ม) ไม่มีพื้น ขีดเส้นใต้ตอนชี้เมาส์ ไม่มีความสูงและระยะขอบ | 5.05 / 7.07                     |

`outline` และ `ghost` ใช้ตัวอักษรสีหลักบนพื้นขาวหรือเทาอ่อน อ่านง่ายมาก จึงไม่ได้วัดแยก ตอนชี้เมาส์ `destructive` เป็น 4.72 / 4.85 (คำนวณจากค่า token) และ `default` เข้มขึ้น (โหมดมืด: สว่างขึ้น) ได้ 5.75 / 7.89 (วัดในเบราว์เซอร์)

**`size`** ค่าเริ่มต้น `default`

| size      | ขนาด                | ใช้กับ                   |
| --------- | ------------------- | ------------------------ |
| `xs`      | สูง 24px ตัวเล็กสุด | ปุ่มในพื้นที่แน่นมาก     |
| `sm`      | สูง 28px            | ปุ่มในตาราง หรือ toolbar |
| `default` | สูง 32px            | ปุ่มทั่วไป               |
| `lg`      | สูง 36px            | ปุ่มหลักในฟอร์มแคบ       |
| `icon-xs` | 24×24               | ปุ่มไอคอนเล็กสุด         |
| `icon-sm` | 28×28               | ปุ่มไอคอนในตาราง         |
| `icon`    | 32×32               | ปุ่มไอคอนทั่วไป          |
| `icon-lg` | 36×36               | ปุ่มไอคอนใหญ่            |

`link` ไม่สนใจความสูงของ size ใช้แค่ขนาดตัวอักษร

**`loading`** ค่าเริ่มต้น ไม่หมุน ใส่แล้วปุ่มจะมีไอคอนหมุนนำหน้า กดซ้ำไม่ได้ และบอกโปรแกรมอ่านหน้าจอว่ากำลังทำงาน ปุ่มไอคอนจะหมุนแทนไอคอนเดิม

**`disabled`** ปุ่มจางลงครึ่งหนึ่งและกดไม่ได้

**สิ่งที่ต้องใส่เองตอนใช้**

- **ไอคอนคู่ข้อความ:** ใส่ `data-icon="inline-start"` (ไอคอนอยู่หน้า) หรือ `"inline-end"` (อยู่หลัง) บนไอคอน ปุ่มจะปรับระยะขอบฝั่งนั้นให้สมดุล
- **ปุ่มที่มีแต่ไอคอน:** ต้องมี `aria-label` ภาษาไทยเสมอ เช่น `aria-label="แก้ไข"`
- **ทำปุ่มเป็นลิงก์:** `render={<Link href="…" />}` คู่กับ `nativeButton={false}` และ `role="link"` (ดูตัวอย่างใน story `AsLink`)

**สถานะอื่นที่เกิดเอง:** กด Tab มาถึงจะมีวง focus (ปุ่มแดงใช้วงสีแดง), ตอนกดปุ่มเลื่อนลง 1px, ตอนเป็นตัวเปิดเมนูที่เปิดอยู่ `outline` กับ `ghost` จะค้างสีพื้นไว้

---

## 5. Tokens used

| Token                      | สว่าง                       | มืด                          | ใช้กับ                              |
| -------------------------- | --------------------------- | ---------------------------- | ----------------------------------- |
| `--primary`                | `oklch(0.555 0.163 48.998)` | `oklch(0.7 0.155 46.201)`    | พื้น `default`                      |
| `--primary-foreground`     | `oklch(0.987 0.022 95.277)` | `oklch(0.147 0.004 49.25)`   | ตัวอักษร `default`                  |
| `--link`                   | `oklch(0.555 0.163 48.998)` | `oklch(0.7 0.15 55)`         | ตัวอักษร `link`                     |
| `--background`             | `oklch(1 0 0)`              | `oklch(0.147 0.004 49.25)`   | พื้น `outline`                      |
| `--border`                 | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)`         | เส้นขอบ `outline` (สว่าง)           |
| `--input`                  | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 15%)`         | เส้นขอบและพื้น `outline` (มืด)      |
| `--muted`                  | `oklch(0.97 0.001 106.424)` | `oklch(0.268 0.007 34.298)`  | พื้นตอนชี้ `outline` / `ghost`      |
| `--foreground`             | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ตัวอักษรตอนชี้                      |
| `--destructive`            | `oklch(0.49 0.2 27.325)`    | `oklch(0.76 0.16 22.216)`    | `destructive`, `destructive-solid`  |
| `--destructive-foreground` | `oklch(0.985 0 0)`          | `oklch(0.205 0 0)`           | ตัวอักษร `destructive-solid`        |
| `--ring`                   | `oklch(0.709 0.01 56.259)`  | `oklch(0.553 0.013 58.071)`  | วง focus                            |
| `--radius`                 | `0.625rem` (10px)           | –                            | มุมโค้งของปุ่ม `default` / `lg` / `icon` / `icon-lg` (ขนาด `xs` / `sm` / `icon-xs` / `icon-sm` ใช้ `--radius-md` = `--radius` × 0.8 = 8px) |

---

## 6. Example

จาก story `WithIcon`:

```tsx
<Button>
  <PlusIcon data-icon="inline-start" />
  เพิ่มบ้านเช่า
</Button>
<Button variant="destructive">
  <Trash2Icon data-icon="inline-start" />
  ลบผู้เช่า
</Button>
```
