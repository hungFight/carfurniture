"use client";
import React, { useState } from "react";
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
  const [change, setChange] = useState<{ img: string; alt: string }>({
    img: data[0]?.image,
    alt: data[0]?.path,
  });
  return (
    <>
      <div className="w-full h-[350px] min-[600px]:w-[500px]  ">
        <img
          src={change?.img}
          alt={change?.alt}
          className="w-full h-full object-cover"
        />
      </div>
      {data.length > 1 && (
        <div className="h-[100px] mt-3">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiper h-full"
            spaceBetween={15}
            slidesPerView={5}
          >
            {data.map((f) => (
              <SwiperSlide
                key={f.path}
                onClick={() => setChange({ img: f.image, alt: f.path })}
              >
                <img
                  src={f.image}
                  alt={f.path}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Image;
