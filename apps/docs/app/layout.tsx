import { Toaster, TooltipProvider } from "@newnewstyle/ui";
import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Sans_Thai } from "next/font/google";

import "./globals.css";

// Same font setup as the original app: @newnewstyle/ui's tokens read these variable names.
const fontSans = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "@newnewstyle/ui",
  description: "Docs and playground for the @newnewstyle/ui design system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="antialiased">
        {/* Same providers as the original app's root layout. */}
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
