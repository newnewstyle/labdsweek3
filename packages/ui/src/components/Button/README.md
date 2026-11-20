# Button

ปุ่มหลักของ design system นี้ สร้างบน `Button` ของ Base UI (`@base-ui/react/button`) และจัดสไตล์ทั้งหมดด้วย CSS Module

```tsx
import { Button } from "@scope/ui"

<Button>บันทึก</Button>
```

ดูตัวอย่างจริงได้ที่ `apps/docs` (`pnpm dev`)

---

## 1. โครงสร้างไฟล์

```
packages/ui/src/components/Button/
├── Button.tsx          # markup + props (ไม่มี Tailwind class)
├── Button.module.css   # สไตล์ทั้งหมด
├── index.ts            # re-export
└── README.md           # ไฟล์นี้
```

| ไฟล์ | หน้าที่ |
| --- | --- |
| `Button.tsx` | รับ `variant` / `size` แล้วแปลงเป็น `data-variant` / `data-size` บน element ตั้ง `data-slot="button"` และรวม `className` ด้วย `cn(styles.button, className)` |
| `Button.module.css` | ใช้ `@reference` ไปที่ `src/styles/reference.css` เพื่อให้ `@apply` ใช้ token ได้ ทุก rule อยู่ใน `@layer components` |
| `index.ts` | `export * from "./Button"` แล้ว export ต่อจาก `src/index.ts` ของแพ็กเกจ |

### สิ่งที่ render ออกมา

```html
<button
  data-slot="button"
  data-variant="default"
  data-size="default"
  class="Button_button__xYz …"
>
  บันทึก
</button>
```

- **`data-slot="button"`** ใช้ให้ component อื่นอ้างถึงปุ่มได้ เช่น `ButtonGroup`
- **`data-variant` / `data-size`** เป็นตัวเลือกสไตล์ CSS (`.button[data-variant="outline"]`) ไม่ได้ใช้ class หรือ `cva`

---

## 2. Props

```ts
type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant // ค่าเริ่มต้น "default"
  size?: ButtonSize       // ค่าเริ่มต้น "default"
}
```

รับ props ทั้งหมดของ Base UI Button ด้วย (`disabled`, `render`, `nativeButton`, `onClick`, `aria-*` …) type ที่ export ออกมา: `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`

### Variant

| `variant` | ใช้เมื่อ | พื้นหลัง | ตัวอักษร | ตอน hover |
| --- | --- | --- | --- | --- |
| `default` | action หลักของหน้า (บันทึก, เพิ่มบ้าน) | `--primary` | `--primary-foreground` | `--primary` 80% |
| `outline` | action รอง, ปุ่มคู่กับปุ่มหลัก | `--background` + เส้น `--border` | ตามเดิม | `--muted` + `--foreground` |
| `secondary` | action รองที่ต้องการน้ำหนักมากกว่า outline | `--secondary` | `--secondary-foreground` | `--secondary` ผสม `--foreground` 5% |
| `ghost` | ปุ่มใน toolbar, เมนู, ปุ่มไอคอน | โปร่งใส | ตามเดิม | `--muted` + `--foreground` |
| `destructive` | ลบ, ยกเลิกสัญญา | `--destructive` 10% | `--destructive` | `--destructive` 20% |
| `link` | ลิงก์ในข้อความ | โปร่งใส | `--primary` | ขีดเส้นใต้ |

> `outline`, `secondary` และ `ghost` จะคงสี hover ไว้เมื่อ `aria-expanded="true"` (เช่นตอนเป็น trigger ของเมนูที่เปิดอยู่)

### Size

| `size` | ความสูง | padding แนวนอน | ตัวอักษร | ไอคอน | มุมโค้ง |
| --- | --- | --- | --- | --- | --- |
| `xs` | 24px (`h-6`) | 8px | `text-xs` | 12px | `min(--radius-md, 10px)` |
| `sm` | 28px (`h-7`) | 10px | 0.8rem | 14px | `min(--radius-md, 12px)` |
| `default` | 32px (`h-8`) | 10px | `text-sm` | 16px | `--radius-lg` |
| `lg` | 36px (`h-9`) | 10px | `text-sm` | 16px | `--radius-lg` |
| `icon-xs` | 24×24 | – | – | 12px | `min(--radius-md, 10px)` |
| `icon-sm` | 28×28 | – | – | 16px | `min(--radius-md, 12px)` |
| `icon` | 32×32 | – | – | 16px | `--radius-lg` |
| `icon-lg` | 36×36 | – | – | 16px | `--radius-lg` |

- ปุ่มขนาด `xs` / `sm` / `icon-xs` / `icon-sm` ที่อยู่ใน `[data-slot="button-group"]` จะกลับไปใช้มุม `--radius-lg` เพื่อให้กลุ่มปุ่มโค้งเท่ากัน
- **ปุ่มไอคอนต้องมี `aria-label`** เป็นภาษาไทยเสมอ เช่น `aria-label="แก้ไข"`

---

## 3. Tokens ที่ปุ่มใช้

Token ทั้งหมดอยู่ใน `packages/ui/src/styles/tokens.css` (เป็นแหล่งข้อมูลจริง) ค่าด้านล่างคัดมาจากไฟล์นั้น

### สี

