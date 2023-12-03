import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaPhone } from "react-icons/fa6";
import http from "@/utils/http";
import dynamic from "next/dynamic";
const RoutListing = dynamic(() => import("@/components/Items/RoutListing"));

const getData = async () => {
  const res = await http.get("Category/GetAll/Tin tức");
  return res.data;
};
export const metadata: Metadata = {
  title: "Tin tức",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: { categoryName: string }[] = await getData();
  return (
    <div className="flex flex-wrap">
      <RoutListing
        currentPath="news"
        title="Tin tức"
        cate={data.map((r) => r.categoryName)}
      />
      {children}
    </div>
  );
}
