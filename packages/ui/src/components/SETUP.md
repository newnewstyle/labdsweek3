# ตั้งค่าครั้งเดียวในแอป (ใช้ร่วมกันทุกคอมโพเนนต์)

ทำครั้งเดียวต่อแอป แล้วทุก component ใน `@scope/ui` ใช้ได้ทันที (รายละเอียดภาษาอังกฤษอยู่ใน `packages/ui/README.md`)

1. **ติดตั้งแพ็กเกจ** `@scope/ui` พร้อม peer dependencies: `react`, `react-dom` (19), `next-themes` และ Tailwind CSS v4 ในแอป ส่วน `@base-ui/react`, `lucide-react`, `sonner` ฯลฯ ติดมากับแพ็กเกจแล้ว

   ```bash
   pnpm add @scope/ui
   ```

2. **import สไตล์ครั้งเดียว** ในไฟล์ CSS หลักของแอป ต่อจาก Tailwind (token สี, มุมโค้ง และสไตล์ทุก component อยู่ในไฟล์นี้)

   ```css
   @import "tailwindcss";
   @import "@scope/ui/styles.css";
   ```

3. **ฟอนต์ IBM Plex Sans Thai** แพ็กเกจโหลดฟอนต์เองไม่ได้ ให้แอปโหลดด้วย `next/font/google` เป็นตัวแปร `--font-plex-thai` แล้วใส่ตัวแปรกับ class `font-sans` ที่ `<html>` ถ้าไม่ตั้ง จะใช้ฟอนต์ของระบบแทน

4. **โหมดมืด** ใช้ attribute `data-theme="dark"` ที่ `<html>` (ไม่ใช่ class `dark`) ถ้าใช้ `next-themes` ให้ตั้ง `attribute="data-theme"`

5. **ตัวครอบที่บาง component ต้องใช้:** `TooltipProvider` (สำหรับ Tooltip) และวาง `<Toaster />` ครั้งเดียว (สำหรับ `toast`)

   ```tsx
   import { Toaster, TooltipProvider } from "@scope/ui"

   <ThemeProvider attribute="data-theme">
     <TooltipProvider>{children}</TooltipProvider>
     <Toaster />
   </ThemeProvider>
   ```