| Token | Light (`:root`) | Dark (`[data-theme="dark"]`) | ใช้ใน |
| --- | --- | --- | --- |
| `--primary` | `oklch(0.555 0.163 48.998)` | `oklch(0.7 0.155 46.201)` | พื้น `default`, ตัวอักษร `link` (dark ปรับให้อ่อนลงเพื่อให้ `link` ผ่าน WCAG AA) |
| `--primary-foreground` | `oklch(0.987 0.022 95.277)` | `oklch(0.147 0.004 49.25)` | ตัวอักษร `default` (dark เป็นสีเข้ม เพราะพื้นส้มอ่อนลง) |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้น `secondary` |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | ตัวอักษร `secondary` |
| `--muted` | `oklch(0.97 0.001 106.424)` | `oklch(0.268 0.007 34.298)` | hover ของ `outline` / `ghost` |
| `--foreground` | `oklch(0.147 0.004 49.25)` | `oklch(0.985 0.001 106.423)` | ตัวอักษรตอน hover, สีผสมของ `secondary` |
| `--background` | `oklch(1 0 0)` | `oklch(0.147 0.004 49.25)` | พื้น `outline` (light) |
| `--border` | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)` | เส้นขอบ `outline` (light) |
| `--input` | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 15%)` | เส้นขอบและพื้น `outline` (dark) |
| `--destructive` | `oklch(0.49 0.2 27.325)` | `oklch(0.76 0.16 22.216)` | `destructive`, สถานะ `aria-invalid` (ปรับให้ผ่าน WCAG AA 4.5:1 ทั้งตอนปกติและ hover) |
| `--ring` | `oklch(0.709 0.01 56.259)` | `oklch(0.553 0.013 58.071)` | วง focus |

ปุ่มเรียก token ผ่าน utility ของ Tailwind (`bg-primary`, `text-destructive`, `ring-ring/50` …) ซึ่ง map ไว้ใน `@theme inline` เป็น `--color-<name>: var(--<name>)`

### มุมโค้ง

ทุกขั้นคำนวณจาก `--radius` ตัวเดียว (ค่าปัจจุบัน `0.625rem` = 10px)

| Token | สูตร | ค่าปัจจุบัน | ใช้ใน |
| --- | --- | --- | --- |
| `--radius-lg` | `var(--radius)` | 10px | ขนาด `default`, `lg`, `icon`, `icon-lg` |
| `--radius-md` | `calc(var(--radius) * 0.8)` | 8px | ขนาด `xs`, `sm`, `icon-xs`, `icon-sm` (ผ่าน `min()`) |

อยากให้ปุ่มโค้งมากขึ้นหรือน้อยลงทั้งระบบ ให้แก้ `--radius` ใน `:root` ที่เดียว

---

## 4. สถานะ (states)

| สถานะ | สไตล์ | หมายเหตุ |
| --- | --- | --- |
| Focus (คีย์บอร์ด) | เส้นขอบ `--ring` + วง `ring-3` สี `--ring` 50% | `destructive` ใช้สี `--destructive` แทน **ห้ามลบออก** |
| Active (กด) | เลื่อนลง 1px | ยกเว้นปุ่มที่มี `aria-haspopup` |
| Disabled | ความทึบ 50%, กดไม่ได้ | ใช้ prop `disabled` |
| Invalid | เส้นขอบและวงสี `--destructive` | ตั้ง `aria-invalid="true"` |

---

## 5. ไอคอน

- SVG ข้างในปุ่มได้ขนาดตาม size อัตโนมัติ (ถ้าไม่ได้ใส่ class `size-*` เอง) และไม่รับ pointer events
- ใส่ `data-icon="inline-start"` หรือ `data-icon="inline-end"` บนไอคอน เพื่อให้ปุ่มลด padding ฝั่งนั้นลงให้ดูสมดุล

```tsx
import { PlusIcon } from "lucide-react"

<Button>
  <PlusIcon data-icon="inline-start" />
  เพิ่มบ้านเช่า
</Button>
```

---

## 6. ตัวอย่างการใช้งาน

```tsx
// ปุ่มหลัก + ปุ่มรอง
<Button>บันทึก</Button>
<Button variant="outline">ยกเลิก</Button>

// ปุ่มลบ
<Button variant="destructive">ลบผู้เช่า</Button>

// ปุ่มไอคอน
<Button size="icon" variant="ghost" aria-label="แก้ไข">
  <PencilIcon />
</Button>

// เป็นลิงก์ (ใช้ render prop ของ Base UI ไม่ใช่ asChild)
<Button nativeButton={false} render={<Link href="/dashboard" />}>
  เข้าสู่ระบบจัดการ
</Button>

// override ด้วย className (utility ชนะ module เสมอ เพราะอยู่ layer หลังกว่า)
<Button className="w-full">ส่งข้อความเตือน</Button>
```

> เมื่อใช้ `render` กับ element ที่ไม่ใช่ `<button>` (เช่น `<a>`, `<Link>`) ต้องใส่ `nativeButton={false}` เสมอ

---

## 7. วิธีปรับแต่ง

ลำดับที่ควรแก้ (จากกว้างไปแคบ):

1. **Token** ใน `tokens.css` เปลี่ยนทุกที่ที่ใช้ token นั้น ทั้งสองธีม ถ้าเพิ่ม token ใหม่ ต้องแก้ 3 ที่: `:root`, `[data-theme="dark"]` และ `@theme inline`
2. **`Button.module.css`** เปลี่ยนเฉพาะปุ่ม เพิ่ม variant ใหม่ได้ด้วย `.button[data-variant="…"]` แล้วเพิ่มค่าใน `ButtonVariant` ที่ `Button.tsx` และเพิ่ม demo ใน `apps/docs`
3. **`className`** ที่จุดใช้งาน สำหรับกรณีเฉพาะหน้าเดียว

ข้อห้าม:

- ไม่ใส่ Tailwind class ใน `Button.tsx`
- ไม่เขียน rule นอก `@layer components` (ไม่งั้น `className` จะ override ไม่ได้)
- ไม่ใช้สี palette ดิบหรือ hex ให้ใช้ token เท่านั้น
- ไม่ใช้ `group-*` / `peer-*` ใน `@apply`
