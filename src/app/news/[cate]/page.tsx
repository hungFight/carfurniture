"use client";
import InputSearch from "@/components/Items/InputSearch";
import React, { useEffect, useState } from "react";
import styles from "@/app/styleHomePage.module.scss";
import Link from "next/link";
import http from "@/utils/http";
import moment from "moment";

const page = (props: { params: { cate: string } }) => {
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
  const getNews = async (cate: string, name?: string) => {
    if (name) {
      const res = await http.post("Blog/GetPaginationProduct", {
        pageIndex: 1,
        pageSize: 6,
        search_Name: name,
      });
      setData(res.data.data);
    } else {
      const res = await http.post("Blog/GetPaginationProduct", {
        pageIndex: 1,
        pageSize: 6,
        search_CategoryName: cate,
      });
      setData(res.data.data);
    }
  };

  useEffect(() => {
    getNews(props.params.cate);
  }, []);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    getNews(props.params.cate, search);
  };
  return (
    <div className="w-full md:w-[60%] p-3">
      <div className="w-full mb-4">
        <InputSearch
          placeholder={props.params.cate}
          onChange={handleSearch}
          onClick={handleClick}
        />
      </div>
      <div className="w-full">
        {data.map((n) => (
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
        ))}
      </div>
    </div>
  );
};

export default page;
