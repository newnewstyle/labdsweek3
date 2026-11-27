# Field

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Field`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `Field.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import ชิ้นส่วนที่ใช้จากแพ็กเกจ `@newnewstyle/ui` พร้อมช่องกรอก

   ```tsx
   import {
     Field,
     FieldDescription,
     FieldError,
     FieldLabel,
     Input,
   } from "@newnewstyle/ui"
   ```

2. ช่องเดียว: ป้าย → ช่อง → คำอธิบาย ไม่ต้องใส่ `id`, `htmlFor` หรือ `aria-describedby` Field ผูกให้เอง

   ```tsx
   <Field>
     <FieldLabel>เบอร์โทรผู้เช่า</FieldLabel>
     <Input inputMode="tel" />
     <FieldDescription>ใช้ส่ง SMS เตือนค่าเช่า</FieldDescription>
   </Field>
   ```

3. ตอนกรอกผิด ใส่ `data-invalid` ที่ Field แล้วแทนคำอธิบายด้วย `FieldError` ช่องได้ `aria-invalid` เอง

   ```tsx
   <Field data-invalid>
     <FieldLabel>เบอร์โทรผู้เช่า</FieldLabel>
     <Input inputMode="tel" />
     <FieldError>เบอร์โทรต้องมี 10 หลัก</FieldError>
   </Field>
   ```

4. หลายช่องที่เป็นเรื่องเดียวกัน ครอบด้วย `FieldSet` + `FieldLegend` + `FieldGroup` (import เพิ่มจากที่เดียวกัน)

---

## 4. Props and variants

**ชิ้นส่วน**

| ชิ้นส่วน           | ใช้ทำอะไร                                                                 |
| ------------------ | ------------------------------------------------------------------------- |
| `Field`            | ครอบช่องหนึ่งช่อง (`role="group"`)                                       |
| `FieldLabel`       | ป้ายของช่อง ใน Field ชี้ไปที่ช่องเอง (ใส่ `htmlFor` เมื่ออยู่นอก Field) ถ้าห่อ `Field` ทั้งก้อนจะกลายเป็นการ์ดตัวเลือก |
| `FieldContent`     | ห่อป้าย + คำอธิบาย เมื่อวางข้างสวิตช์หรือ checkbox                       |
| `FieldTitle`       | หัวข้อในการ์ดตัวเลือก                                                     |
| `FieldDescription` | คำอธิบายใต้ช่อง ตัวเทา                                                    |
| `FieldError`       | ข้อความผิด ตัวแดง `role="alert"` รับ `children` หรือ `errors` (รายการจาก form library ซ้ำจะถูกตัด หลายข้อเป็นรายการจุด) |
| `FieldSet` / `FieldLegend` | ครอบหลายช่องพร้อมหัวข้อ `FieldLegend variant` = `legend` (ใหญ่ ค่าเริ่มต้น) หรือ `label` (เท่าป้าย) |
| `FieldGroup`       | เรียงหลายช่องห่างกัน 20px                                                  |
| `FieldSeparator`   | เส้นคั่นหมวด ใส่ข้อความตรงกลางได้                                         |

**`orientation`** ของ `Field` ค่าเริ่มต้น `vertical`

| orientation  | หน้าตา                                                         |
| ------------ | -------------------------------------------------------------- |
| `vertical`   | ป้ายอยู่บน ช่องเต็มความกว้าง                                   |
| `horizontal` | ป้ายอยู่ข้างตัวควบคุม (สวิตช์, checkbox, ปุ่ม)                 |
| `responsive` | ซ้อนกันเมื่อ `FieldGroup` แคบ วางข้างกันเมื่อกว้างตั้งแต่ 28rem |

**Field ผูกให้เอง** ช่องกรอกของแพ็กเกจที่อยู่ใน Field (`Input`, `Textarea`, `Checkbox`, `Switch`, `SelectTrigger`, ช่องใน `InputGroup` และ `Combobox`) ได้ `id` ที่ `FieldLabel` ชี้ไป, `aria-describedby` ชี้ไปที่คำอธิบายและข้อความผิดที่แสดงอยู่ (คำอธิบายก่อน) และ `aria-invalid` เมื่อ Field มี `data-invalid` ถ้าใส่ค่าเหล่านี้เอง ค่าที่ใส่ชนะ ถ้า Field มีหลายช่อง (เช่นวันเริ่ม–สิ้นสุด) ป้ายชี้ไปที่ช่องแรก ช่องที่เหลือได้คำอธิบายและ `aria-invalid` เหมือนกันแต่ไม่ได้ id ที่ซ้ำ ใส่ `aria-label` ให้ช่องเหล่านั้นเอง

**RadioGroup ใน Field** ตัวกลุ่มได้ชื่อจาก `FieldLabel` (ผ่าน `aria-labelledby` เพราะกลุ่มไม่ใช่ช่องกรอก) และได้คำอธิบายกับ `aria-invalid` จาก Field ส่วนแต่ละตัวเลือกห่อด้วย `Field` ของตัวเอง (หรือการ์ดตัวเลือก) แล้ว `RadioGroupItem` ผูกกับป้ายและคำอธิบายของตัวเลือกนั้นเอง ไม่ต้องใส่ id

```tsx
<Field data-invalid>
  <FieldLabel>ช่องทางส่งเตือน</FieldLabel>
  <RadioGroup>
    <Field orientation="horizontal">
      <RadioGroupItem value="line" />
      <FieldLabel>LINE</FieldLabel>
    </Field>
  </RadioGroup>
  <FieldError>เลือกช่องทางส่งเตือน</FieldError>
</Field>
```

**สิ่งที่ต้องใส่เองตอนใช้**

- `data-invalid` ที่ `Field` ตอนผิด: ป้ายเป็นสีแดง ช่องขอบแดง
- `data-disabled` ที่ `Field` ตอนปิดช่อง: ป้ายจางลง (ใส่ `disabled` ที่ช่องด้วย)

---

## 5. Tokens used

| Token                | สว่าง                       | มืด                          | ใช้กับ                               |
| -------------------- | --------------------------- | ---------------------------- | ------------------------------------ |
| `--foreground`       | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ป้าย                                 |
| `--muted-foreground` | `oklch(0.54 0.013 58.071)`  | `oklch(0.709 0.01 56.259)`   | คำอธิบาย, ข้อความใน `FieldSeparator` |
| `--destructive`      | `oklch(0.49 0.2 27.325)`    | `oklch(0.76 0.16 22.216)`    | ข้อความผิด, ป้ายตอนผิด               |
| `--border`           | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)`         | ขอบการ์ดตัวเลือก, เส้นคั่น           |
| `--primary`          | `oklch(0.555 0.163 48.998)` | `oklch(0.7 0.155 46.201)`    | การ์ดตัวเลือกที่ถูกเลือก (ขอบ 30% พื้น 5%) |
| `--ring`             | `oklch(0.709 0.01 56.259)`  | `oklch(0.553 0.013 58.071)`  | วง focus ของการ์ดตัวเลือก           |

contrast (สว่าง / มืด บนพื้นหลัง คำนวณจากค่า token): ป้าย 19.75 / 18.92, คำอธิบาย 5.08 / 7.63, ข้อความผิด 6.95 / 8.31

---

## 6. Example

จาก story `Invalid`:

```tsx
<Field data-invalid>
  <FieldLabel>เบอร์โทรผู้เช่า</FieldLabel>
  <Input inputMode="tel" placeholder="081-234-5678" />
  <FieldError>เบอร์โทรต้องมี 10 หลัก</FieldError>
</Field>
```
