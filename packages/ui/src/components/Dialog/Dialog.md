# Dialog

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Dialog` · เทียบกับแนวทางของ WAI-ARIA, Atlassian, Carbon, Primer, Polaris, Apple และ NN/g (แหล่งอ้างอิงท้ายไฟล์)

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `Dialog.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import ชิ้นส่วนที่ใช้จากแพ็กเกจ `@scope/ui` (ทุกชิ้นมาจากที่เดียวกัน)

   ```tsx
   import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
   } from "@scope/ui"
   ```

2. ประกอบตามลำดับนี้เสมอ: ตัวเปิด → กล่อง → หัว (ชื่อ + คำอธิบาย) → เนื้อหา**ในกล่องเดียว** → ส่วนท้าย (ยกเลิกซ้าย, ปุ่มหลักขวา)

   ```tsx
   <Dialog disablePointerDismissal>
     <DialogTrigger render={<Button variant="outline" />}>
       เพิ่มผู้เช่า
     </DialogTrigger>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>เพิ่มผู้เช่า</DialogTitle>
         <DialogDescription>กรอกข้อมูลผู้เช่าใหม่</DialogDescription>
       </DialogHeader>
       <div>{/* ช่องกรอกทั้งหมดอยู่ในกล่องนี้ */}</div>
       <DialogFooter>
         <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
         <Button type="submit">บันทึก</Button>
       </DialogFooter>
     </DialogContent>
   </Dialog>
   ```

3. Dialog ที่มีฟอร์มใส่ `disablePointerDismissal` เสมอ และปิดเองหลังบันทึกสำเร็จ (ดูตัวอย่างเต็มใน story `Default`)

---

## 4. Props and variants

Dialog ประกอบด้วยชิ้นส่วนที่ใช้ด้วยกัน: ตัวเปิด (trigger), กล่อง Dialog, หัว (ชื่อ + คำอธิบาย), เนื้อหา, ส่วนท้าย (ปุ่ม) และปุ่มปิด ไม่มี variant หรือ size ให้เลือก

| ชิ้นส่วน     | prop              | ค่าเริ่มต้น | ผล                                                                                |
| ------------ | ----------------- | ----------- | --------------------------------------------------------------------------------- |
| กล่อง Dialog | `showCloseButton` | `true`      | แสดงปุ่ม X มุมขวาบน (โปรแกรมอ่านหน้าจออ่านว่า "ปิด")                              |
| ส่วนท้าย     | `showCloseButton` | `false`     | เพิ่มปุ่ม "ปิด" (`outline`) ท้าย Dialog ใช้กับ Dialog ที่แค่ให้อ่าน ไม่มีปุ่มหลัก |

**Dialog (ตัวหลัก)** รับ `disablePointerDismissal` เพื่อปิดการคลิกพื้นหลัง (ใช้เมื่อไรดูการตัดสินใจด้านบน)

**ปุ่มที่ปิด Dialog:** ทำปุ่มเป็นปุ่มปิด ปุ่มนั้นจะปิด Dialog เมื่อกด ใช้กับ "ยกเลิก" และปุ่มบันทึกที่ไม่ต้องตรวจข้อมูล

**ตัวเปิด:** ใช้ `Button` ส่วนใหญ่เป็น `outline` มีไอคอนนำหน้าได้

**หน้าตา**

- กล่องกว้างเต็มจอลบขอบข้างละ 16px บนมือถือ และกว้างสูงสุด 384px บนจอใหญ่ มุมโค้ง เส้นขอบบาง
- ส่วนท้ายมีเส้นคั่นด้านบนและพื้นเทาอ่อน ปุ่มเรียงขวา (มือถือ: เรียงแนวตั้ง ปุ่มหลักอยู่บน)
- เปิดและปิดด้วยการจางและขยายเล็กน้อย
- พื้นหลังถูกบังด้วยสีทึบ (โหมดมืดทึบกว่า ให้เห็นชัดว่าหน้าหลักถูกบัง)
- สูงไม่เกินจอ ถ้าเนื้อหายาวเกิน เลื่อนเฉพาะเนื้อหาตรงกลาง หัวเรื่องและปุ่มท้ายค้างอยู่

