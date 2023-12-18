"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Image: React.FC<{
  data: {
    image: string;
    path: string;
  }[];
}> = ({ data }) => {
  return (
    <div className="h-[100px] mt-3">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper h-full"
        spaceBetween={15}
        slidesPerView={5}
      >
        {data.map((f) => (
          <SwiperSlide key={f.path}>
            <img
              src={f.image}
              alt={f.path}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Image;
