// Field links its label, description and error to the control inside it, so callers no longer
// need ids. Explicit props always win; outside a Field the controls are unchanged.
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Checkbox,
  Combobox,
  ComboboxInput,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
  Input,
  RadioGroup,
  RadioGroupItem,
  InputGroup,
  InputGroupInput,
  Select,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "../../index";

describe("Field wiring", () => {
  it("labels and describes an Input without ids", () => {
    render(
      <Field>
        <FieldLabel>เบอร์โทร</FieldLabel>
        <Input />
        <FieldDescription>ใช้ส่ง SMS</FieldDescription>
      </Field>,
    );
    const input = screen.getByLabelText("เบอร์โทร");
    expect(input).toHaveAccessibleDescription("ใช้ส่ง SMS");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("marks the control invalid and describes it with the error", () => {
    render(
      <Field data-invalid>
        <FieldLabel>เบอร์โทร</FieldLabel>
        <Input />
        <FieldError>ต้องมี 10 หลัก</FieldError>
      </Field>,
    );
    const input = screen.getByLabelText("เบอร์โทร");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("ต้องมี 10 หลัก");
  });

  it("reads the hint before the error when both are shown", () => {
    render(
      <Field data-invalid>
        <FieldLabel>ค่าเช่า</FieldLabel>
        <Input />
        <FieldDescription>บาทต่อเดือน</FieldDescription>
        <FieldError>กรอกค่าเช่า</FieldError>
      </Field>,
    );
    expect(screen.getByLabelText("ค่าเช่า")).toHaveAccessibleDescription(
      "บาทต่อเดือน กรอกค่าเช่า",
    );
  });

  it("drops an empty FieldError from the description", () => {
    render(
      <Field>
        <FieldLabel>ชื่อ</FieldLabel>
        <Input />
        <FieldError />
      </Field>,
    );
    expect(screen.getByLabelText("ชื่อ")).not.toHaveAttribute("aria-describedby");
  });

  it("keeps ids and aria the caller passes", () => {
    render(
      <Field data-invalid>
        <FieldLabel htmlFor="phone">เบอร์โทร</FieldLabel>
        <Input id="phone" aria-describedby="own-hint" aria-invalid={false} />
        <p id="own-hint">คำอธิบายของฉัน</p>
        <FieldError>ผิด</FieldError>
      </Field>,
    );
    const input = screen.getByLabelText("เบอร์โทร");
    expect(input).toHaveAttribute("id", "phone");
    expect(input).toHaveAccessibleDescription("คำอธิบายของฉัน");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("wires a Checkbox next to FieldContent", () => {
    render(
      <Field orientation="horizontal">
        <Checkbox />
        <FieldContent>
          <FieldLabel>เตือนก่อนครบกำหนด</FieldLabel>
          <FieldDescription>ส่งทาง LINE</FieldDescription>
        </FieldContent>
      </Field>,
    );
    expect(
      screen.getByRole("checkbox", { name: "เตือนก่อนครบกำหนด" }),
    ).toHaveAccessibleDescription("ส่งทาง LINE");
  });

  it("wires Switch, Textarea, InputGroupInput and SelectTrigger", () => {
    render(
      <>
        <Field orientation="horizontal">
          <FieldLabel>ส่งอัตโนมัติ</FieldLabel>
          <Switch />
        </Field>
        <Field>
          <FieldLabel>หมายเหตุ</FieldLabel>
          <Textarea />
          <FieldDescription>ไม่เกิน 200 ตัวอักษร</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>ค่าเช่าในกลุ่ม</FieldLabel>
          <InputGroup>
            <InputGroupInput />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>ประเภทบ้าน</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
          </Select>
          <FieldDescription>ใช้จัดกลุ่มรายงาน</FieldDescription>
        </Field>
      </>,
    );
    expect(screen.getByRole("switch", { name: "ส่งอัตโนมัติ" })).toBeInTheDocument();
    expect(screen.getByLabelText("หมายเหตุ")).toHaveAccessibleDescription(
      "ไม่เกิน 200 ตัวอักษร",
    );
    expect(screen.getByLabelText("ค่าเช่าในกลุ่ม")).toHaveAttribute(
      "data-slot",
      "input-group-control",
    );
    expect(screen.getByLabelText("ประเภทบ้าน")).toHaveAccessibleDescription(
      "ใช้จัดกลุ่มรายงาน",
    );
  });

  it("gives each Field its own ids", () => {
    render(
      <>
        <Field>
          <FieldLabel>ก</FieldLabel>
          <Input />
        </Field>
        <Field>
          <FieldLabel>ข</FieldLabel>
          <Input />
        </Field>
      </>,
    );
    expect(screen.getByLabelText("ก").id).not.toBe(screen.getByLabelText("ข").id);
  });

  it("labels a Combobox input and describes it", () => {
    render(
      <Field>
        <FieldLabel>ผู้เช่า</FieldLabel>
        <Combobox items={["สมชาย", "สมหญิง"]}>
          <ComboboxInput />
        </Combobox>
        <FieldDescription>พิมพ์ชื่อเพื่อค้นหา</FieldDescription>
      </Field>,
    );
    expect(
      screen.getByRole("combobox", { name: "ผู้เช่า" }),
    ).toHaveAccessibleDescription("พิมพ์ชื่อเพื่อค้นหา");
  });

  it("gives the Field id to the first control only", () => {
    render(
      <Field data-invalid>
        <FieldLabel>วันเริ่มสัญญา</FieldLabel>
        <Input />
        <Input aria-label="วันสิ้นสุดสัญญา" />
        <FieldError>ช่วงวันที่ไม่ถูกต้อง</FieldError>
      </Field>,
    );
    const start = screen.getByLabelText("วันเริ่มสัญญา");
    const end = screen.getByRole("textbox", { name: "วันสิ้นสุดสัญญา" });
    expect(end.id).not.toBe(start.id);
    expect(document.querySelectorAll(`[id="${start.id}"]`)).toHaveLength(1);
    // both still get the shared error and invalid state
    expect(end).toHaveAccessibleDescription("ช่วงวันที่ไม่ถูกต้อง");
    expect(end).toHaveAttribute("aria-invalid", "true");
  });

  it("keeps the id in a single-control Field on first render", () => {
    const html = renderToString(
      <Field>
        <FieldLabel>ชื่อ</FieldLabel>
        <Input />
      </Field>,
    );
    const id = /for="([^"]+)"/.exec(html)?.[1];
    expect(id).toBeTruthy();
    expect(html).toContain(`id="${id}"`);
  });

  it("names and describes a RadioGroup and its options", () => {
    render(
      <Field data-invalid>
        <FieldLabel>ช่องทางส่งเตือน</FieldLabel>
        <RadioGroup>
          <Field orientation="horizontal">
            <RadioGroupItem value="line" />
            <FieldLabel>LINE</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="sms" />
            <FieldContent>
              <FieldLabel>SMS</FieldLabel>
              <FieldDescription>สำหรับผู้เช่าที่ไม่มี LINE</FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>
        <FieldError>เลือกช่องทาง</FieldError>
      </Field>,
    );
    const group = screen.getByRole("radiogroup", { name: "ช่องทางส่งเตือน" });
    expect(group).toHaveAccessibleDescription("เลือกช่องทาง");
    expect(group).toHaveAttribute("aria-invalid", "true");
    // options are wired by their own Field, not the one around the group
    const line = screen.getByRole("radio", { name: "LINE" });
    expect(line).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("radio", { name: "SMS" })).toHaveAccessibleDescription(
      "สำหรับผู้เช่าที่ไม่มี LINE",
    );
  });

  it("names a radio inside a choice card without ids", () => {
    render(
      <RadioGroup aria-label="ช่องทาง">
        <FieldLabel>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>อีเมล</FieldTitle>
              <FieldDescription>แนบใบแจ้งหนี้ได้</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="email" />
          </Field>
        </FieldLabel>
      </RadioGroup>,
    );
    const radio = screen.getByRole("radio", { name: /อีเมล/ });
    expect(radio).toHaveAccessibleDescription("แนบใบแจ้งหนี้ได้");
  });

  it("leaves controls outside a Field unchanged", () => {
    render(<Input aria-label="ค้นหา" />);
    const input = screen.getByRole("textbox", { name: "ค้นหา" });
    // (Base UI gives the input its own id; Field adds nothing.)
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(input).not.toHaveAttribute("aria-invalid");
  });
});
