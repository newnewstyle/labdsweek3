import type { ComponentSpec } from "../../lib/component-spec"

/**
 * Input usage and decision rules: the single source of truth.
 * Input.md covers import, props, tokens and an example and does not repeat these.
 */
export const inputSpec = {
  name: "Input",
  purpose: "ช่องกรอกข้อความบรรทัดเดียว เช่น ชื่อ เบอร์โทร อีเมล จำนวนเงิน",

  keywords: [
    "ช่องกรอก",
    "กรอกข้อความ",
    "พิมพ์",
    "ชื่อ",
    "เบอร์โทร",
    "อีเมล",
    "รหัสผ่าน",
    "จำนวนเงิน",
    "input",
    "text field",
    "textbox",
    "form control",
  ],

  whenToUse: [
    {
      situation: "ข้อความสั้นบรรทัดเดียวในฟอร์ม",
      use: "`Input` ใน `Field` พร้อม `FieldLabel`",
    },
    {
      situation: "ตัวเลขที่ไม่ใช้คำนวณ เช่น เบอร์โทร เลขบัญชี",
      use: '`inputMode="tel"` หรือ `"numeric"` (ไม่ใช้ `type="number"` เพราะลูกศรเพิ่มลดและเลข 0 นำหน้าหาย)',
    },
    {
      situation: "อีเมล รหัสผ่าน URL",
      use: '`type` ที่ตรงกัน (`email`, `password`, `url`) และ `autoComplete` ที่ตรงกัน มือถือจะเปิดแป้นพิมพ์ที่เหมาะ',
    },
  ],

  whenNotToUse: [
    {
      case: "ข้อความหลายบรรทัด (หมายเหตุ ข้อความเตือน)",
      instead: "`Textarea`",
    },
    {
      case: "มีหน่วย ไอคอน หรือปุ่มติดอยู่ในช่อง (฿, บาท, ค้นหา, คัดลอก)",
      instead: "`InputGroup` ซึ่งวาดขอบและวง focus รวมกัน",
    },
    {
      case: "เลือกจากรายการที่รู้ล่วงหน้า",
      instead: "`Select` (รายการสั้น) หรือ `Combobox` (รายการยาว พิมพ์ค้นหา)",
    },
    {
      case: "วันที่",
      instead: "Date picker (`Popover` + `Calendar`) เพื่อแสดงเดือนไทยและ พ.ศ.",
    },
  ],

  decisions: [
    {
      rule: "ไม่ใช้ placeholder แทนป้าย",
      why: "placeholder หายเมื่อเริ่มพิมพ์ ผู้ใช้ลืมว่าช่องนี้ให้กรอกอะไร และโปรแกรมอ่านหน้าจอบางตัวไม่อ่าน ใช้ placeholder เป็นตัวอย่างรูปแบบเท่านั้น เช่น `081-234-5678`",
    },
    {
      rule: "มุมโค้ง 10px (`--radius`) เท่ากับ Button และ Select ขนาด default ที่สูง 32px เท่ากัน",
      why: "วางช่องกรอกคู่กับปุ่ม (ช่องค้นหา + ปุ่ม, ButtonGroup) แล้วมุมเข้ากัน คอมโพเนนต์ที่เตี้ยกว่า 32px ใช้ `--radius-md` (8px) เพื่อไม่ให้ดูกลมเกิน",
    },
    {
      rule: "ตัวอักษร 16px บนมือถือ 14px ตั้งแต่จอกลาง",
      why: "iOS ซูมหน้าเองเมื่อช่องกรอกเล็กกว่า 16px",
    },
  ],

  accessibility: [
    {
      criterion: "1.3.1 Info and Relationships / 4.1.2 Name, Role, Value",
      status: "conditional",
      note: "ต้องมีป้าย: `FieldLabel` ใน `Field` (ผูกให้เอง) หรือ `Label` ที่ `htmlFor` ตรงกับ `id` หรือ `aria-label` ถ้าไม่มีป้ายที่มองเห็น",
    },
    {
      criterion: "1.4.3 Contrast (Minimum)",
      status: "pass",
      note: "ข้อความ 19.75 / 18.92, placeholder 5.08 / 7.03 (สว่าง / มืด คำนวณจากค่า token)",
    },
    {
      criterion: "1.4.11 Non-text Contrast",
      status: "fail",
      note: "ขอบช่องปกติ (`--input`) ได้แค่ 1.26 / 1.48 ต่ำกว่า 3:1 ช่องยังหาเจอได้จากป้ายและตำแหน่ง แต่ขอบเองไม่ผ่าน (ค่าเดียวกับ my-app-2 และ shadcn) ขอบตอนผิด 6.95 / 2.81",
    },
    {
      criterion: "2.4.7 Focus Visible",
      status: "pass",
      note: "กด Tab มาถึงแล้วขอบเปลี่ยนเป็น `--ring` พร้อมวงหนา 3px",
    },
    {
      criterion: "3.3.1 Error Identification",
      status: "conditional",
      note: "ใน `Field` ที่มี `data-invalid` ช่องได้ `aria-invalid` (ขอบแดง) และ `aria-describedby` ไปที่ `FieldError` เอง นอก Field ต้องใส่ทั้งสองเอง",
    },
  ],

  todos: [
    "ขอบช่องกรอกไม่ผ่าน 1.4.11 (1.26:1) จะเข้มขึ้นไหม ถ้าเข้ม `--input` ต้องดูผลกับ Select, Textarea, InputGroup และขอบ outline ของปุ่มด้วยเพราะใช้ token เดียวกัน",
  ],
} satisfies ComponentSpec
