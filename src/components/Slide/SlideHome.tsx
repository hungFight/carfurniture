"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { Images } from "@/asset/image";
import styles from "./styleSlide.module.scss";
export default function SlideHome() {
  const [change, setChange] = useState<{ current: number; next: number }>({
    current: 0,
    next: 0,
  });
  const textV = [
    "VIỆT HÓA, KÍCH HOẠT TÍNH NĂNG ẨN XE MAZDA",
    "- Font tiếng việt cho hệ thống Mazda connect",
    "- Kích hoạt và update bản đồ Mazda navigation chính hãng.",
    "- Kích hoạt xem Video qua usb (mp4, Avi,...)",
    "- Cài đặt hình nền, ảnh gia đình lên giao diện màn hình xe",
    "- Kích hoạt sử dụng cảm ứng khi xe di chuyển",
  ];
  const [renderedTexts, setRenderedTexts] = useState<any>([]);
  const Tm = useRef<NodeJS.Timeout[]>([]);
  useEffect(() => {
    const delay = 300; // Adjust the delay time (in milliseconds) between each text
    const texts: any = [];

    textV.forEach((text, index) => {
      const R = setTimeout(() => {
        texts.push(
          index !== 0 ? (
            <p
              key={index}
              className={`${styles.animationSlideText} text-sm relative top-[-10px] ml-2 mb-1`}
            >
              {text}
            </p>
          ) : (
            <h3 key={index} className={` text-lg font-semibold mb-3`}>
              {text}
            </h3>
          )
        );
        setRenderedTexts([...texts]); // Update the state with the new array of rendered texts
      }, index * delay);
      Tm.current.push(R);
    });
    return () => {
      Tm.current.map((tm) => clearTimeout(tm));
    };
  }, [change]);
  const sildeData = [
    {
      id: 0,
      element: (
        <SwiperSlide key={0}>
          <div className="w-full h-[450px]  flex relative">
            <div className="w-[40%] relative">
              <div className="absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[433px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-[60%] flex  justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 right-0 p-5  flex  items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-1/2 w-full h-[80%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideOneOne}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
                <div
                  className={`${styles.slideImageOneChild2} min-w-1/2 w-full h-[80%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideOneTwo}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ),
    },
    {
      id: 1,
      element: (
        <SwiperSlide key={1}>
          <div className="w-full h-[450px]  flex relative">
            <div className="w-[40%] relative">
              <div className="absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[433px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-[60%] flex  justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 right-0 p-5  flex  items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-1/2 w-full h-[80%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideTwoOne}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
                <div
                  className={`${styles.slideImageOneChild2} min-w-1/2 w-full h-[80%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideTwoTwo}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ),
    },
    {
      id: 2,
      element: (
        <SwiperSlide key={2}>
          <div className="w-full h-[450px]  flex relative">
            <div className="w-1/2 relative">
              <div className="absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[433px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-1/2 flex  justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 right-0 p-5  flex flex-wrap items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-full w-full h-1/2 mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideOneOne}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
                <div
                  className={`${styles.slideImageOneChild2} min-w-full w-full h-1/2 mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideOneTwo}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ),
    },
  ];

  console.log(change, "change");

  return (
    <div className="w-[100%]">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        onSlideChange={(e: any) =>
          setChange({ ...change, current: e.activeIndex })
        }
      >
        {sildeData.map((r) => {
          if (r.id === change.next || r.id === change.current) {
            return r.element;
          }
          return <SwiperSlide key={r.id}></SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
