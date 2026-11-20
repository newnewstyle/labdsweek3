import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "@scope/ui",
  description: "Docs and playground for the @scope/ui design system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
