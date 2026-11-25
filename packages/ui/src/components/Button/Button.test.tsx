import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders a button with default variant and size", () => {
    render(<Button>บันทึก</Button>);
    const button = screen.getByRole("button", { name: "บันทึก" });
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-variant", "default");
    expect(button).toHaveAttribute("data-size", "default");
  });

  it("exposes variant and size as data attributes", () => {
    render(
      <Button variant="destructive" size="icon-sm" aria-label="ลบ">
        x
      </Button>,
    );
    const button = screen.getByRole("button", { name: "ลบ" });
    expect(button).toHaveAttribute("data-variant", "destructive");
    expect(button).toHaveAttribute("data-size", "icon-sm");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>บันทึก</Button>);
    await userEvent.click(screen.getByRole("button", { name: "บันทึก" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        บันทึก
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "บันทึก" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps a custom className", () => {
    render(<Button className="w-full">บันทึก</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("renders as another element through the render prop", () => {
    render(
      <Button nativeButton={false} render={<a href="/dashboard" />}>
        เข้าสู่ระบบจัดการ
      </Button>,
    );
    // Base UI keeps button semantics (role="button") on the rendered <a>.
    const link = screen.getByRole("button", { name: "เข้าสู่ระบบจัดการ" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link).toHaveAttribute("data-slot", "button");
  });

  it("can be announced as a link with role=\"link\"", () => {
    render(
      <Button nativeButton={false} role="link" render={<a href="/dashboard" />}>
        ไปหน้าภาพรวม
      </Button>,
    );
    expect(screen.getByRole("link", { name: "ไปหน้าภาพรวม" })).toHaveAttribute("href", "/dashboard");
  });

  it("loading shows a spinner, disables and marks the button busy", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        บันทึก
      </Button>,
    );
    const button = screen.getByRole("button", { name: "บันทึก" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
    expect(button.querySelector('[data-slot="button-spinner"]')).toBeInTheDocument();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading on an icon-only button replaces the icon with the spinner", () => {
    render(
      <Button loading size="icon" aria-label="ลบ">
        <svg data-testid="icon" />
      </Button>,
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ลบ" }).querySelector('[data-slot="button-spinner"]')).toBeInTheDocument();
  });
});
