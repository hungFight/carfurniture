"use client";
import styles from "./styleHomePage.module.scss";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components

import SlideHome from "@/components/Slide/SlideHome";
import Image from "next/image";
import InputSearch from "@/components/Items/InputSearch";
import SlideCategory from "@/components/Slide/SlideCategory";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
import Link from "next/link";
export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProducts, setDataProducts] = useState<
    {
      id: number;
      name: string;
      price: number;
      price_After: number;
      description: string;
      urlShoppe: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataNews, setDataNews] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [dataGuid, setDataGuid] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataList, setDataList] = useState<{ id: number; name: string }[]>([]);
  const [caseChose, setCaseChose] = useState<{
    product: { categoryId: number; categoryName: string };
    news: { categoryId: number; categoryName: string };
    guide: { categoryId: number; categoryName: string };
  }>({
    product: { categoryId: 0, categoryName: "" },
    news: { categoryId: 0, categoryName: "" },
    guide: { categoryId: 0, categoryName: "" },
  });
  const [loadingType, setLoadingType] = useState<boolean>(false);
  const fetS = async () => {
    setDataList([]);
    setLoadingType(true);
    const resCatePr = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/Sản phẩm`);
    const resCateNews = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/Tin tức`);
    const resCateGuide = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/Hướng dẫn`);
    setCaseChose({
      product: resCatePr.data[0],
      news: resCateNews.data[0],
      guide: resCateGuide.data[0],
    });
    fetSDataProduct();
    setDataList(
      resCatePr.data.map((r) => ({ id: r.categoryId, name: r.categoryName }))
    );
    const resNews = await http.post("Blog/GetPaginationProduct", {
      pageIndex: 1,
      pageSize: 4,
      search_CategoryName: caseChose.news.categoryName,
    });
    setDataNews(resNews.data.data);
    const resGuide = await http.post("Guide/GetPaginationProduct", {
      pageIndex: 1,
      pageSize: 4,
      search_CategoryName: caseChose.guide.categoryName,
    });
    setDataGuid(resGuide.data.data);
    setLoadingType(false);
  };
  const fetSDataProduct = async (index: number = 1, name?: string) => {
    if (name) {
      setLoading(true);
      const res = await http.post("Product/GetPaginationProduct", {
        search_Name: name,
      });
      setPageIndex(res.data.totalPageIndex);
      setDataProducts(res.data.data);
      setLoading(false);
    } else {
      const res = await http.post("Product/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 8,
        search_CategoryName: caseChose.product.categoryName,
      });
      setPageIndex(res.data.totalPageIndex);
      setDataProducts(res.data.data);
    }
  };
  useEffect(() => {
    fetS();
  }, []);
  const handle = (v: number) => {
    const cases = dataList
      .filter((r) => r.id === v)
      .map((r) => ({ categoryId: r.id, categoryName: r.name }))[0];
    setCaseChose({ ...caseChose, product: cases });
    fetSDataProduct();
  };
  console.log(
    Array.from({ length: pageIndex }, (_, index) => index + 1),
    "page size"
  );
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    fetSDataProduct(1, search);
  };
  return (
    <div className="w-full 2xl:w-[1519px]">
      <SlideHome />
      <div className="w-full h-40 bg-black flex flex-wrap">
        <div className="w-full pt-1 sm:w-[40%] sm:p-3 h-fit sm:h-full flex items-center justify-center">
          <p className="text-white">
            Các úng dụng và phần mềm hỗ trợ khác như ...
          </p>
        </div>
        <div className="w-full sm:w-[60%] h-fit sm:h-full flex items-center justify-center">
          <div>
            <div className="w-[150px] md:w-[190px] h-[40px] bg-[#d8ab6e] m-2 rounded-md"></div>
            <div className="w-[150px] md:w-[190px] h-[40px] bg-[crimson] m-2 rounded-md"></div>
          </div>
          <div>
            <div className="w-[150px] md:w-[190px] h-[40px] bg-[#4ce5ea] m-2 rounded-md"></div>
            <div className="w-[150px] md:w-[190px] h-[40px] bg-white m-2 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className=" w-full mb-[100px] flex justify-center">
        <div className="w-full sm:w-[90%] ">
          <div className="w-full mt-2 mb-1">
            <h3 className="w-full pl-1 font-semibold text-base xl:text-lg">
              Danh sách sản phẩm
            </h3>
            <SlideCategory
              loading={loading}
              data={dataList}
              onClick={handle}
              active={caseChose.product.categoryId}
            />
          </div>
          <div className="w-full text-center flex items-center justify-center mb-3 p-2 flex-wrap ">
            <div className="w-full">
              <InputSearch
                placeholder="Tìm kiếm sản phẩm"
                onChange={handleSearch}
                onClick={handleClick}
                loading={loading}
              />
            </div>
            <div className="w-full h-fit flex justify-center pb-1 border-b mt-2">
              {Array.from({ length: pageIndex }, (_, index) => index + 1).map(
                (p) => (
                  <div
                    key={p}
                    className="flex"
                    onClick={() => {
                      if (p !== pageChoice) {
                        fetSDataProduct(p);
                        setPageChoice(p);
                      }
                    }}
                  >
                    <p
                      className={`mx-1 px-[5px] hover:bg-[#d2d5d8] border border-[#2b2b2b] rounded-[5px]  ${
                        pageChoice === p ? "bg-[#d2d5d8]" : ""
                      } cursor-pointer`}
                    >
                      {p}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <div className="w-full flex flex-wrap mt-7 px-1 justify-center">
              {!loadingType ? (
                dataProducts.map((r, index) => (
                  <Link
                    href="/[slug]"
                    as={`products/${caseChose.product.categoryName}/${r.name}/${r.id}`}
                    key={r.id}
                    className={`w-[200px] ${
                      dataProducts.length === index + 1 ? "" : "mr-4"
                    } md:w-[300px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer`}
                  >
                    <div className="w-full h-[200px] md:h-[280px]">
                      <img
                        src={r.urlImage[0]?.image}
                        alt={r.urlImage[0]?.path}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`mt-1 ${styles.containerProductTag}`}>
                      <h3
                        className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                      >
                        {r.name}
                      </h3>
                      <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                        <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                          {r.price.toLocaleString("en-US").replace(/,/g, ".")}
                        </p>
                        {r.price_After && (
                          <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                            {r.price_After
                              .toLocaleString("en-US")
                              .replace(/,/g, ".")}
                          </p>
                        )}
                      </div>
                      <p
                        className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
                      >
                        {" "}
                        <strong className="text-[crimson]">*</strong>
                        Lamborghini Urus 2023 có đầy đủ những phẩm chất ưu việt
                        của một chiếc siêu xe hàng đầu. Nhưng nhiều người vẫn
                        cho rằng các mẫu siêu SUV không phải là thế mạnh của
                        Lamborghini và Urus 2023 sẽ bị lép vế trước những mẫu xe
                        gầm thấp đã làm nên tên tuổi của thương hiệu
                      </p>
                    </div>
                    <div className="my-2 flex items-center justify-center relative">
                      <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                        View more
                      </button>
                      <a
                        href="#"
                        className="absolute top-[5px] right-[10px] md:right-[40px]"
                        style={{ color: "crimson !important" }}
                      >
                        <SiShopee />
                      </a>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Loading...</p>
              )}{" "}
            </div>
          </div>{" "}
          <div className="flex mt-3 flex-wrap max-h-[785px] h-auto overflow-hidden border-b">
            <div
              className={`w-1/2 h-fit flex flex-wrap justify-around ${styles.news}`}
            >
              <h3 className="text-base w-full font-semibold text-center my-5">
                Tin tuc
              </h3>
              <div className="flex flex-wrap justify-around">
                {dataNews.map((n) => (
                  <Link
                    href={`news/${caseChose.news.categoryName}/${n.name}/${n.id}`}
                    key={n.id}
                    className="w-[200px] xl:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mr-2"
                  >
                    <div className="w-full h-[180px] xl:[200px]">
                      <img
                        src={n.urlImage[0]?.image}
                        alt={n.urlImage[0]?.path}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`mt-1 ${styles.containerProductTag}`}>
                      <h3 className={`font-bold text-sm  ${styles.nameTag}`}>
                        {n.name}
                      </h3>
                      <div
                        className={`text-[13px] ${styles.desTag}`}
                        dangerouslySetInnerHTML={{
                          __html:
                            ' <strong className="text-[crimson]">*</strong>' +
                            n.content,
                        }}
                      ></div>
                    </div>
                    <div className="my-2 flex items-center justify-center relative">
                      <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                        View more
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>{" "}
            <div
              className={`w-1/2 h-fit flex flex-wrap justify-around ${styles.news}`}
            >
              <h3 className="text-base w-full font-semibold text-center my-5">
                Huong dan
              </h3>
              <div className="flex flex-wrap justify-around">
                {dataGuid.map((n) => (
                  <Link
                    href={`guide/${caseChose.product.categoryName}/${n.name}/${n.id}`}
                    key={n.id}
                    className="w-[200px] xl:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mr-2"
                  >
                    <div className="w-full h-[180px] xl:[200px]">
                      <img
                        src={n.urlImage[0]?.image}
                        alt={n.urlImage[0]?.path}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`mt-1 ${styles.containerProductTag}`}>
                      <h3 className={`font-bold text-sm  ${styles.nameTag}`}>
                        {n.name}
                      </h3>
                      <div
                        className={`text-[13px] ${styles.desTag}`}
                        dangerouslySetInnerHTML={{
                          __html:
                            ` <strong className="text-[crimson]">*</strong>` +
                            n.content,
                        }}
                      ></div>
                    </div>
                    <div className="my-2 flex items-center justify-center relative">
                      <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                        View more
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
