import RoutFullGuid from "@/components/RoutFullGuid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng dẫn",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap ">
      <RoutFullGuid />
      {children}
    </div>
  );
}
