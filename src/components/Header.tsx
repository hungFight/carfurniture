"use client";
import { Images } from "@/asset/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full 2xl:w-[1519px] bg-white flex justify-center h-auto sm:h-[125px] pt-4 border-b-2">
      <div className="w-[80%] max-sm:w-full h-auto flex justify-between items-center sm:h-10 relative sm:pl-[93px] flex-wrap">
        <div className="flex max-sm:pl-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mr-2.5 sm:absolute left-0">
            <Image
              src={Images.logo}
              alt="car"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold">mazdashop.vn</h1>
            <p className="text-xs">chuyên cung cấp các đồ chơi xe chính hãng</p>
          </div>
        </div>
        <div className="flex max-sm:absolute max-sm:top-[5px] max-sm:right-11 ">
          <p className="text-sm">Login</p>
        </div>
        <div className="flex w-full max-sm:pl-[78px] max-sm:flex-wrap max-sm:justify-start sm:w-auto sm:absolute -bottom-11 left-[19%] md:left-[30%] justify-around sm:mt-3">
          <Link
            href="/"
            className="header_home text-[#3a3b3b]  text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]"
            onClick={(e: any) => {
              const hear = document.querySelectorAll(".header_home");
              Array.from(hear).map((h: any) => {
                h.style.color = "#3a3b3b";
              });
              e.target.style.color = "#42aaea";
            }}
          >
            Trang chủ
          </Link>
          <Link
            href="/news"
            className="header_home text-[#3a3b3b]  text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]"
            onClick={(e: any) => {
              const hear = document.querySelectorAll(".header_home");
              Array.from(hear).map((h: any) => {
                h.style.color = "#3a3b3b";
              });
              e.target.style.color = "#42aaea";
            }}
          >
            Tin tức
          </Link>
          <Link
            href="/products"
            className="header_home text-[#3a3b3b]  text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]"
            onClick={(e: any) => {
              const hear = document.querySelectorAll(".header_home");
              Array.from(hear).map((h: any) => {
                h.style.color = "#3a3b3b";
              });
              e.target.style.color = "#42aaea";
            }}
          >
            Danh sách sản phẩm
          </Link>
          <Link
            href="/guides"
            className="header_home  text-[#3a3b3b] text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]"
            onClick={(e: any) => {
              const hear = document.querySelectorAll(".header_home");
              Array.from(hear).map((h: any) => {
                h.style.color = "#3a3b3b";
              });
              e.target.style.color = "#42aaea";
            }}
          >
            Hưỡng dẫn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
