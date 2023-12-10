"use client";
import InputSearch from "@/components/Items/InputSearch";
import React, { useEffect, useState } from "react";
import styles from "../../styleHomePage.module.scss";
import { SiShopee } from "react-icons/si";
import dynamic from "next/dynamic";
import Link from "next/link";
import http from "@/utils/http";

const page = (props: { params: { cate: string } }) => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageChoice, setPageChoice] = useState<number>(1);

  const [data, setData] = useState<
    {
      id: number;
      name: string;
      price: number;
      price_After: number;
      description: string;
      urlShoppe: string;
      urlImage: { image: string; path: string }[];
    }[]
  >();
  useEffect(() => {
    getProduct(props.params.cate);
  }, []);
  const getProduct = async (cate: string, index = 1, name?: string) => {
    if (name) {
      setLoading(true);
      const res = await http.post("Product/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 6,
        search_Name: name,
      });
      setLoading(false);
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
    } else {
      if (decodeURIComponent(cate) === "Đã xem") {
        if (localStorage) {
          const hasSeen: number[] =
            JSON.parse(localStorage.getItem("product") ?? JSON.stringify([])) ??
            [];
          if (hasSeen.length) {
            const res1 = await http.get<{
              product: {
                id: number;
                name: string;
                price: number;
                price_After: number;
                description: string;
                urlShoppe: string;
              };
              categoryName: string;
              urlImage: { image: string; path: string }[];
              info_in_AboutUs: [{ url_Mess: string; phone: string }];
            }>(`Product/GetByID/${hasSeen[0]}`);
            const res2: typeof res1 = await http.get(
              `Product/GetByID/${hasSeen[1]}`
            );
            console.log(res1.data);

            setPageIndex(0);
            setData([
              { ...res1.data.product, urlImage: res1.data.urlImage },
              { ...res2.data.product, urlImage: res2.data.urlImage },
            ]);
          }
        }
      } else {
        setLoadingSearch(true);
        const res = await http.post("Product/GetPaginationProduct", {
          pageIndex: index,
          pageSize: 6,
          search_CategoryName: decodeURIComponent(cate),
        });
        setPageIndex(res.data.totalPageIndex);
        setLoadingSearch(false);
        setData(res.data.data);
      }
    }
  };
  console.log(search, "props data");
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleAdd = () => {
    getProduct(props.params.cate, 1, search);
  };
  return (
    <>
      <div className="w-full min-[1200px]:w-[60%] p-3">
        {decodeURIComponent(props.params.cate) !== "Đã xem" && (
          <div className="w-full mb-4">
            <InputSearch
              placeholder={props.params.cate}
              onChange={handleSearch}
              onClick={handleAdd}
              loading={loading}
            />
          </div>
        )}
        <div className="w-full flex flex-wrap justify-center">
          <div className="w-full h-fit flex justify-center pb-1 border-b mb-1">
            {Array.from({ length: pageIndex }, (_, index) => index + 1).map(
              (p) => (
                <div
                  key={p}
                  className="flex w-auto h-fit"
                  onClick={() => {
                    if (p !== pageChoice) {
                      getProduct(props.params.cate, p);
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
          {!loadingSearch ? (
            data?.length ? (
              data?.map((p) => (
                <Link
                  key={p.id}
                  href="/[slug]"
                  as={`${props.params.cate}/${p.name}/${p.id}`}
                  className="w-[200px] m-3 md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer"
                  onClick={() => {
                    const h: number[] = JSON.parse(
                      localStorage.getItem("product") ?? JSON.stringify([])
                    );
                    h.unshift(p.id);
                    const newH = h.filter((s, index) => index !== 2);
                    localStorage.setItem("product", JSON.stringify(newH));
                  }}
                >
                  <div className="w-full h-[200px] md:h-[230px]">
                    {p.urlImage && (
                      <img
                        src={p.urlImage[0]?.image}
                        alt={p.urlImage[0]?.path}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className={`mt-1 ${styles.containerProductTag}`}>
                    <h3
                      className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                    >
                      {p.name}
                    </h3>
                    <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                      <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                        {p.price}đ
                      </p>
                      {p.price_After && (
                        <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                          {p.price_After}đ
                        </p>
                      )}
                    </div>
                    <p
                      className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
                    >
                      {" "}
                      <strong className="text-[crimson]">*</strong>
                      {p.description}
                    </p>
                  </div>
                  <div className="my-2 flex items-center justify-center relative">
                    <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                      View more
                    </button>
                    <a
                      href={p.urlShoppe}
                      className="absolute top-[5px] right-[10px] md:right-[40px]"
                      style={{ color: "crimson !important" }}
                    >
                      <SiShopee />
                    </a>
                  </div>
                </Link>
              ))
            ) : (
              <p>Không có sản phẩm nào</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
