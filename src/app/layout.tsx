import type { Metadata, Viewport } from "next";
import { Kanit, Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "XgamesHub",
  description: "XgamesHub — ก้าวเข้าสู่โลกของเกม ไปกับ Nova",
};

export const viewport: Viewport = {
  themeColor: "#05010f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${orbitron.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
