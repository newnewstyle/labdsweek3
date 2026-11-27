import type { ComponentSpec } from "../../lib/component-spec"

/**
 * Field usage and decision rules: the single source of truth.
 * Field.md covers import, props, tokens and an example and does not repeat these.
 */
export const fieldSpec = {
  name: "Field",
  purpose:
    "โครงของช่องกรอกหนึ่งช่องในฟอร์ม: ป้าย ช่องกรอก คำอธิบาย และข้อความผิด จัดวางให้เหมือนกันทุกฟอร์ม",

  keywords: [
    "ฟอร์ม",
    "ช่องกรอก",
    "ป้ายช่อง",
    "คำอธิบาย",
    "ข้อความผิด",
    "กรอกผิด",
    "ตั้งค่า",
    "form",
    "field",
    "label",
    "error message",
    "helper text",
    "fieldset",
  ],

  whenToUse: [
    {
      situation: "ช่องกรอกทั่วไป (ชื่อ เบอร์โทร ค่าเช่า)",
      use: "`Field` แนวตั้ง (ค่าเริ่มต้น): `FieldLabel` → ช่องกรอก → `FieldDescription` หรือ `FieldError`",
    },
    {
      situation: "สวิตช์หรือ checkbox ที่เป็นการตั้งค่า",
      use: '`orientation="horizontal"` วางป้ายข้างตัวควบคุม ถ้ามีคำอธิบายด้วย ห่อป้ายและคำอธิบายด้วย `FieldContent`',
    },
    {
      situation: "ฟอร์มที่ต้องใช้ทั้งในจอกว้างและมือถือ",
      use: '`orientation="responsive"`: ซ้อนกันเมื่อกลุ่มแคบ วางข้างกันเมื่อกลุ่มกว้างตั้งแต่ 28rem',
    },
    {
      situation: "ฟอร์มหลายช่องที่เป็นเรื่องเดียวกัน",
      use: "`FieldSet` + `FieldLegend` ครอบ `FieldGroup` คั่นหมวดย่อยด้วย `FieldSeparator`",
    },
    {
      situation: "ตัวเลือกที่ต้องอธิบายแต่ละข้อ (เช่น ช่องทางส่งเตือน)",
      use: "การ์ดตัวเลือก: `FieldLabel` ห่อ `Field` ทั้งก้อน ข้างในเป็น `RadioGroupItem` หรือ `Checkbox`",
    },
  ],

  whenNotToUse: [
    {
      case: "ข้อความแจ้งผลของทั้งฟอร์ม (บันทึกไม่สำเร็จเพราะเครือข่าย)",
      instead: '`Alert variant="destructive"` เหนือฟอร์ม หรือ `toast`',
    },
    {
      case: "ช่องค้นหาเดี่ยวในแถบเครื่องมือ",
      instead: "`InputGroup` ที่มีไอคอนค้นหา และ `aria-label` (ไม่ต้องมี Field)",
    },
    {
      case: "แสดงข้อมูลอ่านอย่างเดียวเป็นคู่ ป้าย: ค่า",
      instead: "รายการ `<dl>` ธรรมดา Field มีไว้สำหรับช่องที่กรอกได้",
    },
  ],

  decisions: [
    {
      rule: "ข้อความผิดแทนที่คำอธิบาย ไม่แสดงพร้อมกัน",
      why: "ใต้ช่องมีข้อความเดียว ผู้ใช้จึงเห็นสิ่งที่ต้องแก้ทันที และความสูงของฟอร์มไม่กระโดด",
    },
    {
      rule: "Field ผูกป้าย คำอธิบาย และข้อความผิดกับช่องกรอกให้เอง (`id`, `aria-describedby`, `aria-invalid` จาก `data-invalid`)",
      why: "ถ้าให้คนใช้ใส่ id เองทุกช่อง ลืมเมื่อไหร่โปรแกรมอ่านหน้าจอก็ไม่อ่านคำอธิบายหรือข้อความผิด my-app-2 แก้เรื่องนี้ด้วย `FormField` ของตัวเอง แพ็กเกจจึงต้องทำได้เท่ากัน ค่าที่ใส่เองยังชนะ",
    },
    {
      rule: "`FieldError` เป็น `role=\"alert\"` และไม่แสดงอะไรเมื่อไม่มีข้อความ",
      why: "ข้อความผิดที่โผล่ขึ้นมาหลังกดบันทึกถูกอ่านทันที และวาง `<FieldError>` ไว้ตลอดได้โดยไม่ต้องเขียนเงื่อนไข",
    },
  ],

  accessibility: [
    {
      criterion: "1.3.1 Info and Relationships",
      status: "pass",
      note: "ช่องกรอกของแพ็กเกจใน Field ได้ชื่อจาก `FieldLabel` และคำอธิบายจาก `FieldDescription`/`FieldError` อัตโนมัติ (ทดสอบใน `Field.test.tsx` และ story `Playground`/`Invalid`) RadioGroup ได้ชื่อกลุ่มผ่าน `aria-labelledby` (story `RadioGroup/Invalid`) ยกเว้นช่องที่ไม่ใช่ของแพ็กเกจ ซึ่งต้องผูกเอง",
    },
    {
      criterion: "3.3.1 Error Identification",
      status: "conditional",
      note: "ผ่านเมื่อใส่ `data-invalid` ที่ Field และใช้ `FieldError` (มี `role=\"alert\"` ช่องได้ `aria-invalid` เอง) ข้อความต้องบอกว่าผิดอะไรและแก้อย่างไร เช่น \"เบอร์โทรต้องมี 10 หลัก\"",
    },
    {
      criterion: "1.4.3 Contrast (Minimum)",
      status: "pass",
      note: "ป้าย 19.75 / 18.92, คำอธิบาย 5.08 / 7.63, ข้อความผิด 6.95 / 8.31 (สว่าง / มืด บนพื้นหลัง คำนวณจากค่า token)",
    },
    {
      criterion: "1.4.1 Use of Color",
      status: "pass",
      note: "สถานะผิดมีข้อความใต้ช่องเสมอ ไม่ได้บอกด้วยสีแดงอย่างเดียว",
    },
    {
      criterion: "2.4.7 Focus Visible",
      status: "pass",
      note: "การ์ดตัวเลือกแสดงวง focus ทั้งการ์ดเมื่อตัวเลือกข้างในได้ focus จากคีย์บอร์ด (ช่องกรอกแสดงวงของตัวเอง)",
    },
  ],

  todos: [],
} satisfies ComponentSpec
