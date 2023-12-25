import http from "@/utils/http";
import React from "react";
import RoutListing from "./Items/RoutListing";
const getData = async () => {
  try {
    const resT = await http.get("CategoryType/GetAll");
    const res = await http.get(`Category/GetAll/${resT.data[1]?.name}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const RoutFull = async ({}) => {
  const data: { categoryName: string; categoryId: number }[] = await getData();
  return (
    <RoutListing
      currentPath="Tin tức"
      category="news"
      title="Tin tức"
      defaultR="Đã xem"
      cate={data.map((r) => ({
        categoryId: r.categoryId,
        categoryName: r.categoryName,
      }))}
    />
  );
};

export default RoutFull;
