"use client";
import RoutListing from "@/components/Items/RoutListing";
import Routing from "@/components/Items/Routing";
import React, { useState } from "react";
import styles from "../styleHomePage.module.scss";
import YouTube from "react-youtube";
import { SiShopee } from "react-icons/si";
import InputSearch from "@/components/Items/InputSearch";
import Link from "next/link";
const page = () => {
  return (
    <div className="w-full md:w-[46%] min-[1000px]:w-[59%] p-3 flex items-center justify-center">
      Vui lòng chọn danh mục bện cạnh
    </div>
  );
};

export default page;
