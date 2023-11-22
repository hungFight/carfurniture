"use client";
import React from "react";
import styles from "../../app/styleHomePage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { CiSearch } from "react-icons/ci";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SiShopee } from "react-icons/si";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
const SlideSwiper: React.FC<{ data?: string[] }> = ({ data }) => {
  return (
    <div className={`w-full flex  px-1 py-2 relative ${styles.pagination}`}>
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
  );
};

export default SlideSwiper;
