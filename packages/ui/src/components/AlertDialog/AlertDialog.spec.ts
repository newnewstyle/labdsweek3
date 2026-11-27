import type { ComponentSpec } from "../../lib/component-spec"

/**
 * AlertDialog usage and decision rules: the single source of truth.
 * AlertDialog.md covers import, props, tokens and an example and does not repeat these.
 */
export const alertDialogSpec = {
  name: "AlertDialog",
  purpose:
    "กล่องถามยืนยันก่อนทำสิ่งที่ย้อนกลับไม่ได้หรือมีผลกว้าง ผู้ใช้ต้องเลือกตอบก่อนไปต่อ",

  keywords: [
    "ยืนยัน",
    "ยืนยันการลบ",
    "ลบ",
    "ย้อนกลับไม่ได้",
    "ออกจากระบบ",
    "แน่ใจไหม",
    "confirm",
    "confirmation",
    "delete",
    "alert dialog",
    "destructive",
  ],

  whenToUse: [
    {
      situation: 'ลบข้อมูลถาวร เช่น "ลบบ้านเลขที่ 12/3"',
      use: 'ตัวเปิดเป็น Button `variant="destructive"` ปุ่มยืนยันเป็น `AlertDialogAction variant="destructive-solid"` ป้ายคำกริยาเดียวกับตัวเปิด ("ลบ")',
    },
    {
      situation:
        'ยืนยันสิ่งที่ไม่ได้ทำลายข้อมูลแต่ขัดจังหวะผู้ใช้ เช่น "ออกจากระบบ" หรือส่งเตือนผู้เช่าทุกคนพร้อมกัน',
      use: '`AlertDialogAction` สีหลัก (ไม่ใส่ `variant`) และ `size="sm"` เมื่อมีแค่คำถามสั้นๆ',
    },
    {
      situation: "ยืนยันสิ่งที่ทำใน Dialog (เช่น ลบผู้เช่าจาก Dialog แก้ไข)",
      use: "เปิด AlertDialog ซ้อนจาก Dialog ได้ เป็นกรณีเดียวที่ซ้อนได้",
    },
  ],

  whenNotToUse: [
    {
      case: "การกระทำที่ทำบ่อยและย้อนกลับได้ (เปิด/ปิดการแจ้งเตือน, ย้ายรายการ)",
      instead: 'ทำเลย แล้วแสดง `toast` ที่มีปุ่ม "เลิกทำ" ถ้าจำเป็น',
    },
    {
      case: "ฟอร์มที่ต้องกรอก",
      instead: "`Dialog` (AlertDialog มีไว้ถามคำถามเดียว ไม่มีช่องกรอก)",
    },
    {
      case: "แจ้งผลหลังทำเสร็จ (ลบแล้ว, บันทึกแล้ว)",
      instead: "`toast`",
    },
  ],

  decisions: [
    {
      rule: 'ปุ่มยืนยันลบใช้ `variant="destructive-solid"` (แดงทึบ) ต้องใส่เอง เพราะ `AlertDialogAction` ค่าเริ่มต้นเป็นสีหลัก (ส้ม)',
      why: "แดงทึบสงวนไว้สำหรับจังหวะที่ย้อนกลับไม่ได้ (Button.spec) ค่าเริ่มต้นเป็นสีหลักเพราะ AlertDialog ใช้ยืนยันเรื่องที่ไม่ใช่การลบด้วย ถ้าไม่ใส่ ปุ่มลบจะเป็นสีส้มเหมือนปุ่มบันทึก",
    },
    {
      rule: 'หัวเรื่องเป็นคำถามที่บอกสิ่งที่จะเกิดพร้อมชื่อสิ่งนั้น ("ลบบ้านเลขที่ 12/3?") คำอธิบายบอกผลที่ตามมา ป้ายปุ่มยืนยันเป็นคำกริยาเดียวกับหัวเรื่อง ไม่ใช้ "ตกลง" หรือ "ใช่"',
      why: "ผู้ใช้อ่านแค่ปุ่มก็รู้ว่ากดแล้วเกิดอะไร ลดการกดผิดตอนรีบ",
    },
    {
      rule: '"ยกเลิก" (`AlertDialogCancel`, `outline`) อยู่ซ้าย ปุ่มยืนยันอยู่ขวา บนมือถือปุ่มยืนยันขึ้นไปอยู่บน',
      why: "ตรงกับ Dialog ทั้งแอป เปิดกล่องแล้ว focus ไปที่ \"ยกเลิก\" ก่อน (ตัวแรกในลำดับ) กด Enter โดยไม่ตั้งใจจึงไม่ลบ",
    },
    {
      rule: "คลิกพื้นหลังแล้วไม่ปิด ต้องเลือกปุ่มใดปุ่มหนึ่งหรือกด Esc",
      why: "คำถามยืนยันต้องได้คำตอบชัด ไม่ปิดหายเพราะเผลอคลิกนอกกล่อง",
    },
  ],

  accessibility: [
    {
      criterion: "4.1.2 Name, Role, Value",
      status: "conditional",
      note: '`role="alertdialog"` ใส่ให้แล้ว ต้องมี `AlertDialogTitle` เสมอ (ใช้เป็นชื่อกล่อง) และ `AlertDialogDescription` (อ่านต่อจากชื่อ)',
    },
    {
      criterion: "2.4.3 Focus Order",
      status: "pass",
      note: 'เปิดแล้ว focus ไปที่ "ยกเลิก" ปิดแล้ว focus กลับไปที่ปุ่มที่เปิด (ทดสอบใน story `CancelAndConfirm`)',
    },
    {
      criterion: "1.4.3 Contrast (Minimum)",
      status: "pass",
      note: "หัวเรื่อง 19.75 / 16.76, คำอธิบาย 5.08 / 6.76, ปุ่ม `destructive-solid` 6.66 / 7.53 (สว่าง / มืด คำนวณจากค่า token)",
    },
    {
      criterion: "2.5.8 Target Size (Minimum)",
      status: "pass",
      note: "ปุ่มท้ายกล่องสูง 32px",
    },
  ],

  todos: [],
} satisfies ComponentSpec
