import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin", "thai"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = IBM_Plex_Sans_Thai({
  variable: "--font-body",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const description =
  "เข้าสู่จักรวาลเกมของ XMAN Studio สำรวจทุกโลกเกม เล่นเดโม X-NOVA, X-NOVA: BREAKER, THE ONE, NOVA·UMBRA และอีกหลายเกมบนเบราว์เซอร์ โดยมีโนวาเป็นไกด์";

export const metadata: Metadata = {
  metadataBase: new URL("https://xmangameshub.online"),
  title: "XMAN GAMES HUB — Worlds await.",
  description,
  openGraph: {
    title: "XMAN GAMES HUB — Worlds await.",
    description,
    url: "/",
    siteName: "XMAN GAMES HUB",
    locale: "th_TH",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "XMAN GAMES HUB" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#07080f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${display.variable} ${body.variable}`} data-motion="on">
      <body>{children}</body>
    </html>
  );
}
