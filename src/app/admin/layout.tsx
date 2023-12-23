import http from "@/utils/http";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Quản trị",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CookiesProvider> {children}</CookiesProvider>
    </>
  );
}