**ทำให้เองโดยไม่ต้องตั้งค่า**

- เปิดแล้ว focus ไปที่ช่องแรกที่กดได้ (ฟอร์ม: ช่องกรอกช่องแรก) และกด Tab วนอยู่ข้างในเท่านั้น ถ้าเปิดด้วยการแตะบนมือถือ จะ focus ที่ตัวกล่องแทน เพื่อไม่ให้แป้นพิมพ์เด้งขึ้นทันที
- กด Esc เพื่อปิด
- ปิดแล้ว focus กลับไปที่ปุ่มที่เปิด
- หัวเรื่องและคำอธิบายถูกใช้เป็นชื่อและคำอธิบายของ Dialog สำหรับโปรแกรมอ่านหน้าจอ จึงต้องใช้ชิ้นส่วนหัวเรื่องเสมอ

---

## 5. Tokens used

| Token                  | สว่าง                       | มืด                          | ใช้กับ                                               |
| ---------------------- | --------------------------- | ---------------------------- | ---------------------------------------------------- |
| `--popover`            | `oklch(1 0 0)`              | `oklch(0.216 0.006 56.043)`  | พื้นกล่อง Dialog                                     |
| `--popover-foreground` | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ตัวอักษรในกล่อง                                      |
| `--foreground`         | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | เส้นขอบกล่อง (ความทึบ 10%)                           |
| `--muted`              | `oklch(0.97 0.001 106.424)` | `oklch(0.268 0.007 34.298)`  | พื้นส่วนท้าย (ความทึบ 50%)                           |
| `--muted-foreground`   | `oklch(0.553 0.013 58.071)` | `oklch(0.709 0.01 56.259)`   | คำอธิบาย                                             |
| `--border`             | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)`         | เส้นคั่นส่วนท้าย                                     |
| `--radius`             | `0.625rem` (10px)           | –                            | มุมโค้งของกล่อง                                      |
| `--overlay`            | `oklch(0 0 0 / 10%)`        | `oklch(0 0 0 / 50%)`         | พื้นหลังที่ถูกบัง (ใช้ร่วมกับ AlertDialog และ Sheet) |

contrast ตัวอักษร (สว่าง / มืด): หัวเรื่อง 19.75 / 16.76, คำอธิบาย 4.81 / 6.76 ผ่านเกณฑ์ 4.5:1 ทั้งหมด (คำนวณจากค่า token)

---

## 6. Example

จาก story `LongContent` (ค่า Controls เริ่มต้น: ปุ่ม X เปิด, คลิกพื้นหลังไม่ปิด) ส่วนฟอร์มเพิ่มผู้เช่าที่ตรวจข้อมูลได้จริงดูใน story `Default`

```tsx
<Dialog disablePointerDismissal>
  <DialogTrigger render={<Button variant="outline" />}>
    ดูเงื่อนไขการเช่า
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>เงื่อนไขการเช่า</DialogTitle>
      <DialogDescription>อ่านให้ครบก่อนยืนยัน</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-3">
      {Array.from({ length: 30 }, (_, i) => (
        <p key={i}>
          ข้อ {i + 1}. ผู้เช่าต้องชำระค่าเช่าภายในวันที่ 5 ของทุกเดือน
        </p>
      ))}
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>ยกเลิก</DialogClose>
      <DialogClose
        render={<Button />}
        onClick={() => toast.success("ยอมรับเงื่อนไขแล้ว")}
      >
        ยอมรับ
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

แหล่งอ้างอิง: [WAI-ARIA Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) · [WAI-ARIA Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) · [NN/g](https://www.nngroup.com/articles/modal-nonmodal-dialog/) · [Atlassian](https://atlassian.design/components/modal-dialog/usage) · [Primer](https://primer.style/product/components/dialog/guidelines) · [Carbon](https://carbondesignsystem.com/components/modal/usage/) · [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/alerts) · [Base UI](https://base-ui.com/react/components/dialog)
