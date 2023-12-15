import http from "@/utils/http";
import moment from "moment";
import React from "react";
import styles from "@/components/styleComponent.module.scss";

const getProduct = async (detailed: string) => {
  const res = await http.get(`Blog/GetByID/${detailed}`);
  console.log(res.data, "res news");

  return res.data;
};
const page = async (props: { params: { detailed: string[] | string } }) => {
  console.log(props, "props news");

  const data:
    | {
        blog: {
          id: number;
          name: string;
          create_Date: string;
          content: string;
          categoryId: number;
        };
        categoryName: string;
        urlImage: { image: string; path: string }[];
      }
    | undefined =
    typeof props.params.detailed === "string"
      ? []
      : await getProduct(props.params.detailed[1]);

  return (
    <div className="w-full min-[1000px]:flex justify-center">
      <div className="w-full min-[1200px]:w-[1200px] relative mt-15 border-t p-5">
        <div>
          <div className="w-fill min-[520px]:w-[500px] h-[260px] min-[520px]:h-[300px]">
            <img
              src={data?.urlImage[0]?.image}
              alt={data?.urlImage[0]?.path}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[90%] h-[90%]">
            <h3
              className="text-base md:text-[17px] font-bold"
              style={{ wordBreak: "break-all" }}
            >
              {data?.blog.name}{" "}
            </h3>
            <p className="text-sm ">
              {" "}
              {moment(data?.blog.create_Date).format("DD/MM/YYYY HH:MM:SS")}
            </p>
          </div>
          <div className="min-[1000px]:flex w-full">
            <div className="mt-5 w-full" style={{ wordBreak: "break-all" }}>
              {data && (
                <div
                  className={`text-xs md:text-[13px] ${styles.dangerouslySet}`}
                  dangerouslySetInnerHTML={{ __html: data.blog.content }}
                ></div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default page;
