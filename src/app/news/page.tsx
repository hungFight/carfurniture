"use client";
import InputSearch from "@/components/Items/InputSearch";
import Listing from "@/components/Items/Listing";
import Routing from "@/components/Items/Routing";
import Image from "next/image";
import styles from "./styleNews.module.scss";
import { useState } from "react";
export default function New() {
  const [routs, setRounts] = useState(["Tin tức"]);
  const [load, setLoad] = useState(false);
  return (
    <div className="w-full flex mb-15 flex-wrap md:flex-nowrap">
      <div className="w-full md:w-[350px]  mb-5  pl-5 md:border-r mr-2">
        <div className="w-full my-3 mb-4">
          <Routing routs={routs} />
        </div>
        <div className="w-full">
          <Listing />
        </div>
      </div>
      <h3 className="w-full md:hidden text-center border-b">Mazda news</h3>
      <div className="w-full md:w-[60%] p-3">
        <div className="w-full mb-4">
          <InputSearch />
        </div>
        <div className="w-full">
          <div
            className="w-full flex justify-between mb-4"
            onClick={() => {
              if (routs[1]) {
                routs[1] = "Mazda";
                setRounts(routs);
              } else {
                setRounts((pre) => [...pre, "Mazda"]);
              }
              setLoad(!load);
            }}
          >
            <div className="min-w-[190px] h-[50px] md:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
              <img src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg" />
            </div>
            <div className="">
              <h3 className="text-base md:text-[17px] font-bold">
                Post's title
              </h3>
              <p className="text-sm ">date time</p>
              <p
                className={`text-sm md:text-base  mt-3 overflow-hidden ${styles.description}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Điểm mù là những vùng không gian bên ngoài xe bị che khuất và
                không nằm trong tầm nhìn của người điều khiển. Nói cách khác,
                người điều khiển không thể nào quan sát được điểm mù thông Điểm
                mù là những vùng không gian bên ngoài xe bị che khuất và không
                nằm trong tầm nhìn của người điều khiển. Nói cách khác, người
                điều khiển không thể nào quan sát được điểm mù thông qua...
              </p>
            </div>
          </div>{" "}
          <div
            className="w-full flex justify-between mb-4"
            onClick={() => {
              if (routs[1]) {
                routs[1] = "Lamborghini";
                setRounts(routs);
              } else {
                setRounts((pre) => [...pre, "Lamborghini"]);
              }
              setLoad(!load);
            }}
          >
            <div className="min-w-[190px] h-[50px] md:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
              <img src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg" />
            </div>
            <div className="">
              <h3 className="text-base md:text-[17px] font-bold">
                Post's title
              </h3>
              <p className="text-sm ">date time</p>
              <p
                className={`text-sm md:text-base  mt-3 overflow-hidden ${styles.description}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Điểm mù là những vùng không gian bên ngoài xe bị che khuất và
                không nằm trong tầm nhìn của người điều khiển. Nói cách khác,
                người điều khiển không thể nào quan sát được điểm mù thông Điểm
                mù là những vùng không gian bên ngoài xe bị che khuất và không
                nằm trong tầm nhìn của người điều khiển. Nói cách khác, người
                điều khiển không thể nào quan sát được điểm mù thông qua...
              </p>
            </div>
          </div>
          <div
            className="w-full flex justify-between mb-4"
            onClick={() => setRounts((pre) => [...pre, "Lamborghini"])}
          >
            <div className="min-w-[190px] h-[50px] md:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
              <img src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg" />
            </div>
            <div className="">
              <h3 className="text-base md:text-[17px] font-bold">
                Post's title
              </h3>
              <p className="text-sm ">date time</p>
              <p
                className={`text-sm md:text-base  mt-3 overflow-hidden ${styles.description}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Điểm mù là những vùng không gian bên ngoài xe bị che khuất và
                không nằm trong tầm nhìn của người điều khiển. Nói cách khác,
                người điều khiển không thể nào quan sát được điểm mù thông Điểm
                mù là những vùng không gian bên ngoài xe bị che khuất và không
                nằm trong tầm nhìn của người điều khiển. Nói cách khác, người
                điều khiển không thể nào quan sát được điểm mù thông qua...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
