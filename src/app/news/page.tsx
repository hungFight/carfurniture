"use client";
import InputSearch from "@/components/Items/InputSearch";
import Listing from "@/components/Items/Listing";
import Routing from "@/components/Items/Routing";
import Image from "next/image";
import styles from "./styleNews.module.scss";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function New() {
  const [routs, setRouts] = useState(["Tin tức", "Mazda"]);
  const [load, setLoad] = useState(false);
  const handleRount = (vl: string) => {
    if (routs[1]) {
      routs[1] = vl;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      setRouts((pre) => [...pre, vl]);
    }
    setLoad(!load);
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <div className="min-w-[190px] h-[50px] md:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
          <img src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg" />
        </div>
        <div className="">
          <h3 className="text-base md:text-[17px] font-bold">Post's title</h3>
          <p className="text-sm ">date time</p>
          <p
            className={`text-sm md:text-base  mt-3 overflow-hidden ${styles.description}`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            Điểm mù là những vùng không gian bên ngoài xe bị che khuất và không
            nằm trong tầm nhìn của người điều khiển. Nói cách khác, người điều
            khiển không thể nào quan sát được điểm mù thông Điểm mù là những
            vùng không gian bên ngoài xe bị che khuất và không nằm trong tầm
            nhìn của người điều khiển. Nói cách khác, người điều khiển không thể
            nào quan sát được điểm mù thông qua...
          </p>
        </div>
      </div>{" "}
      <div className="w-full flex justify-between mb-4">
        <div className="min-w-[190px] h-[50px] md:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
          <img src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg" />
        </div>
        <div className="">
          <h3 className="text-base md:text-[17px] font-bold">Post's title</h3>
          <p className="text-sm ">date time</p>
          <p
            className={`text-sm md:text-base  mt-3 overflow-hidden ${styles.description}`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            Điểm mù là những vùng không gian bên ngoài xe bị che khuất và không
            nằm trong tầm nhìn của người điều khiển. Nói cách khác, người điều
            khiển không thể nào quan sát được điểm mù thông Điểm mù là những
            vùng không gian bên ngoài xe bị che khuất và không nằm trong tầm
            nhìn của người điều khiển. Nói cách khác, người điều khiển không thể
            nào quan sát được điểm mù thông qua...
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between mb-4">
        <div className="min-w-[190px] h-[50px] md:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
          <img src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg" />
        </div>
        <div className="">
          <h3 className="text-base md:text-[17px] font-bold">Post's title</h3>
          <p className="text-sm ">date time</p>
          <p
            className={`text-sm md:text-base  mt-3 overflow-hidden ${styles.description}`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            Điểm mù là những vùng không gian bên ngoài xe bị che khuất và không
            nằm trong tầm nhìn của người điều khiển. Nói cách khác, người điều
            khiển không thể nào quan sát được điểm mù thông Điểm mù là những
            vùng không gian bên ngoài xe bị che khuất và không nằm trong tầm
            nhìn của người điều khiển. Nói cách khác, người điều khiển không thể
            nào quan sát được điểm mù thông qua...
          </p>
        </div>
      </div>
    </div>
  );
}
