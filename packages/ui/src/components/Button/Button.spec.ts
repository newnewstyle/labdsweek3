import type { ComponentSpec } from "../../lib/component-spec"

/**
 * Button usage and decision rules: the single source of truth.
 * Button.md covers props, tokens and an example and does not repeat these.
 */
export const buttonSpec = {
  name: "Button",
  purpose:
    "ปุ่มที่ผู้ใช้กดเพื่อสั่งให้เกิด action ในหน้านั้น เช่น บันทึก ส่ง ลบ เปิดหน้าต่าง",

  keywords: [
    "ปุ่ม",
    "บันทึก",
    "ส่ง",
    "ยืนยัน",
    "ยกเลิก",
    "ลบ",
    "เพิ่ม",
    "button",
    "submit",
    "action",
    "cta",
    "loading",
  ],

  whenToUse: [
    {
      situation: "action หลักของฟอร์มหรือหน้า (มีได้ 1 ปุ่มต่อพื้นที่)",
      use: '`default` เช่น "บันทึก", "เข้าสู่ระบบ"',
    },
    {
      situation: "ปุ่มหลักในฟอร์มแคบ (หน้าเข้าสู่ระบบ, สมัครสมาชิก)",
      use: "`default` ขนาด `lg` กว้างเต็มฟอร์ม",
    },
    {
      situation: "action รองที่วางคู่กับปุ่มหลัก (ยกเลิก, ย้อนกลับ, ส่งออก)",
      use: "`outline`",
    },
    {
      situation: "ปุ่มที่เปิดการลบ (ยังไม่ลบจริง)",
      use: "`destructive` (แดงอ่อน) แล้วเปิด AlertDialog ให้ยืนยัน",
    },
    {
      situation: "ปุ่มยืนยันลบครั้งสุดท้ายใน AlertDialog (ย้อนกลับไม่ได้)",
      use: "`destructive-solid` (แดงทึบ)",
    },
    {
      situation: "ปุ่มเล็กใน toolbar, เมนู, หัวตาราง หรือปุ่มไอคอนในช่องกรอก",
      use: "`ghost` ขนาด `icon-*` พร้อม `aria-label` ภาษาไทย",
    },
    {
      situation: "action สั้นๆ ที่แทรกในประโยค และไม่เปลี่ยนหน้า",
      use: '`link` เช่น "กรอกให้อัตโนมัติ" ในหน้าเข้าสู่ระบบ',
    },
    {
      situation: "เปิด Dialog, Sheet, เมนู หรือ Tooltip",
      use: "ปุ่มเป็นตัวเปิดของ overlay นั้น ส่วนใหญ่ใช้ `outline`",
    },
    {
      situation: "กำลังส่งข้อมูล รอผล",
      use: "ใส่ `loading` ปุ่มจะหมุนและกดซ้ำไม่ได้เอง",
    },
    {
      situation:
        "ปุ่มที่เกี่ยวข้องกันหลายปุ่มติดเป็นแถบ (ช่วงเวลา, เลื่อนหน้า)",
      use: "ห่อด้วย `ButtonGroup`",
    },
  ],

  whenNotToUse: [
    {
      case: "พาไปหน้าอื่น (เปลี่ยน URL)",
      instead:
        'ลิงก์ (`<Link>`) ถ้าอยากให้หน้าตาเป็นปุ่ม ทำ Button เป็นลิงก์ด้วย `render={<Link href="…" />}` + `nativeButton={false}` + `role="link"`',
    },
    {
      case: "เปิด/ปิดค่า",
      instead: "`Switch` หรือ `Checkbox` ปุ่มคือการสั่งงาน ไม่ใช่การเก็บค่า",
    },
    { case: "เลือก 1 จากหลายตัวเลือก", instead: "`Select` หรือ `Tabs`" },
    {
      case: "แสดงสถานะ (ชำระแล้ว, ค้างชำระ)",
      instead: "`Badge` ซึ่งเป็นป้าย ไม่ใช่สิ่งที่กดได้",
    },
    {
      case: "ปุ่ม `default` มากกว่า 1 ปุ่มในพื้นที่เดียวกัน",
      instead: "ปุ่มที่เหลือลดเป็น `outline` หรือ `ghost`",
    },
    {
      case: "`destructive-solid` นอก AlertDialog",
      instead: "`destructive` (ถ้าแดงทึบทุกที่ ปุ่มยืนยันลบจะไม่เด่นอีกต่อไป)",
    },
    {
      case: "`link` ที่อยู่เดี่ยวๆ นอกประโยค โดยไม่มีระยะรอบๆ",
      instead:
        "เว้นพื้นที่กดหรือระยะรอบๆ อย่างน้อย 24px (WCAG 2.5.8) หรือใช้ `ghost`",
    },
  ],

  decisions: [
    {
      rule: "ไม่มี `secondary` ปุ่มรองใช้ `outline` อย่างเดียว",
      why: "ทุกปุ่มในแอปวางบนพื้นขาว และกฎเดียวทำให้ไม่ต้องลังเล ระบบใหญ่อย่าง Primer, Atlassian, Ant Design ก็มีปุ่มระดับกลางแบบเดียว ถ้าวันหน้าต้องวางปุ่มบนพื้นสีแล้ว `outline` ดูจม ให้กลับมาตัดสินใหม่",
    },
    {
      rule: "สีลิงก์ (`--link`) แยกจากสีแบรนด์",
      why: "ลิงก์ต้องอ่านออกบนพื้นหลังทั้งสองธีมโดยไม่ผูกกับสีพื้นปุ่ม ใน my-app-2 สีแบรนด์โหมดมืดได้แค่ 2.45:1 ใน @newnewstyle/ui โหมดมืดใช้สีแบรนด์ที่สว่างขึ้นแล้ว `--link` ได้ 5.05 / 7.07 (สว่าง / มืด)",
    },
    {
      rule: "`default` ตอนชี้เมาส์ผสมสีตัวอักษรหลัก 10% (สว่าง: เข้มขึ้น, มืด: สว่างขึ้น) ไม่จางลงเป็น 80% แบบ my-app-2",
      why: "แบบจางลง พื้นส้มบนพื้นขาวทำให้ตัวอักษรเหลือ 3.48:1 (วัดในเบราว์เซอร์) ไม่ผ่าน 4.5:1 แบบผสมได้ 5.75 / 7.89 ปุ่มยังเปลี่ยนสีให้รู้ว่าชี้อยู่ my-app-2 ควรแก้ตามเมื่อเปลี่ยนมาใช้แพ็กเกจนี้",
    },
    {
      rule: "`destructive-solid` ใช้เฉพาะปุ่มยืนยันลบใน AlertDialog",
      why: "แดงทึบต้องเด่นที่สุดตอนที่ย้อนกลับไม่ได้ ถ้าใช้บ่อยจะหมดความหมาย",
    },
    {
      rule: 'Button ที่ทำเป็นลิงก์ต้องใส่ `role="link"` เอง คู่กับ `nativeButton={false}`',
      why: 'Base UI ใส่ `role="button"` ให้ทุกปุ่มที่ไม่ใช่ `<button>` โปรแกรมอ่านหน้าจอจึงอ่านว่า "ปุ่ม" ทั้งที่พาไปหน้าอื่น (ไม่ผ่าน WCAG 4.1.2) `role` ที่ส่งเองจะทับค่านั้น เลือกวิธีนี้แทนการแยก component ลิงก์หน้าตาปุ่ม เพราะตอนนี้ใช้แค่ 2 จุด ถ้าใช้มากขึ้นค่อยแยก',
    },
  ],

  accessibility: [
    {
      criterion: "1.4.3 Contrast (Minimum)",
      status: "pass",
      note: "ตัวอักษรทุก variant ตอนปกติอย่างน้อย 4.5:1 ต่ำสุดคือ `default` 4.87 (โหมดสว่าง คำนวณจากค่า token) ค่าของแต่ละ variant อยู่ในส่วนที่ 4 ตอนชี้เมาส์ `default` ได้ 5.75 / 7.89 (วัดในเบราว์เซอร์)",
    },
    {
      criterion: "2.5.8 Target Size (Minimum)",
      status: "conditional",
      note: "ทุก size สูงอย่างน้อย 24px (`xs` และ `icon-xs` สูง 24px พอดี) ยกเว้น `link` ที่ไม่มีความสูง ต้องอยู่ในประโยคหรือเว้นระยะรอบๆ 24px",
    },
    {
      criterion: "2.4.7 Focus Visible",
      status: "pass",
      note: "กด Tab มาถึงมีวง focus ทุก variant (ปุ่มแดงใช้วงสีแดง)",
    },
    {
      criterion: "4.1.2 Name, Role, Value",
      status: "conditional",
      note: 'ปุ่มที่มีแต่ไอคอนต้องใส่ `aria-label` ภาษาไทย ปุ่มที่เป็นลิงก์ต้องใส่ `role="link"` ส่วน `loading` ตั้ง `aria-busy` ให้เอง',
    },
    {
      criterion: "1.4.11 Non-text Contrast",
      status: "not-checked",
      note: "ยังไม่ได้วัดเส้นขอบของ `outline` และวง focus เทียบกับพื้น",
    },
  ],

  todos: [],
} satisfies ComponentSpec
