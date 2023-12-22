import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CookiesProvider } from "next-client-cookies/server";
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full ">
          <CookiesProvider>
            <Header />
          </CookiesProvider>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
