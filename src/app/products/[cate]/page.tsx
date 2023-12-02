import InputSearch from "@/components/Items/InputSearch";
import React from "react";
import styles from "../../styleHomePage.module.scss";
import { SiShopee } from "react-icons/si";
import dynamic from "next/dynamic";
import Link from "next/link";
import http from "@/utils/http";
const getProduct = async (cate: string) => {
  const res = await http.post("Product/GetPaginationProduct", {
    pageIndex: 1,
    pageSize: 3,
    search_CategoryName: cate,
  });
  return res.data.data;
};

const page = async (props: { params: { cate: string } }) => {
  const data: {
    id: number;
    name: string;
    price: number;
    price_After: number;
    description: string;
    urlShoppe: string;
    urlImage: { image: string; path: string }[];
  }[] = await getProduct(props.params.cate);
  console.log(data, "props data");
  return (
    <>
      <div className="w-full min-[1200px]:w-[60%] p-3">
        <div className="w-full mb-4">
          <InputSearch placeholder={props.params.cate} />
        </div>
        <div className="w-full flex flex-wrap justify-around">
          {data.map((p) => (
            <Link
              key={p.id}
              href="/[slug]"
              as={`${props.params.cate}/${p.name}/${p.id}`}
              className="w-[200px] md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer"
            >
              <div className="w-full h-[200px] md:h-[230px]">
                <img
                  src={p.urlImage[0]?.image}
                  alt={p.urlImage[0]?.path}
                  className="w-full h-full object-cover"
                />
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
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
