"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Images } from "@/asset/image";
import styles from "./styleSlide.module.scss";
export default function SlideHome() {
  const [change, setChange] = useState<{ current: number; next: number }>({
    current: 0,
    next: 0,
  });
  const textV = [
    {
      id: 1,
      val: [
        "VIỆT HÓA, KÍCH HOẠT TÍNH NĂNG ẨN XE MAZDA",
        "- Font tiếng việt cho hệ thống Mazda connect",
        "- Kích hoạt và update bản đồ Mazda navigation chính hãng.",
        "- Kích hoạt xem Video qua usb (mp4, Avi,...)",
        "- Cài đặt hình nền, ảnh gia đình lên giao diện màn hình xe",
        "- Kích hoạt sử dụng cảm ứng khi xe di chuyển",
      ],
    },
    {
      id: 2,
      val: [
        "THẺ BẢN ĐỒ CHÍNH HÃNG XE MAZDA (MAZDA NAVIGATION)",
        "- Thẻ chính hãng có license bản quyền, không mất bảo hành xe",
        "- Hiển thị Cảnh báo tốc độ và Điều hướng trên Hắt kính (HUD)",
        "- Định vị chính xác vị trí của xe khi di chuyển, kiểm soát tốc độ và xác định đúng điểm dừng đỗ.",
        "- Cảnh báo giới hạn tốc độ, cảnh báo khi xe đi vào những cung đường nguy hiểm.",
        "- Có thể chạy offline bằng định vị vệ tinh, k phụ thuộc vào kết nối mạng",
      ],
    },
    {
      id: 3,
      val: [
        "NÂNG CẤP KIT CARPLAY CHÍNH HÃNG MAZDA",
        "- Kết nối điện thoại iphone thông qua giao thức carplay",
        "- Kết nối điện thoại hđh Android thông qua Android auto",
        "- Kết nối với mọi loại Android box đang có trên thị trường",
        "- Sử dụng bản đồ google map và vietmap live dẫn đường thông minh",
        "- Xem youtube với ios đã jailbreak hoặc android cài femata",
      ],
    },
    {
      id: 4,
      val: [
        " ANDROID BOX DÀNH CHO XE MAZDA",
        "- Chip 8 nhân mạnh mẽ, Cấu hình Ram tùy chọn hợp lý",
        "- Sử dụng hệ điều hành Android mới nhất",
        "- Tặng vietmap S2 dẫn đường có cảnh báo giao thông",
        "- Tặng Youtube premium xem youtube ko quảng cáo",
        "- Tùy chọn sử dụng wifi hoặc sim mạng tiện lợi",
      ],
    },
    {
      id: 5,
      val: [
        " CAMERA 3 MẮT CHO XE MAZDA (CÓ MAZDA CONNECT)",
        "- Bộ cam tùy chọn phiên bản mắt thường hoặc mắt rộng",
        "- Cắm zắc zin hoàn toàn, không cắt chích hệ thống điện của xe",
        "- Tích hợp hiển thị camera trước khi vào số D ",
        "- Tích hợp tự động hiển thị cam gương theo xinhan",
        "- Chỉ hiện thị camera khi xe di chuyển với tốc độ dưới 15km/h",
      ],
    },
  ];

  const [renderedTexts, setRenderedTexts] = useState<any>([]);
  const renderedTextsRef = useRef<{
    one: any;
    two: any;
    three: any;
  }>({
    one: [],
    two: [],
    three: [],
  });
  const Tm = useRef<NodeJS.Timeout[]>([]);
  useEffect(() => {
    const delay = 300; // Adjust the delay time (in milliseconds) between each text
    const texts: any = [];

    textV[change.current].val.forEach((text, index) => {
      const R = setTimeout(() => {
        texts.push(
          index !== 0 ? (
            <p
              key={index}
              className={`${styles.animationSlideText} text-[10px] md:text-sm xl:text-base relative top-[-10px] ml-2 mb-1`}
            >
              {text}
            </p>
          ) : (
            <h3
              key={index}
              className={`text-xs md:text-base xl:text-lg font-semibold mb-3`}
            >
              {text}
            </h3>
          )
        );

        setRenderedTexts([...texts]);
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
          <div className="w-full h-[450px]  flex relative flex-wrap sm:flex-nowrap">
            <div className="xl:w-[40%] w-[100%] sm:w-[60%] relative">
              <div className="absolute right-[50%] left-[50%] top-[20%] sm:top-[91px]  sm:left-[69%] md:left-[58%] translate-x-[-50%] w-[340px] sm:w-[465px]">
                {renderedTexts}
              </div>
            </div>
            <div className="sm:w-5/12 w-full xl:w-[60%]   flex justify-start overflow-hidden relative z-10">
              <div
                className={` w-full sm:w-auto h-full  sm:flex-wrap  xl:flex-nowrap absolute top-0 right-0 p-5  flex  items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} h-full sm:h-1/2 w-4/5 min-w-1/2 xl:w-full xl:h-[80%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideOneOne}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
                <div
                  className={`${styles.slideImageOneChild2} h-full sm:h-1/2 w-4/5 min-w-1/2 xl:w-full xl:h-[80%] mr-10 py-2 relative`}
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
              <div className="absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[465px]">
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
              <div className="absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[465px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-1/2 flex  justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 right-[115px] p-5  flex flex-wrap items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-full w-full h-[95%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideThreeOne}
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
      id: 3,
      element: (
        <SwiperSlide key={3}>
          <div className="w-full h-[450px]  flex relative">
            <div className="w-1/2 relative">
              <div className="absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[465px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-1/2 flex  justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 right-[115px] p-5  flex flex-wrap items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild2} min-w-full w-full h-[95%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideFourOne}
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
      id: 4,
      element: (
        <SwiperSlide key={4}>
          <div className="w-full h-[450px]  flex relative">
            <div className="w-1/2 relative">
              <div className=" absolute top-[91px] right-[50%] left-[50%] translate-x-[-50%] w-[465px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-1/2 flex  justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 right-[115px] p-5  flex flex-wrap items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-full w-full h-[95%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideFiveOne}
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
    <div className={`w-[100%] ${styles.bk}`}>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={(e: any) =>
          setChange({ ...change, current: e.activeIndex })
        }
      >
        {sildeData.map((r) => {
          if (r.id === change.current) {
            return r.element;
          }
          return <SwiperSlide key={r.id}></SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
