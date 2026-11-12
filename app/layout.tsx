import type { Metadata } from "next";
import { Cairo } from "next/font/google"; // 👈 استيراد الخط
import "./globals.css";
import Header from "@/components/Header";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  title: "وظائف  | Syria  Jobs",
  description: "وظائف  من قنوات تيليجرام والمواقع السورية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className={cairo.className}>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}