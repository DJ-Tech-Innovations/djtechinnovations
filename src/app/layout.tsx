import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DJ Tech Innovations | Custom Software and Business Applications",
  description:
    "DJ Tech Innovations builds custom web applications, business software, mobile apps, and automation solutions to help businesses streamline operations and grow.",
  icons: { icon: "/Icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0b1120" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
