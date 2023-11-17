"use client";
import styles from "./styleHomePage.module.scss";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { CiSearch } from "react-icons/ci";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import SlideHome from "@/components/Slide/SlideHome";
import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full 2xl:w-[1536px]">
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
      <div className=" w-full mb-[300px] flex justify-center">
        <div className="w-full sm:w-[90%] ">
          <div className="w-full mt-2 mb-10">
            <h3 className="w-full pl-1 font-semibold text-base xl:text-lg">
              Danh sách sản phẩm
            </h3>
            <div
              className={`w-full flex  px-1 py-2 relative ${styles.pagination}`}
            >
              <div className="w-full bg-[aliceblue] ">
                <Swiper
                  slidesPerView={3}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    500: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    800: {
                      slidesPerView: 5,
                      spaceBetween: 30,
                    },
                    1200: {
                      slidesPerView: 6,
                      spaceBetween: 40,
                    },
                  }}
                  modules={[Pagination]}
                  className={`${styles.mySwiper} `}
                >
                  <SwiperSlide>
                    <h3 className="text-xs text-[#004cff]  md:text-sm xl:text-base">
                      Redmi note 8 pro
                    </h3>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <h3 className="text-xs md:text-sm xl:text-base">
                      Redmi note 8 pro
                    </h3>
                  </SwiperSlide>{" "}
                  <SwiperSlide>
                    <h3 className="text-xs md:text-sm xl:text-base">
                      Redmi note 8 pro
                    </h3>
                  </SwiperSlide>
                  <SwiperSlide>
                    <h3 className="text-xs md:text-sm xl:text-base">
                      Redmi note 8 pro
                    </h3>
                  </SwiperSlide>
                  <SwiperSlide>
                    <h3 className="text-xs md:text-sm xl:text-base">
                      Redmi note 8 pro
                    </h3>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="pl-1">
            <h3 className="w-full text-base xl:text-lg  font-semibold mb-2">
              Danh sách sản phẩm bán chạy
              <p className="text-sm font-normal">( Redmi note 8 pro )</p>
            </h3>
            <div>
              <div className="flex relative w-fit">
                <input
                  type="text"
                  placeholder="Search"
                  className=" shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
                />
                <div className="text-[20px] flex items-center justify-center p-1 absolute right-1 top-[2px]">
                  <CiSearch />
                </div>
                <div className="text-[14px] shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] rounded-md cursor-pointer flex items-center justify-center p-1 absolute right-[-70px] top-[2px]">
                  Tìm kiếm
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
