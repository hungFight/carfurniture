import React from "react";
import http from "@/utils/http";
import { CiPhone } from "react-icons/ci";
import { PiMessengerLogoLight } from "react-icons/pi";
import { SiShopee } from "react-icons/si";
import styles from "@/components/styleComponent.module.scss";
import Image from "./Image";

const getProduct = async (detailed: string[]) => {
  if (detailed.length > 1) {
    const res = await http.get(`Product/GetByID/${detailed[1]}`);
    return res.data;
  } else {
    if (detailed.length) {
      const res = await http.post("Product/GetPaginationProduct", {
        pageIndex: 1,
        pageSize: 1,
        search_CategoryName: "aaa",
        search_Name: decodeURIComponent(detailed[0]).replace(/-/g, " "),
      });

      const resD = await http.get(`Product/GetByID/${res.data.data[0]?.id}`);
      console.log("eeeeeeeeeee", resD.data);
      return resD.data;
    }
  }
  return undefined;
};
const page = async (props: { params: { detailed: string[] | string } }) => {
  console.log("hellllllo", props);

  const data:
    | {
        product: {
          name: string;
          price: number;
          price_After: number;
          description: string;
          urlShoppe: string;
        };
        categoryName: string;
        urlImage: { image: string; path: string }[];
        info_in_AboutUs: [{ url_Mess: string; phone: string }];
      }
    | undefined =
    typeof props.params.detailed === "string"
      ? undefined
      : await getProduct(props.params.detailed);
  return (
    <div className="w-full min-[1000px]:flex justify-center">
      {data && (
        <div className="w-full min-[1000px]:w-[90%] relative mt-15 border-t p-5">
          <div>
            <div className="min-[1000px]:flex">
              <div
                className={`w-full ${
                  data.urlImage?.length > 1 ? "h-[470px] " : "h-[350px] "
                } min-[600px]:w-[500px]`}
              >
                <div className="w-full h-[350px] min-[600px]:w-[500px]  ">
                  <img
                    src={data.urlImage[0]?.image}
                    alt={data.urlImage[0]?.path}
                    className="w-full h-full object-cover"
                  />
                </div>
                {data.urlImage?.length > 1 && <Image data={data.urlImage} />}
              </div>
              <div
                className={`mt-1 min-[1000px]:ml-3 ${styles.containerProductTag}`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                >
                  {data.product.name}
                </h3>
                <div className="w-full mt-1 md:mt-2 flex  items-center border-b border-solid">
                  <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                    {data.product.price
                      .toLocaleString("en-US")
                      .replace(/,/g, ".")}
                    đ
                  </p>
                  {data.product.price_After && (
                    <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                      {data.product.price_After
                        .toLocaleString("en-US")
                        .replace(/,/g, ".")}
                      đ
                    </p>
                  )}
                </div>
                <div className="mt-3 flex ">
                  <div className="w-fit mr-2 relative my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center">
                    <a
                      href={data.info_in_AboutUs[0]?.url_Mess}
                      target="_blank"
                      className="absolute z-10 w-full h-full left-0 top-0"
                    ></a>
                    <div className="flex text-[20px] text-[#4993de] mr-2">
                      <PiMessengerLogoLight />
                    </div>{" "}
                    Messenger
                  </div>
                  <div className="w-fit relative mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center">
                    <a
                      href={`tel:${data.info_in_AboutUs[0]?.phone}`}
                      className="absolute z-10 w-full h-full left-0 top-0"
                    ></a>
                    <div className="flex text-[20px] text-[#57eb57] mr-2">
                      <CiPhone />
                    </div>{" "}
                    {data.info_in_AboutUs[0]?.phone}
                  </div>
                  <div className="w-fit relative mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] flex items-center bg-slate-700">
                    <a
                      href={data.product.urlShoppe}
                      target="_blank"
                      className="absolute z-10 w-full h-full left-0 top-0"
                    ></a>
                    <div className="flex text-[#ff6f6f] text-[20px] mr-2">
                      {" "}
                      <SiShopee />
                    </div>{" "}
                    Shoppe
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-semibold">Mô tả</h3>
              <div
                className={`text-xs md:text-[13px] w-full mb-5 ${styles.dangerouslySet}`}
                dangerouslySetInnerHTML={{ __html: data.product.description }}
              ></div>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default page;
