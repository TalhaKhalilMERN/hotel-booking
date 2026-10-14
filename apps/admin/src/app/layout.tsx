import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminSidebar from "@/components/layout/AdminSidebar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamilton Hotel — Admin",
  description: "Internal hotel management panel for Hamilton Hotel & Suites.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="admin-content flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
