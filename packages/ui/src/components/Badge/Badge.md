# Badge

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Badge`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `Badge.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import จากแพ็กเกจ `@newnewstyle/ui` และไอคอนจาก `lucide-react`

   ```tsx
   import { Badge } from "@newnewstyle/ui"
   import { CircleCheckIcon } from "lucide-react"
   ```

2. เลือกระดับสถานะจากตารางใน "When to use" แล้วใส่**ไอคอน + ข้อความ**เสมอ ไอคอนใส่ `aria-hidden`

   ```tsx
   <Badge variant="success">
     <CircleCheckIcon data-icon="inline-start" aria-hidden />
     ชำระแล้ว
   </Badge>
   ```

3. ป้ายหมวดหมู่ (ไม่ใช่สถานะ) ใช้ `secondary` ไม่ต้องมีไอคอน

   ```tsx
   <Badge variant="secondary">ทาวน์เฮาส์</Badge>
   ```

---

## 4. Props and variants

**`variant`** ค่าเริ่มต้น `default`

| variant       | หน้าตา                      | contrast ตัวอักษร (สว่าง / มืด) |
| ------------- | --------------------------- | ------------------------------- |
| `default`     | พื้นสีแบรนด์ (ส้ม) ตัวขาว (โหมดมืด: ส้มสว่าง ตัวเข้ม) | 4.87 / 7.00 |
| `secondary`   | พื้นเทาอ่อน ตัวเข้ม         | 16.11 / 14.26                   |
| `outline`     | ไม่มีพื้น มีเส้นขอบเทา      | 19.75 / 16.76                   |
| `success`     | พื้นเขียวอ่อน ตัวเขียวเข้ม  | 5.52 / 5.78                     |
| `warning`     | พื้นเหลืองอ่อน ตัวอำพันเข้ม | 5.33 / 6.05                     |
| `destructive` | พื้นแดงอ่อน ตัวแดงเข้ม      | 5.76 / 5.14                     |

ค่า contrast คำนวณจากค่า token บนพื้น Card ทุกค่าผ่านเกณฑ์ WCAG AA (4.5:1) Badge ที่เป็นลิงก์ตอนชี้เมาส์ พื้นสถานะเข้มขึ้นเป็น 20% (มืด 30%): `success` 4.71, `warning` 4.58, `destructive` 4.72 (โหมดสว่าง) ยังผ่าน

**ทำเป็นลิงก์** ใส่ `render={<a href="…" />}` Badge จะเป็นลิงก์ ตอนชี้เมาส์สีพื้นจะเปลี่ยนเล็กน้อย และกด Tab มาถึงจะมีวง focus

**ขนาด** ไม่มีให้เลือก ทุก Badge สูง 20px ตัวอักษรเล็ก มุมโค้งเต็ม ไอคอนขนาด 12px

**สิ่งที่ต้องใส่เองตอนใช้** ไอคอนคู่ข้อความ ใส่ `data-icon="inline-start"` (ไอคอนอยู่หน้า) หรือ `"inline-end"` (อยู่หลัง) บนไอคอน ป้ายจะปรับระยะขอบฝั่งนั้นให้สมดุล และไอคอนสถานะใส่ `aria-hidden` เพราะข้อความบอกความหมายครบแล้ว

---

## 5. Tokens used

| Token                    | สว่าง                        | มืด                          | ใช้กับ                                |
| ------------------------ | ---------------------------- | ---------------------------- | ------------------------------------- |
| `--primary`              | `oklch(0.555 0.163 48.998)`  | `oklch(0.7 0.155 46.201)`    | พื้น `default`                        |
| `--primary-foreground`   | `oklch(0.987 0.022 95.277)`  | `oklch(0.147 0.004 49.25)`   | ตัวอักษร `default`                    |
| `--secondary`            | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้น `secondary`                      |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)`  | `oklch(0.985 0 0)`           | ตัวอักษร `secondary`                  |
| `--success`              | `oklch(0.47 0.13 150)`       | `oklch(0.76 0.15 150)`       | `success`                             |
| `--warning`              | `oklch(0.5 0.11 70)`         | `oklch(0.8 0.14 85)`         | `warning`                             |
| `--destructive`          | `oklch(0.49 0.2 27.325)`     | `oklch(0.76 0.16 22.216)`    | `destructive`                         |
| `--border`               | `oklch(0.923 0.003 48.717)`  | `oklch(1 0 0 / 10%)`         | เส้นขอบ `outline`                     |
| `--foreground`           | `oklch(0.147 0.004 49.25)`   | `oklch(0.985 0.001 106.423)` | ตัวอักษร `outline`                    |
| `--muted`                | `oklch(0.97 0.001 106.424)`  | `oklch(0.268 0.007 34.298)`  | พื้นตอนชี้ `outline` ที่เป็นลิงก์     |
| `--muted-foreground`     | `oklch(0.54 0.013 58.071)`   | `oklch(0.709 0.01 56.259)`   | ตัวอักษรตอนชี้ `outline` ที่เป็นลิงก์ |
| `--ring`                 | `oklch(0.709 0.01 56.259)`   | `oklch(0.553 0.013 58.071)`  | วง focus                              |

`--success`, `--warning` และ `--destructive` เป็นสีสถานะของทั้งระบบ ไม่ได้เป็นของ Badge อย่างเดียว

---

## 6. Example

จาก story `Status` (ตัดมา 4 จาก 6 สถานะ):

```tsx
<Badge variant="success">
  <CircleCheckIcon data-icon="inline-start" aria-hidden />
  ชำระแล้ว
</Badge>
<Badge variant="outline">
  <CircleDashedIcon data-icon="inline-start" aria-hidden />
  ว่าง
</Badge>
<Badge variant="warning">
  <ClockIcon data-icon="inline-start" aria-hidden />
  ใกล้ครบกำหนด
</Badge>
<Badge variant="destructive">
  <CircleAlertIcon data-icon="inline-start" aria-hidden />
  ค้างชำระ
</Badge>
```
