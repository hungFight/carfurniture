"use client";
import InputSearch from "@/components/Items/InputSearch";
import React, { useEffect, useState } from "react";
import styles from "@/app/styleHomePage.module.scss";
import Link from "next/link";
import http from "@/utils/http";
import moment from "moment";

const page = (props: { params: { cate: string } }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const getNews = async (cate: string, index = 1, name?: string) => {
    setLoading(true);
    if (name) {
      setLoadingSearch(true);

      const res = await http.post("Blog/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 6,
        search_Name: name,
      });
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
      setLoadingSearch(false);
    } else {
      const res = await http.post("Blog/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 6,
        search_CategoryName: cate,
      });
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNews(props.params.cate);
  }, []);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    getNews(props.params.cate, 1, search);
  };
  return (
    <div className="w-full md:w-[60%] p-3">
      <div className="w-full mb-4">
        <InputSearch
          placeholder={props.params.cate}
          onChange={handleSearch}
          onClick={handleClick}
          loading={loadingSearch}
        />
      </div>
      <div className="w-full">
        <div className="w-full h-fit flex justify-center pb-1 border-b mb-1">
          {Array.from({ length: pageIndex }, (_, index) => index + 1).map(
            (p) => (
              <div
                key={p}
                className="flex w-auto h-fit"
                onClick={() => {
                  if (p !== pageChoice) {
                    getNews(props.params.cate, p);
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
        {!loading ? (
          data.map((n) => (
            <Link
              key={n.id}
              href={`/[slug]`}
              as={`${props.params.cate}/${n.name}/${n.id}`}
              className="w-full flex flex-wrap md:flex-nowrap mb-4"
            >
              <div className="min-w-full h-[130px] md:min-w-[250px] md:h-[155px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
                <img
                  src={n.urlImage[0]?.image}
                  alt={n.urlImage[0]?.path}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-fit">
                <h3 className="text-base md:text-[17px] font-bold">{n.name}</h3>
                <p className="text-xs mt-1">
                  {moment(n.create_Date).format("DD/MM/YYYY HH:MM:SS")}
                </p>
                <div
                  className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                  dangerouslySetInnerHTML={{ __html: n.content }}
                ></div>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default page;
