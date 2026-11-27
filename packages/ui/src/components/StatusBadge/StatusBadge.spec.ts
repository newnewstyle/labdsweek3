import type { ComponentSpec } from "../../lib/component-spec"

/**
 * StatusBadge usage and decision rules: the single source of truth.
 * StatusBadge.md covers import, props, tokens and an example and does not repeat these.
 */
export const statusBadgeSpec = {
  name: "StatusBadge",
  purpose:
    "ป้ายสถานะสำเร็จรูปของบ้านเช่า (บ้าน สัญญา ค่าเช่า งานซ่อม) สี ไอคอน และข้อความมาจากตารางกลางที่เดียว ทุกหน้าจึงแสดงสถานะเดียวกันเหมือนกัน",

  keywords: [
    "สถานะ",
    "ป้ายสถานะ",
    "ชำระแล้ว",
    "ค้างชำระ",
    "ใกล้ครบกำหนด",
    "ว่าง",
    "มีผู้เช่า",
    "สัญญาใกล้หมด",
    "รอซ่อม",
    "กำลังซ่อม",
    "ซ่อมเสร็จ",
    "ด่วน",
    "status",
    "status badge",
    "payment status",
    "repair status",
  ],

  whenToUse: [
    {
      situation: "แสดงสถานะที่มีอยู่ในตาราง `STATUS` ในตาราง การ์ด หรือหน้ารายละเอียด",
      use: '`<StatusBadge status="…" />` ไม่ต้องเลือกสีหรือไอคอนเอง',
    },
    {
      situation: 'อยากบอกรายละเอียดเพิ่ม เช่น "ค้างชำระ 12 วัน"',
      use: "`label` แทนข้อความ สีและไอคอนยังเป็นของสถานะเดิม",
    },
    {
      situation: "งานซ่อมที่ด่วน",
      use: 'ป้ายขั้นตอน (`repair-pending` / `repair-in-progress` / `repair-done`) และวาง `repair-urgent` ("ด่วน") ไว้ข้างหน้า เฉพาะงานที่ด่วนจริง',
    },
  ],

  whenNotToUse: [
    {
      case: "สถานะที่ยังไม่มีในตาราง `STATUS`",
      instead:
        "เพิ่มสถานะในตาราง `STATUS` ของ StatusBadge (จัดเข้า 1 ใน 4 ระดับ) ก่อนใช้ อย่าสร้าง `Badge` สีเองในหน้า",
    },
    {
      case: "หมวดหมู่ เช่น ทาวน์เฮาส์ หรือประเภทงานซ่อม",
      instead: '`Badge variant="secondary"` เพราะไม่ใช่สถานะ',
    },
    {
      case: "แจ้งผลหลังทำอะไรเสร็จ (บันทึกการชำระแล้ว)",
      instead: "`toast`",
    },
    {
      case: "ตัวกรองรายการตามสถานะ",
      instead: "`ToggleGroup` (ป้ายแสดงผลอย่างเดียว กดไม่ได้)",
    },
  ],

  decisions: [
    {
      rule: "ตาราง `STATUS` เป็นแหล่งเดียวของ สถานะ → ระดับสี ไอคอน และข้อความไทย",
      why: "ถ้าแต่ละหน้าเลือกสีเอง สถานะเดียวกันจะหน้าตาต่างกัน ผู้ใช้จะอ่านสีไม่ออก เปลี่ยนที่ตารางที่เดียวแล้วทั้งแอปเปลี่ยนตาม",
    },
    {
      rule: "ใช้ 4 ระดับของ Badge: `success` = เรียบร้อย, `outline` = ข้อมูล, `warning` = จับตา, `destructive` = รีบจัดการ",
      why: "ผู้ใช้จำได้ไม่กี่สี ทั้งแอปใช้ 4 ระดับเดียวกัน (เหตุผลเต็มอยู่ใน Badge.spec)",
    },
    {
      rule: 'งานซ่อม: รอซ่อม = `warning`, กำลังซ่อม = `outline`, ซ่อมเสร็จ = `success`, "ด่วน" = ป้ายแดงแยกอีกอัน',
      why: "สีตอบว่าเจ้าของบ้านต้องทำอะไร: รอซ่อมต้องติดต่อช่าง กำลังซ่อมแค่รอ ความด่วนแยกเป็นป้ายของตัวเองเพราะสีเดียวบอก 2 เรื่องไม่ได้",
    },
    {
      rule: "ไอคอนมาพร้อมทุกสถานะเสมอ และใส่ `aria-hidden` ให้แล้ว",
      why: "ไม่บอกสถานะด้วยสีอย่างเดียว ข้อความบอกความหมายครบแล้ว ไอคอนจึงไม่ต้องถูกอ่านซ้ำ",
    },
  ],

  accessibility: [
    {
      criterion: "1.4.1 Use of Color",
      status: "pass",
      note: "ทุกสถานะมีข้อความและไอคอนในตัว ไม่ได้บอกด้วยสีอย่างเดียว",
    },
    {
      criterion: "1.4.3 Contrast (Minimum)",
      status: "pass",
      note: "ใช้สีของ Badge: `success` 5.52 / 5.78, `warning` 5.33 / 6.05, `destructive` 5.76 / 5.14, `outline` 19.75 / 16.76 (สว่าง / มืด บนพื้น Card คำนวณจากค่า token)",
    },
    {
      criterion: "1.1.1 Non-text Content",
      status: "pass",
      note: "ไอคอนสถานะมี `aria-hidden` ในตัว ข้อความเป็นชื่อที่อ่านได้",
    },
    {
      criterion: "1.3.1 Info and Relationships",
      status: "conditional",
      note: 'ถ้าใช้ `label` แทนข้อความ ต้องยังบอกสถานะในคำ เช่น "ค้างชำระ 12 วัน" ไม่ใช่ "12 วัน" อย่างเดียว',
    },
  ],

  todos: [],
} satisfies ComponentSpec
