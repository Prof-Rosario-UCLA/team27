import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const recursive = Recursive ({
  weight: ["400", "700"],
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jarvis",
  description: "CS 144 Final Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${recursive.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
