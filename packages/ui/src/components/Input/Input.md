# Input

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Input`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `Input.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import จากแพ็กเกจ `@newnewstyle/ui` พร้อมป้าย

   ```tsx
   import { Input, Label } from "@newnewstyle/ui"
   ```

2. ผูกป้ายกับช่องด้วย `htmlFor` และ `id` เดียวกัน เลือก `type` / `inputMode` ตามข้อมูล

   ```tsx
   <Label htmlFor="email">อีเมล</Label>
   <Input id="email" type="email" autoComplete="email" placeholder="name@example.com" />
   ```

3. ในฟอร์ม ใช้ใน `Field` แทน: ไม่ต้องใส่ `id` / `htmlFor` เพราะ Field ผูกป้าย คำอธิบาย และข้อความผิดให้เอง ดูเอกสาร Field

---

## 4. Props and variants

รับ props ทั้งหมดของ `<input>` (ผ่าน Base UI Input) ไม่มี variant หรือ size ให้เลือก

| prop             | ผล                                                                      |
| ---------------- | ----------------------------------------------------------------------- |
| `type`           | `text` (ค่าเริ่มต้น), `email`, `password`, `tel`, `url`, `search`, `file` … |
| `inputMode`      | แป้นพิมพ์บนมือถือ เช่น `numeric`, `tel` โดยไม่เปลี่ยนชนิดข้อมูล        |
| `disabled`       | จางลง 50% พื้นเทา กดไม่ได้                                             |
| `aria-invalid`   | ขอบแดงและวงแดงจาง                                                       |
| `placeholder`    | ตัวอย่างรูปแบบ สีเทา                                                     |
| `className`      | ปรับเฉพาะจุด เช่น ความกว้าง                                             |

**ขนาด** สูง 32px เต็มความกว้างของที่วาง มุมโค้ง 10px (`--radius`) ตัวอักษร 16px บนมือถือ 14px ตั้งแต่จอกลาง

**`type="file"`** ปุ่มเลือกไฟล์ในช่องใช้ตัวอักษรขนาดเล็กเท่ากัน (ถ้าเป็นรูป ใช้ `FileDropzone` ที่มีภาพตัวอย่าง)

---

## 5. Tokens used

| Token                | สว่าง                       | มืด                          | ใช้กับ                                      |
| -------------------- | --------------------------- | ---------------------------- | ------------------------------------------- |
| `--input`            | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 15%)`         | ขอบช่อง, พื้นตอนปิด (มืด: พื้นช่อง 30%)     |
| `--foreground`       | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ข้อความที่กรอก                              |
| `--muted-foreground` | `oklch(0.54 0.013 58.071)`  | `oklch(0.709 0.01 56.259)`   | placeholder                                 |
| `--ring`             | `oklch(0.709 0.01 56.259)`  | `oklch(0.553 0.013 58.071)`  | ขอบและวง focus (วงความทึบ 50%)              |
| `--destructive`      | `oklch(0.49 0.2 27.325)`    | `oklch(0.76 0.16 22.216)`    | ขอบและวงตอน `aria-invalid`                  |

contrast (สว่าง / มืด คำนวณจากค่า token): ข้อความ 19.75 / 18.92, placeholder 5.08 / 7.03, ขอบปกติ 1.26 / 1.48 (ไม่ถึง 3:1 ดู spec)

---

## 6. Example

จาก story `WithLabel`:

```tsx
<div className="flex flex-col gap-2">
  <Label htmlFor="email">อีเมล</Label>
  <Input id="email" type="email" placeholder="name@example.com" />
</div>
```
