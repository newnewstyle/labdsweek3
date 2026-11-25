# Tabs

เอกสารการใช้งานสำหรับนักออกแบบและ AI agent ที่สร้าง UI · ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Tabs`

---

**กฎการใช้ (Purpose, When to use, When not to use และการตัดสินใจ) อยู่ใน `Tabs.spec.ts`** ไฟล์นี้เก็บเฉพาะวิธี import, props, tokens และตัวอย่าง เพื่อไม่ให้กฎซ้ำกัน 2 ที่ หน้า Docs ใน Storybook แสดงทั้งสองไฟล์ต่อกัน

---

## Import and usage (วิธี import และใช้งาน)

1. Import ทั้ง 4 ชิ้นส่วนจากแพ็กเกจ `@scope/ui`

   ```tsx
   import {
     Tabs,
     TabsContent,
     TabsList,
     TabsTrigger,
   } from "@scope/ui"
   ```

2. ประกอบตามลำดับ: `Tabs` ครอบทั้งหมด → `TabsList` ที่มี `TabsTrigger` → `TabsContent` แต่ละหมวด แท็บกับเนื้อหาจับคู่กันด้วย `value` เดียวกัน และตั้งแท็บเริ่มต้นด้วย `defaultValue`

   ```tsx
   <Tabs defaultValue="info">
     <TabsList>
       <TabsTrigger value="info">ข้อมูลบ้าน</TabsTrigger>
       <TabsTrigger value="tenant">ผู้เช่า</TabsTrigger>
     </TabsList>
     <TabsContent value="info">3 ห้องนอน 2 ห้องน้ำ</TabsContent>
     <TabsContent value="tenant">สมชาย ใจกว้าง</TabsContent>
   </Tabs>
   ```

3. ถ้าต้องรู้ว่าตอนนี้อยู่แท็บไหน (เช่น เก็บไว้ใน URL) ใช้ `value` คู่กับ `onValueChange` แทน `defaultValue`

---

## 4. Props and variants

Tabs ประกอบด้วย 4 ชิ้นส่วน: `Tabs` (ตัวครอบ), `TabsList` (แถบแท็บ), `TabsTrigger` (แท็บแต่ละอัน), `TabsContent` (เนื้อหาของแต่ละแท็บ)

| ชิ้นส่วน      | prop                      | ค่า                             | ค่าเริ่มต้น  | ผล                                                 |
| ------------- | ------------------------- | ------------------------------- | ------------ | -------------------------------------------------- |
| `Tabs`        | `defaultValue`            | ค่า `value` ของแท็บแรกที่จะเปิด | –            | แท็บที่เปิดตอนแรก                                  |
| `Tabs`        | `value` + `onValueChange` | ค่าของแท็บ                      | –            | คุมแท็บที่เปิดเอง                                  |
| `Tabs`        | `orientation`             | `horizontal`, `vertical`        | `horizontal` | แท็บเรียงแนวนอนเหนือเนื้อหา หรือแนวตั้งข้างเนื้อหา |
| `TabsList`    | `variant`                 | `default`, `line`               | `default`    | หน้าตาของแถบ (ดูตารางด้านล่าง)                     |
| `TabsTrigger` | `value`                   | ค่าที่ไม่ซ้ำกัน                 | –            | ผูกกับ `TabsContent` ที่ `value` เดียวกัน          |
| `TabsTrigger` | `disabled`                | –                               | –            | แท็บจางลงครึ่งหนึ่งและกดไม่ได้                     |
| `TabsContent` | `value`                   | ค่าเดียวกับแท็บ                 | –            | เนื้อหาที่แสดงเมื่อแท็บนั้นเปิด                    |
| `TabsContent` | `keepMounted`             | –                               | ปิด          | เก็บเนื้อหาไว้ตอนแท็บซ่อน ข้อมูลในฟอร์มไม่หาย      |

**`variant` ของ `TabsList`**

| variant   | หน้าตา                                         | contrast ตัวอักษรแท็บที่ไม่ได้เลือก (สว่าง / มืด) |
| --------- | ---------------------------------------------- | ------------------------------------------------- |
| `default` | แถบพื้นเทาอ่อน แท็บที่เลือกเป็นพื้นขาวมีเงาบาง | 5.10 / 5.87                                       |
| `line`    | ไม่มีพื้น แท็บที่เลือกมีเส้นใต้สีตัวอักษรหลัก  | 5.24 / 7.64                                       |

แท็บที่เลือกอยู่ใช้ตัวอักษรสีหลัก (contrast 19.75 บนพื้นขาว) ค่า contrast ทั้งหมดวัดจากหน้า Storybook จริง ผ่านเกณฑ์ 4.5:1

**ไอคอนในแท็บ:** ใส่ `data-icon="inline-start"` หรือ `"inline-end"` บนไอคอน แท็บจะปรับระยะขอบฝั่งนั้น ไอคอนขนาด 16px

**ทำให้เองโดยไม่ต้องตั้งค่า**

- กด Tab เข้ามาที่แถบ แล้วใช้ลูกศรซ้าย/ขวา (แนวตั้ง: ขึ้น/ลง) ย้ายระหว่างแท็บ กด Enter หรือ Space เพื่อเปิด
- ผูกแท็บกับเนื้อหาให้โปรแกรมอ่านหน้าจอรู้ว่าแท็บไหนคุมเนื้อหาไหน

---

## 5. Tokens used

| Token                | สว่าง                       | มืด                          | ใช้กับ                                                                                   |
| -------------------- | --------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `--muted`            | `oklch(0.97 0.001 106.424)` | `oklch(0.268 0.007 34.298)`  | พื้นแถบ `default`                                                                        |
| `--muted-foreground` | `oklch(0.553 0.013 58.071)` | `oklch(0.709 0.01 56.259)`   | ตัวอักษรแท็บที่ไม่ได้เลือก (โหมดมืด)                                                     |
| `--foreground`       | `oklch(0.147 0.004 49.25)`  | `oklch(0.985 0.001 106.423)` | ตัวอักษรแท็บที่เลือก, เส้นใต้ `line`, ตัวอักษรแท็บที่ไม่ได้เลือก (โหมดสว่าง ความทึบ 60%) |
| `--background`       | `oklch(1 0 0)`              | `oklch(0.147 0.004 49.25)`   | พื้นแท็บที่เลือก (โหมดสว่าง)                                                             |
| `--input`            | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 15%)`         | พื้นและขอบแท็บที่เลือก (โหมดมืด)                                                         |
| `--ring`             | `oklch(0.709 0.01 56.259)`  | `oklch(0.553 0.013 58.071)`  | วง focus                                                                                 |
| `--radius`           | `0.625rem` (10px)           | –                            | มุมโค้งแถบและแท็บ                                                                        |

---

## 6. Example

จาก story `Default`:

```tsx
<Tabs defaultValue="info" orientation="horizontal">
  <TabsList variant="default">
    <TabsTrigger value="info">ข้อมูลบ้าน</TabsTrigger>
    <TabsTrigger value="tenant">ผู้เช่า</TabsTrigger>
    <TabsTrigger value="repair" disabled>
      แจ้งซ่อม
    </TabsTrigger>
  </TabsList>
  <TabsContent value="info">3 ห้องนอน 2 ห้องน้ำ</TabsContent>
  <TabsContent value="tenant">สมชาย ใจกว้าง</TabsContent>
  <TabsContent value="repair">ไม่มีรายการ</TabsContent>
</Tabs>
```
