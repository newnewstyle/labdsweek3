# /review-ui log

ผลการลองใช้ skill `/review-ui` (`.claude/skills/review-ui/SKILL.md`) กับงานจริงใน repo นี้ แล้วคนตรวจหลักฐานของทุกข้อก่อนบันทึก

Checklist: 1 ใช้ component ของเรา · 2 ใช้แค่ props ที่มีในคู่มือ · 3 ใช้แค่ token · 4 ทำตาม Do/Don't · 5 ครบ 3 สถานะ และภาษาไทยพอดี · 6 บอกว่าอ่านอะไรและตรวจอะไรไม่ได้

> **ข้อจำกัดของรอบแรก (28 พ.ย. 2026):** ทั้ง 3 รอบรันใน session เดียวกับที่เขียน skill และโค้ดส่วนใหญ่ ไม่ได้ `/clear` ก่อน ผลจึงอาจเอนไปทาง pass ควรรันซ้ำใน session ใหม่เพื่อเทียบ

## สรุป

| # | ข้อ | Field.stories | StatusBadge.stories | docs demo | docs demo หลังแก้คู่มือ |
| - | --- | --- | --- | --- | --- |
| 1 | ใช้ component ของเรา | pass | pass | pass | pass |
| 2 | ใช้แค่ props ที่มีในคู่มือ | pass (+1 can't check) | pass | pass (+8 can't check) | pass (+7 can't check) |
| 3 | ใช้แค่ token | pass | fail | fail · ถามทีมก่อน | fail · ถามทีมก่อน |
| 4 | ทำตาม Do/Don't | pass | pass | fail | fail ×2 (อ้างคู่มือ AlertDialog ได้ตรง) |
| 5 | ครบ 3 สถานะ · ภาษาไทยพอดี | fail · can't check | fail · can't check | fail ×2 · can't check | fail ×2 · can't check |
| 6 | อ่านอะไร / ตรวจอะไรไม่ได้ | can't check | can't check | can't check | can't check |
| | **failed checks** | **1** | **2** | **3** (4 จุด) | **3** (5 จุด) |

## รอบที่ 1: `apps/storybook/src/Field.stories.tsx`

| # | ผล | หลักฐาน | หมายเหตุ |
| - | --- | --- | --- |
| 1 | pass | `Field.stories.tsx:4-19` | ทุกชิ้นมาจาก `@newnewstyle/ui` ส่วน `<form>` (:133) ไม่มีตัวแทนในแพ็กเกจ |
| 2 | pass (+1 can't check) | `:63-69` ↔ `Field.md:65-78`, `Input.md:34-41` | Checkbox (:148) และ Switch (:158) ไม่มีคู่มือ |
| 3 | pass | `:62,119,133` | มีแค่ `max-w-*` |
| 4 | pass | `:70-74` ↔ `Field.spec.ts:68`; `:147-155` ↔ `Field.spec.ts:34-35`; `:161-163` ↔ `Button.spec.ts:29-38`; `:69` ↔ `Input.spec.ts:32-33` | story `Orientations`/`Form` (:122-158) ยังใส่ `htmlFor`/`id` เอง ขัดกับ `Field.md:25` ที่บอกว่าไม่ต้องใส่ |
| 5 | fail · can't check | ปกติ `:84`, ผิด `:94`, ปิด `:107` | ไม่มีข้อความไทยยาว |
| 6 | can't check | | |

## รอบที่ 2: `apps/storybook/src/StatusBadge.stories.tsx`

| # | ผล | หลักฐาน | หมายเหตุ |
| - | --- | --- | --- |
| 1 | pass | `StatusBadge.stories.tsx:4` | `<span>` (:98) เป็นตัวจัดวาง |
| 2 | pass | `:53-74,117` ↔ `StatusBadge.md:43-56` | |
| 3 | fail | `:50` `grid-cols-[auto_1fr]` ↔ SKILL ข้อ 3 | เป็นค่าจัดวาง ไม่ใช่สีหรือขนาด ดูหัวข้อ "คนตัดสินต่างจาก AI" |
| 4 | pass | `:99-100` ↔ `StatusBadge.spec.ts:42,76`; `:117` ↔ `StatusBadge.spec.ts:104` | |
| 5 | fail · can't check | `:117` | ไม่มี `label` ไทยยาว และ Badge เป็น `whitespace-nowrap overflow-hidden` (`Badge.module.css:6`) |
| 6 | can't check | | |

## รอบที่ 3: `apps/docs/app/components/demo.tsx`

| # | ผล | หลักฐาน | หมายเหตุ |
| - | --- | --- | --- |
| 1 | pass | `demo.tsx:6-55` | กรอบ `div rounded-xl border` (:198) ใช้ตัด Sidebar |
| 2 | pass (+8 can't check) | `:102,141` ↔ `Button.md:48,54-63` | Select, Textarea, Tooltip, DropdownMenu, AlertDialog, Sheet, Table, Sidebar ไม่มีคู่มือ |
| 3 | fail · ถามทีมก่อน | `:198` `rounded-xl` ↔ `AGENTS.md:97-99` | 14px มีไว้สำหรับ overlay ไม่ใช่กรอบ |
| 4 | fail | `:153` `AlertDialogAction` ไม่มี `variant` ↔ `Button.spec.ts:45-46,115` | ปุ่มยืนยันลบเป็นสีส้ม `default` (`AlertDialog.tsx:129-130`) แต่กฎบอกให้ใช้ `destructive-solid` |
| 5 | fail ×2 · can't check | `:58-73,148`; `:176-193` | ไม่มีภาษาไทยเลย และ Table ไม่มีตัวอย่างตอนไม่มีข้อมูล |
| 6 | can't check | | |

## แก้คู่มือ 1 จุด แล้วรีวิวซ้ำ

- **ข้อที่เลือก:** รอบ 3 ข้อ 4, `AlertDialogAction` ยืนยันลบไม่มี `variant` (`demo.tsx:153`) ก่อนแก้ AI ต้องโยงกฎจาก `Button.spec.ts:45-46` เอง เพราะ AlertDialog ไม่มีคู่มือ และค่าเริ่มต้นของปุ่ม (สีหลัก) ไม่มีที่ไหนเขียนไว้
- **แก้ที่ (คู่มือ ไม่แก้โค้ด demo):**
  - เขียน `packages/ui/src/components/AlertDialog/AlertDialog.spec.ts` และ `AlertDialog.md` ใหม่ด้วยขั้นตอนของ `/usage-doc` กฎหลักอยู่ที่ `AlertDialog.spec.ts:59`: ปุ่มยืนยันลบต้องใส่ `destructive-solid` เอง เพราะค่าเริ่มต้นเป็นสีหลัก
  - story `AlertDialog` เปลี่ยนปุ่มยืนยันจาก `destructive` เป็น `destructive-solid` ให้ตรงกฎ (เดิมขัดกับ `Button.spec.ts` เอง) เพิ่ม story `ConfirmSignOut` (ยืนยันที่ไม่ใช่การลบ) และ play ที่ตรวจว่าเปิดแล้ว focus อยู่ที่ "ยกเลิก" และ Esc ปิดได้ ผ่านทุก story ใน Storybook
- **รีวิว `demo.tsx` ซ้ำ:**
  - **ข้อ 2:** can't check ลดจาก 8 เหลือ 7 เพราะ props ของ AlertDialog ใน demo (`render`, `onClick`) ตรวจกับ `AlertDialog.md:64-75` ได้แล้ว
  - **ข้อ 4:** ยัง fail เพราะโค้ด demo ไม่ได้แก้ แต่ตอนนี้อ้างกฎของ component เองได้ตรง (`demo.tsx:153` ↔ `AlertDialog.spec.ts:59`) และเจอจุดที่ 2 ที่ก่อนหน้านี้ไม่มีกฎให้เทียบ: หัวเรื่อง "Are you sure?" (`demo.tsx:146`) ไม่บอกว่าจะลบอะไร ↔ `AlertDialog.spec.ts:63`
- **ผลก่อน → หลัง:** failed checks 3 → 3 แต่ fail ที่ไม่มีคู่มือรองรับกลายเป็น fail ที่มีกฎตรงตัว และพบปัญหาเพิ่ม 1 จุด ส่วน can't check ลดลง 1 ถ้าให้ AI เขียน demo ใหม่ตามคู่มือ (ขั้น "compose + review" ในสไลด์) ข้อ 4 ควรผ่าน ยังไม่ได้ทำ เพราะตกลงกันว่าไม่แก้โค้ด

## คนตัดสินต่างจาก AI

- **`grid-cols-[auto_1fr]` (รอบ 2 ข้อ 3):** ตามตัวอักษรของ SKILL คือ fail แต่เป็นค่าจัดวางที่ไม่มี token แทน ถ้ายอมให้ใช้ ต้องแก้ SKILL ข้อ 3 ให้ห้ามเฉพาะค่าสีและค่าขนาด
- **ไม่มีข้อความไทยยาว (ข้อ 5 ทุกรอบ):** AI นับเป็น fail แต่เงื่อนไข fail ใน SKILL ข้อ 5 ไม่ได้เขียนกรณีนี้ไว้ตรงๆ ถ้อยคำกำกวม เป็นตัวเลือกของการแก้คู่มือ 1 จุด
- **`AlertDialogAction` (รอบ 3 ข้อ 4):** น่าจะเป็นปัญหาจริงที่แก้คุ้มที่สุด ทางแก้ที่ต้นเหตุคือเขียนคู่มือ AlertDialog ให้บอก `variant` ของปุ่มยืนยัน (ตอนนี้ยังไม่มีคู่มือ)
