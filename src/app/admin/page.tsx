"use client";
import RoutListing from "@/components/Items/RoutListing";
import SlideCategory from "@/components/Slide/SlideCategory";
import React, { useState } from "react";
import styles from "../styleHomePage.module.scss";
import { SiShopee } from "react-icons/si";
import Routing from "@/components/Items/Routing";
import Listing from "@/components/Items/Listing";
import { IoIosAddCircle } from "react-icons/io";
import AddProductModel from "@/components/AddProductModel";
import FormAboutUs from "@/components/FormAboutUs";
const page = () => {
  const [add, setAdd] = useState<string>("");
  const [aboutUs, setAboutUs] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(1);
  const [routs, setRouts] = useState(["Quản trị"]);
  const [load, setLoad] = useState(false);
  const handleRount = (vl: string) => {
    if (routs.length >= 2) {
      routs[1] = vl;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      setRouts((pre) => [...pre, vl]);
    }
    setLoad(!load);
  };
  const chooseCate = (id: number) => {
    setCategory(id);
  };
  const dataCate = [
    { id: 1, name: "San pham" },
    { id: 2, name: "Tin tức" },
  ];
  return (
    <div className="flex flex-wrap ">
      <div className="w-full px-5 py-2">
        <SlideCategory data={dataCate} onClick={chooseCate} />
      </div>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className=" px-5 w-full md:w-[400px]">
          <div className="w-full my-3 mb-4">
            <Routing routs={routs} />
          </div>
          <div className="w-full flex mb-15 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[350px]  mb-5 md:border-r mr-2">
              <div className="w-full">
                <Listing
                  onClick={handleRount}
                  menu={dataCate
                    .filter((d) => d.id === category)[0]
                    .name.toLowerCase()}
                  choice={routs[1]}
                  Tag="div"
                  default="Tất cả"
                />
              </div>
              <div className="w-full flex items-center cursor-pointer ">
                <div className="flex mr-3 text-[20px]">
                  <IoIosAddCircle />
                </div>
                <p className="text-sm">Them danh muc</p>
              </div>
            </div>
            <h3 className="w-full md:hidden text-center border-b">
              {routs[1]}
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap justify-around border-l border-t border-b-slate-900 p-5 relative">
          {routs[1] && (
            <div
              className="absolute top-1 right-2 z-5 px-3 py-2 rounded-[5px] bg-[#1e7ccd] cursor-pointer text-white"
              onClick={() => {
                setAdd(routs[1]);
                setLoad(!load);
              }}
            >
              {category === 1 && <p>Thêm sản phẩm</p>}
              {category === 2 && <p>Thêm tin tức</p>}
            </div>
          )}
          <div className="w-[200px] md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mx-1">
            <div className="w-full h-[200px] md:h-[230px]">
              <img
                src="https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg"
                alt="car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`mt-1 ${styles.containerProductTag}`}>
              <h3
                className={`font-bold text-sm md:text-base ${styles.nameTag}`}
              >
                Super Car HD Wallpaper in 2023
              </h3>
              <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                  100.000.000đ
                </p>
                <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                  102.000.000đ
                </p>
              </div>
              <p
                className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
              >
                {" "}
                <strong className="text-[crimson]">*</strong>
                Lamborghini Urus 2023 có đầy đủ những phẩm chất ưu việt của một
                chiếc siêu xe hàng đầu. Nhưng nhiều người vẫn cho rằng các mẫu
                siêu SUV không phải là thế mạnh của Lamborghini và Urus 2023 sẽ
                bị lép vế trước những mẫu xe gầm thấp đã làm nên tên tuổi của
                thương hiệu
              </p>
            </div>
            <div className="my-2 flex items-center justify-center relative">
              <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                View more
              </button>
              <a
                href="#"
                className="absolute top-[5px] right-[10px] md:right-[40px]"
                style={{ color: "crimson !important" }}
              >
                <SiShopee />
              </a>
            </div>
          </div>
          <div className="w-[200px] md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mx-1">
            <div className="w-full h-[200px] md:h-[230px]">
              <img
                src="https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg"
                alt="car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`mt-1 ${styles.containerProductTag}`}>
              <h3
                className={`font-bold text-sm md:text-base ${styles.nameTag}`}
              >
                Super Car HD Wallpaper in 2023
              </h3>
              <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                  100.000.000đ
                </p>
                <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                  102.000.000đ
                </p>
              </div>
              <p
                className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
              >
                {" "}
                <strong className="text-[crimson]">*</strong>
                Lamborghini Urus 2023 có đầy đủ những phẩm chất ưu việt của một
                chiếc siêu xe hàng đầu. Nhưng nhiều người vẫn cho rằng các mẫu
                siêu SUV không phải là thế mạnh của Lamborghini và Urus 2023 sẽ
                bị lép vế trước những mẫu xe gầm thấp đã làm nên tên tuổi của
                thương hiệu
              </p>
            </div>
            <div className="my-2 flex items-center justify-center relative">
              <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                View more
              </button>
              <a
                href="#"
                className="absolute top-[5px] right-[10px] md:right-[40px]"
                style={{ color: "crimson !important" }}
              >
                <SiShopee />
              </a>
            </div>
          </div>
          <div className="w-[200px] md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mx-1">
            <div className="w-full h-[200px] md:h-[230px]">
              <img
                src="https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg"
                alt="car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`mt-1 ${styles.containerProductTag}`}>
              <h3
                className={`font-bold text-sm md:text-base ${styles.nameTag}`}
              >
                Super Car HD Wallpaper in 2023
              </h3>
              <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                  100.000.000đ
                </p>
                <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                  102.000.000đ
                </p>
              </div>
              <p
                className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
              >
                {" "}
                <strong className="text-[crimson]">*</strong>
                Lamborghini Urus 2023 có đầy đủ những phẩm chất ưu việt của một
                chiếc siêu xe hàng đầu. Nhưng nhiều người vẫn cho rằng các mẫu
                siêu SUV không phải là thế mạnh của Lamborghini và Urus 2023 sẽ
                bị lép vế trước những mẫu xe gầm thấp đã làm nên tên tuổi của
                thương hiệu
              </p>
            </div>
            <div className="my-2 flex items-center justify-center relative">
              <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                View more
              </button>
              <a
                href="#"
                className="absolute top-[5px] right-[10px] md:right-[40px]"
                style={{ color: "crimson !important" }}
              >
                <SiShopee />
              </a>
            </div>
          </div>
          <div className="w-[200px] md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer mx-1">
            <div className="w-full h-[200px] md:h-[230px]">
              <img
                src="https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg"
                alt="car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`mt-1 ${styles.containerProductTag}`}>
              <h3
                className={`font-bold text-sm md:text-base ${styles.nameTag}`}
              >
                Super Car HD Wallpaper in 2023
              </h3>
              <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                  100.000.000đ
                </p>
                <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                  102.000.000đ
                </p>
              </div>
              <p
                className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
              >
                {" "}
                <strong className="text-[crimson]">*</strong>
                Lamborghini Urus 2023 có đầy đủ những phẩm chất ưu việt của một
                chiếc siêu xe hàng đầu. Nhưng nhiều người vẫn cho rằng các mẫu
                siêu SUV không phải là thế mạnh của Lamborghini và Urus 2023 sẽ
                bị lép vế trước những mẫu xe gầm thấp đã làm nên tên tuổi của
                thương hiệu
              </p>
            </div>
            <div className="my-2 flex items-center justify-center relative">
              <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                View more
              </button>
              <a
                href="#"
                className="absolute top-[5px] right-[10px] md:right-[40px]"
                style={{ color: "crimson !important" }}
              >
                <SiShopee />
              </a>
            </div>
          </div>
        </div>
      </div>

      {add && <AddProductModel title={routs[1]} onClick={() => setAdd("")} />}
      {aboutUs && (
        <FormAboutUs title="About us" onClick={() => setAboutUs(false)} />
      )}
      <div
        className="w-fit fixed bg-[#0099e6] bottom-[80px] z-10 left-[52px] rounded-[5px] cursor-pointer font-medium px-3 py-1 text-white"
        onClick={() => setAboutUs(true)}
      >
        About us
      </div>
    </div>
  );
};

export default page;
