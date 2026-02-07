import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const grotesk = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Jesús C. Aguilar",
  description: "Writer, Student and Tech Man"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${grotesk.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
