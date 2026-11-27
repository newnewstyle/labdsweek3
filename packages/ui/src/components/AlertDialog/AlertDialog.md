# AlertDialog

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/AlertDialog`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `AlertDialog.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import ชิ้นส่วนที่ใช้จากแพ็กเกจ `@newnewstyle/ui` พร้อม `Button` สำหรับตัวเปิด

   ```tsx
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
   } from "@newnewstyle/ui"
   ```

2. ประกอบตามลำดับ: ตัวเปิด → กล่อง → หัว (คำถาม + ผลที่ตามมา) → ส่วนท้าย ("ยกเลิก" ก่อน ปุ่มยืนยันหลัง)

3. ยืนยันการลบ ใส่ `variant="destructive-solid"` ที่ `AlertDialogAction` เสมอ ถ้าไม่ใส่จะได้ปุ่มสีหลัก (ส้ม)

   ```tsx
   <AlertDialog>
     <AlertDialogTrigger render={<Button variant="destructive" />}>
       ลบบ้าน
     </AlertDialogTrigger>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>ลบบ้านเลขที่ 12/3?</AlertDialogTitle>
         <AlertDialogDescription>
           ข้อมูลสัญญาและประวัติการชำระของบ้านหลังนี้จะถูกลบด้วย
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
         <AlertDialogAction variant="destructive-solid" onClick={deleteHouse}>
           ลบ
         </AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
   ```

4. ยืนยันเรื่องที่ไม่ใช่การลบ (ออกจากระบบ) ไม่ต้องใส่ `variant` และใช้ `size="sm"` ได้เมื่อมีแค่คำถามสั้นๆ

---

## 4. Props and variants

**ชิ้นส่วน**

| ชิ้นส่วน                  | ใช้ทำอะไร                                                                 |
| ------------------------- | ------------------------------------------------------------------------- |
| `AlertDialog`             | ครอบทั้งหมด `defaultOpen` / `open` + `onOpenChange` สำหรับเปิดจากโค้ด      |
| `AlertDialogTrigger`      | ตัวเปิด ใช้ `render={<Button variant="…" />}` ให้หน้าตาเป็นปุ่ม           |
| `AlertDialogContent`      | กล่องกลางจอ มีพื้นหลังบังหน้าหลักมาเอง รับ `size`                         |
| `AlertDialogHeader`       | ห่อหัวเรื่อง คำอธิบาย และไอคอน                                            |
| `AlertDialogMedia`        | ไอคอนเหนือหัวเรื่อง (ไม่บังคับ) กรอบเทา 40px ไอคอน 24px                    |
| `AlertDialogTitle`        | คำถาม ตัวหนา 16px                                                         |
| `AlertDialogDescription`  | ผลที่ตามมา ตัวเทา 14px                                                    |
| `AlertDialogFooter`       | แถบปุ่มท้ายกล่อง พื้นเทาอ่อน มีเส้นคั่นด้านบน                              |
| `AlertDialogCancel`       | ปิดกล่องโดยไม่ทำอะไร `outline` เป็นค่าเริ่มต้น รับ `variant` และ `size`   |
| `AlertDialogAction`       | ปุ่มยืนยัน รับ props ของ `Button` ทั้งหมด **ค่าเริ่มต้นสีหลัก** ใส่ `onClick` ทำงาน |

**`variant` ของ `AlertDialogAction`** (ค่าเดียวกับ Button)

| ใช้เมื่อ                     | `variant`             | หน้าตา                    |
| ---------------------------- | --------------------- | ------------------------- |
| ลบ หรือย้อนกลับไม่ได้        | `destructive-solid`   | พื้นแดงทึบ ตัวขาว         |
| ยืนยันเรื่องอื่น             | ไม่ใส่ (`default`)    | พื้นสีแบรนด์ (ส้ม)        |

**`size`** ของ `AlertDialogContent` ค่าเริ่มต้น `default`

| size      | หน้าตา                                                                                        |
| --------- | --------------------------------------------------------------------------------------------- |
| `default` | กว้างสูงสุด 384px ตั้งแต่จอกลาง (มือถือ 320px) ข้อความชิดซ้าย ไอคอนอยู่ข้างหัวเรื่อง ปุ่มชิดขวา |
| `sm`      | กว้างสูงสุด 320px ข้อความกึ่งกลาง ปุ่มสองปุ่มกว้างเท่ากัน                                       |

**สิ่งที่เกิดเอง:** คลิกพื้นหลังแล้วไม่ปิด Esc ปิดได้ เปิดแล้ว focus ไปที่ "ยกเลิก" บนมือถือปุ่มเรียงเป็นแนวตั้ง ปุ่มยืนยันอยู่บน

---

## 5. Tokens used

| Token                      | สว่าง                       | มืด                          | ใช้กับ                                |
| -------------------------- | --------------------------- | ---------------------------- | ------------------------------------- |
| `--popover`                | `oklch(1 0 0)`              | `oklch(0.216 0.006 56.043)`  | พื้นกล่อง                             |
| `--popover-foreground`     | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ตัวอักษรในกล่อง                       |
| `--foreground`             | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | เส้นขอบกล่อง (ความทึบ 10%)            |
| `--muted`                  | `oklch(0.97 0.001 106.424)` | `oklch(0.268 0.007 34.298)`  | พื้นส่วนท้าย (50%), กรอบไอคอน        |
| `--muted-foreground`       | `oklch(0.54 0.013 58.071)`  | `oklch(0.709 0.01 56.259)`   | คำอธิบาย                              |
| `--border`                 | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)`         | เส้นคั่นส่วนท้าย                      |
| `--overlay`                | `oklch(0 0 0 / 10%)`        | `oklch(0 0 0 / 50%)`         | พื้นหลังที่ถูกบัง                     |
| `--destructive`            | `oklch(0.49 0.2 27.325)`    | `oklch(0.76 0.16 22.216)`    | พื้นปุ่ม `destructive-solid`          |
| `--destructive-foreground` | `oklch(0.985 0 0)`          | `oklch(0.205 0 0)`           | ตัวอักษรปุ่ม `destructive-solid`      |
| `--radius`                 | `0.625rem` (10px)           | –                            | มุมโค้งของกล่อง: `--radius-xl` = `--radius` × 1.4 = 14px |

contrast (สว่าง / มืด คำนวณจากค่า token): หัวเรื่อง 19.75 / 16.76, คำอธิบาย 5.08 / 6.76, ปุ่ม `destructive-solid` 6.66 / 7.53

---

## 6. Example

จาก story `Open`:

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    ลบรายการ
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>ลบรายการนี้ใช่ไหม</AlertDialogTitle>
      <AlertDialogDescription>ย้อนกลับไม่ได้ รายการจะถูกลบถาวร</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
      <AlertDialogAction variant="destructive-solid">ลบ</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
