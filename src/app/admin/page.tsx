"use client";
import RoutListing from "@/components/Items/RoutListing";
import SlideCategory from "@/components/Slide/SlideCategory";
import React, { useEffect, useState } from "react";
import styles from "../styleHomePage.module.scss";
import { SiShopee } from "react-icons/si";
import Routing from "@/components/Items/Routing";
import Listing from "@/components/Items/Listing";
import { IoIosAddCircle } from "react-icons/io";
import AddProductModel from "@/components/AddProductModel";
import FormAboutUs from "@/components/FormAboutUs";
import http from "@/utils/http";
import Link from "next/link";
import AddNewsModel from "@/components/AddNewsModel";
const page = () => {
  const [dataCate, setDataCate] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [dataList, setDataList] = useState<
    { categoryName: string; categoryId: number }[]
  >([]);
  const [dataProducts, setDataProducts] = useState<
    {
      id: number;
      name: string;
      price: number;
      price_After: number;
      description: string;
      urlShoppe: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [add, setAdd] = useState<string>("");
  const [addCate, setAddCate] = useState<boolean>(false);
  const [aboutUs, setAboutUs] = useState<boolean>(false);
  const [categoryType, setCategory] = useState<number>(2);
  const [cate, setCate] = useState<{
    categoryId: number;
    categoryName: string;
  }>({
    categoryId: 0,
    categoryName: "",
  });
  const [routs, setRouts] = useState(["Quản trị"]);
  const [nameRout, setNameRout] = useState("");
  const [load, setLoad] = useState(false);
  const fet = async () => {
    const res = await http.get<typeof dataCate>("CategoryType/GetAll");

    setDataCate(res.data);
  };
  const fetS = async () => {
    const which = dataCate.filter((c) => c.id === categoryType)[0].name;
    const resCate = await http.get<
      { categoryName: string; categoryId: number }[]
    >(`Category/GetAll/${which}`);
    if (categoryType === 2 && resCate.data.length) {
      const res = await http.post("Product/GetPaginationProduct", {
        pageIndex: 1,
        pageSize: 3,
        search_CategoryName: resCate.data[0]?.categoryName,
      });

      setDataProducts(res.data.data);
    }
    setNameRout(resCate.data[0]?.categoryName ?? "");

    setCate({
      categoryId: resCate.data[0]?.categoryId,
      categoryName: resCate.data[0]?.categoryName ?? "",
    });
    setDataList(resCate.data);
  };
  useEffect(() => {
    fet();
  }, []);
  useEffect(() => {
    if (dataCate.length) {
      //default

      fetS();
    }
  }, [dataCate, categoryType]);
  console.log(routs, "categoryId");
  useEffect(() => {
    if (routs.length >= 2) {
      console.log("categoryId 11");
      // routing of page category
      routs[1] = nameRout;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      console.log("categoryId 22");

      if (nameRout) setRouts((pre) => [...pre, nameRout]);
    }
  }, [nameRout]);
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
    setAddCate(false);
  };
  const [nameCate, setNameCate] = useState("");
  const handleAddCate = async () => {
    if (nameCate) {
      const res = await http.post<typeof dataCate>("Category/Create", {
        Name: nameCate,
        categoryTypeId: categoryType,
      });
      setAddCate(false);
      setNameCate("");
      if (res.data) fetS();
    }
  };

  return (
    <div className="flex flex-wrap ">
      <div className="w-full px-5 py-2">
        <SlideCategory
          data={dataCate}
          onClick={chooseCate}
          active={categoryType}
        />
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
                  data={dataList.map((l) => l.categoryName)}
                  menu={
                    dataCate
                      .filter((d) => d.id === categoryType)[0]
                      ?.name.toLowerCase() ?? ""
                  }
                  choice={routs[1]}
                  Tag="div"
                  default={dataList[0]?.categoryName}
                />
              </div>
              <div
                className="w-full flex items-center cursor-pointer "
                onClick={() => setAddCate(true)}
              >
                <div className="flex mr-3 text-[20px]">
                  <IoIosAddCircle />
                </div>
                {addCate ? (
                  <>
                    <input
                      required
                      type="text"
                      onChange={(e) => setNameCate(e.target.value)}
                      className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
                    />
                    <button
                      onClick={handleAddCate}
                      className="hover:text-[#4a8cbf] shadow-[0_0_2px_#4a8cbf text-sm"
                    >
                      Thêm
                    </button>
                  </>
                ) : (
                  <p className="text-sm">Them danh muc</p>
                )}
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
              {categoryType === 2 && <p>Thêm sản phẩm</p>}
              {categoryType === 3 && <p>Thêm tin tức</p>}
            </div>
          )}
          {categoryType === 2 ? (
            <>
              {dataProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`${categoryType === 2 ? "products" : ""}/${routs[1]}/${
                    p.id
                  }`}
                  className="w-[200px] md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer"
                >
                  <div className="w-full h-[200px] md:h-[230px]">
                    <img
                      src={p.urlImage[0]?.image}
                      alt={p.urlImage[0]?.path}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`mt-1 ${styles.containerProductTag}`}>
                    <h3
                      className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                    >
                      {p.name}
                    </h3>
                    <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                      <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                        {p.price}đ
                      </p>
                      {p.price_After && (
                        <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                          {p.price_After}đ
                        </p>
                      )}
                    </div>
                    <p
                      className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
                    >
                      {" "}
                      <strong className="text-[crimson]">*</strong>
                      {p.description}
                    </p>
                  </div>
                  <div className="my-2 flex items-center justify-center relative">
                    <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                      View more
                    </button>
                    <a
                      href={p.urlShoppe}
                      className="absolute top-[5px] right-[10px] md:right-[40px]"
                      style={{ color: "crimson !important" }}
                    >
                      <SiShopee />
                    </a>
                  </div>
                </Link>
              ))}
            </>
          ) : categoryType === 3 ? (
            <>
              {" "}
              <div className="w-full flex justify-between mb-4">
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
                    Điểm mù là những vùng không gian bên ngoài xe bị che khuất
                    và không nằm trong tầm nhìn của người điều khiển. Nói cách
                    khác, người điều khiển không thể nào quan sát được điểm mù
                    thông Điểm mù là những vùng không gian bên ngoài xe bị che
                    khuất và không nằm trong tầm nhìn của người điều khiển. Nói
                    cách khác, người điều khiển không thể nào quan sát được điểm
                    mù thông qua...
                  </p>
                </div>
              </div>{" "}
              <div className="w-full flex justify-between mb-4">
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
                    Điểm mù là những vùng không gian bên ngoài xe bị che khuất
                    và không nằm trong tầm nhìn của người điều khiển. Nói cách
                    khác, người điều khiển không thể nào quan sát được điểm mù
                    thông Điểm mù là những vùng không gian bên ngoài xe bị che
                    khuất và không nằm trong tầm nhìn của người điều khiển. Nói
                    cách khác, người điều khiển không thể nào quan sát được điểm
                    mù thông qua...
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between mb-4">
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
                    Điểm mù là những vùng không gian bên ngoài xe bị che khuất
                    và không nằm trong tầm nhìn của người điều khiển. Nói cách
                    khác, người điều khiển không thể nào quan sát được điểm mù
                    thông Điểm mù là những vùng không gian bên ngoài xe bị che
                    khuất và không nằm trong tầm nhìn của người điều khiển. Nói
                    cách khác, người điều khiển không thể nào quan sát được điểm
                    mù thông qua...
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {add && categoryType === 2 ? (
        <AddProductModel
          title={routs[1]}
          onClick={() => setAdd("")}
          cateId={cate.categoryId}
          cateName={cate.categoryName}
        />
      ) : add && categoryType === 3 ? (
        <AddNewsModel
          title={routs[1]}
          onClick={() => setAdd("")}
          cateId={cate.categoryId}
          cateName={cate.categoryName}
        />
      ) : (
        <></>
      )}
      {/* : category === 4 ? (
      <FormAboutUs title="About us" />) */}
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
