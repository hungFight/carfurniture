"use client";
import SlideCategory from "@/components/Slide/SlideCategory";
import React, { useEffect, useState } from "react";
import styles from "../styleHomePage.module.scss";
import { SiShopee } from "react-icons/si";
import Routing from "@/components/Items/Routing";
import Listing from "@/components/Items/Listing";
import { IoIosAddCircle } from "react-icons/io";
import http from "@/utils/http";
import numeral from "numeral";
import Link from "next/link";
import dynamic from "next/dynamic";
import PreviousAdmin from "@/components/PreviousAdmin";
import moment from "moment";
import AddGuideModel from "@/components/AddGuideModel";
import InputSearch from "@/components/Items/InputSearch";
import FormAboutUs from "@/components/FormAboutUs";
import { redirect } from "next/navigation";
import httpToken from "@/utils/httpToken";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { BiSkipNext } from "react-icons/bi";
import { MdSkipPrevious } from "react-icons/md";
const RoutListing = dynamic(() => import("@/components/Items/RoutListing"));
const AddNewsModel = dynamic(() => import("@/components/AddNewsModel"));
const AddProductModel = dynamic(() => import("@/components/AddProductModel"));

const page = () => {
  // your code
  const token = localStorage.getItem("token") ?? "";
  const refreshToken = localStorage.getItem("refreshToken") ?? "";
  const expire = localStorage.getItem("expiration") ?? "";
  if (!token || !refreshToken || !expire) redirect("/");

  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [loadingType, setLoadingType] = useState<boolean>(false);
  const [loadingDirect, setLoadingDirect] = useState<boolean>(false);
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
  const [dataNews, setDataNews] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataGuid, setDataGuid] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  // update
  const [productUp, setProductUp] = useState<{
    Id: number;
    Name: string;
    Price: string;
    Discount: string;
    Description: string;
    UrlShoppe: string;
    categoryId: number;
    categoryName: string;
    path: string;
    FormCollection: any;
    urlImage: { image: string; path: string }[];
  }>();

  const [newsUp, setNewsUp] = useState<
    | {
        id: number;
        name: string;
        create_Date: string;
        content: string;
        urlImage: { image: string; path: string }[];
      }
    | undefined
  >();
  const [guideUp, setGuideUp] = useState<
    | {
        id: number;
        name: string;
        create_Date: string;
        content: string;
        urlImage: { image: string; path: string }[];
      }
    | undefined
  >();
  const [dataCate, setDataCate] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  let product = dataCate[0]?.id;
  let news = dataCate[1]?.id;
  let guide = dataCate[2]?.id;
  const [dataList, setDataList] = useState<
    { categoryName: string; categoryId: number }[]
  >([]);
  const router = useRouter();
  const [add, setAdd] = useState<string>("");
  const [pre, setPre] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [addCate, setAddCate] = useState<boolean>(false);
  const [aboutUs, setAboutUs] = useState<boolean>(false);
  const [categoryType, setCategory] = useState<number>(product ?? 0); // Directory
  const [cate, setCate] = useState<{
    categoryId: number;
    categoryName: string;
  }>({
    categoryId: 0,
    categoryName: "",
  });
  const [additionalPage, setAdditionalPage] = useState<number>(1);
  const [loading, setLoading] = useState("");
  const [routs, setRouts] = useState(["Quản trị"]);
  const [nameRout, setNameRout] = useState("");
  const [load, setLoad] = useState(false);
  const fet = async () => {
    try {
      const axio = httpToken(token, refreshToken);
      setLoadingType(true);
      const res = await axio.get<typeof dataCate>("CategoryType/GetAll");
      setCategory(res.data[0].id);
      setDataCate(res.data);
      setLoadingType(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
      console.log(err, "error here");
    }
  };
  const fetS = async () => {
    setDataList([]);
    try {
      const axio = httpToken(token, refreshToken);
      const which = dataCate.filter((c) => c.id === categoryType)[0]?.name;
      const resCate = await axio.get<
        { categoryName: string; categoryId: number }[]
      >(`Category/GetAll/${which}`);
      setNameRout(resCate.data[0]?.categoryName ?? "");
      setCate({
        categoryId: resCate.data[0]?.categoryId,
        categoryName: resCate.data[0]?.categoryName ?? "",
      });
      setDataList(resCate.data);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
    }
  };

  useEffect(() => {
    fet();
  }, []);

  useEffect(() => {
    if (dataCate.length) {
      fetS();
    }
  }, [dataCate, categoryType]);
  async function fetCateName(name: string, index = 1, search?: string) {
    setLoadingSearch(true);
    setAdditionalPage(1);
    setLoadingDirect(true);
    try {
      const axio = httpToken(token, refreshToken);

      if (categoryType === product) {
        const res = await axio.post("Product/GetPaginationProduct", {
          pageIndex: index,
          pageSize: 1,
          search_CategoryName: name,
          search_Name: search,
        });
        setPageIndex(res.data.totalPageIndex);
        setDataProducts(res.data.data);
      } else {
        setDataProducts([]);
      }
      if (categoryType === news) {
        const res = await axio.post("Blog/GetPaginationProduct", {
          pageIndex: index,
          pageSize: 1,
          search_Name: search,
          search_CategoryName: name,
        });
        setPageIndex(res.data.totalPageIndex);
        setDataNews(res.data.data);
      } else {
        setDataNews([]);
      }
      if (categoryType === guide) {
        const res = await axio.post("Guide/GetPaginationProduct", {
          pageIndex: index,
          pageSize: 1,
          search_Name: search,
          search_CategoryName: name,
        });
        setPageIndex(res.data.totalPageIndex);
        setDataGuid(res.data.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
    }

    setLoadingSearch(false);
    setLoadingDirect(false);
  }
  useEffect(() => {
    fetCateName(nameRout, 1);
    if (routs.length >= 2) {
      routs[1] = nameRout;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      if (nameRout) setRouts((pre) => [...pre, nameRout]);
    }
  }, [nameRout]);

  const handleRount = (vl: string) => {
    // change rout
    setNameRout(vl);
    setPageIndex(0);
    if (routs.length >= 2) {
      routs[1] = vl;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      setRouts((pre) => [...pre, vl]);
    }
    fetCateName(vl, 1);
    setLoad(!load);
  };

  const chooseCate = (id: number) => {
    setCategory(id);
    setAddCate(false);
  };

  const [nameCate, setNameCate] = useState("");
  const handleAddCate = async () => {
    try {
      const axio = httpToken(token, refreshToken);

      if (nameCate) {
        const res = await axio.post<typeof dataCate>("Category/Create", {
          Name: nameCate,
          categoryTypeId: categoryType,
        });
        setAddCate(false);
        setNameCate("");
        if (res.data) fetS();
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
    }
  };
  const handleDeleteDirectory = async (id: number) => {
    try {
      const axio = httpToken(token, refreshToken);
      const res = await axio.delete(`Category/Delete/${id}`);
      if (res.data?.mess) {
        fetS();
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
    }
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    fetCateName(cate.categoryName, 1, search);
  };
  const handleUpdateDirectory = async (id: number, name: string) => {
    try {
      const axio = httpToken(token, refreshToken);
      const res = await axio.put(`Category/Update`, {
        Id: id,
        Name: name,
        CategoryTypeId: categoryType,
      });
      setDataList((pre) =>
        pre.map((r) => {
          if (r.categoryId === id) r.categoryName = name;
          return r;
        })
      );
      return true;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
    }
    return false;
  };
  let managerIndex = false;
  let isIndex = false;
  let managerIndex2 = false;
  let isIndex2 = false;

  return (
    <div className="flex flex-wrap ">
      {login && (
        <div className="w-full h-full z-[999] flex items-center justify-center bg-[#212121d4] fixed top-0 left-0 ">
          <div
            className="w-[350px] flex flex-wrap items-center bg-[#4184a5] justify-center px-3 py-5 rounded-[5px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white">
              Session này đã hết hạn vui lòng ra ngoài đăng nhập lại
            </h3>
            <button
              className="text-white mt-2 text-base cursor-pointer w-full border-[2px]"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("expiration");
                window.location.href = "/";
              }}
            >
              Thoát khỏi session
            </button>
          </div>
        </div>
      )}
      <div className="w-full px-5 py-2">
        <SlideCategory
          loading={loadingType}
          data={dataCate}
          onClick={chooseCate}
          active={categoryType}
        />
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className=" px-5 w-full md:w-[400px]">
          <div className="w-full my-3 mb-4">
            <Routing routs={routs} />
          </div>
          <div className="w-full flex mb-15 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[350px]  mb-5 md:border-r mr-2">
              <div className="w-full">
                <Listing
                  onClick={handleRount}
                  loading={loadingDirect}
                  data={dataList}
                  del={true}
                  handleUpdateDirectory={handleUpdateDirectory}
                  handleDeleteDirectory={handleDeleteDirectory}
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
                      placeholder="Thêm danh mục"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") handleAddCate();
                      }}
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
        <div className="flex w-full md:w-[70%] flex-wrap justify-center border-l border-t border-b-slate-900 p-5 relative">
          {routs[1] && (
            <div
              className="absolute top-1 right-2 z-20 px-3 py-2 rounded-[5px] bg-[#1e7ccd] cursor-pointer text-white"
              onClick={() => {
                setAdd(routs[1]);
                setLoad(!load);
              }}
            >
              {categoryType === product && <p>Thêm sản phẩm</p>}
              {categoryType === news && <p>Thêm tin tức</p>}
              {categoryType === guide && <p>Thêm hướng dẫn</p>}
            </div>
          )}
          <div className="w-full mb-4">
            <InputSearch
              placeholder={routs[1]}
              onChange={handleSearch}
              onClick={handleClick}
              loading={loadingSearch}
            />
          </div>
          {categoryType === product ? (
            <>
              <div className="w-full h-fit flex justify-center pb-1 border-b mb-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex) {
                      isIndex = true;
                      managerIndex = true;
                    } else {
                      managerIndex = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() =>
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              )
                            }
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
              {dataProducts.length > 0 ? (
                dataProducts.map((p) => (
                  <Link
                    key={p.id}
                    href="/[slug]"
                    as={`products/${routs[1]}/${p.name}/${p.id}`}
                    className=" relative w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 mx-3 cursor-pointer"
                  >
                    <div
                      className="absolute right-1 cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setProductUp({
                          Id: p.id,
                          Name: p.name,
                          Price: String(p.price),
                          Description: p.description,
                          Discount: String(p.price_After),
                          categoryId: cate.categoryId,
                          categoryName: cate.categoryName,
                          FormCollection: p.urlImage[0]?.image,
                          path: p.urlImage[0]?.path,
                          urlImage: p.urlImage,
                          UrlShoppe: p.urlShoppe,
                        });
                        setAdd(routs[1]);
                      }}
                    >
                      Update
                    </div>
                    <div className="w-full h-[240px]">
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
                          {p.price.toLocaleString("en-US").replace(/,/g, ".")}đ
                        </p>
                        {p.price_After && (
                          <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                            {p.price_After
                              .toLocaleString("en-US")
                              .replace(/,/g, ".")}
                            đ
                          </p>
                        )}
                      </div>
                      <div
                        className={`text-[13px] h-[38px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
                        dangerouslySetInnerHTML={{ __html: p.description }}
                      ></div>
                    </div>
                    <div className="my-2 flex items-center justify-center relative">
                      <p
                        className="absolute text-sm text-[crimson] top-[5px] left-[10px] "
                        style={{ color: "crimson !important" }}
                        onClick={async (e) => {
                          e.stopPropagation();
                          const isD = window.confirm("Bạn có muốn xoá không?");
                          if (isD) {
                            setLoading(String(p.id));
                            const del = await http.delete(
                              `Product/Delete/${p.id}`
                            );
                            if (productUp) setProductUp(undefined);
                            fetCateName(nameRout);
                            setLoading("");
                          }
                        }}
                      >
                        {loading === String(p.id) ? "deleting..." : "delete"}
                      </p>
                      <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                        View more
                      </button>
                      <a
                        href={p.urlShoppe}
                        target="_blank"
                        className="absolute top-[5px] text-[crimson] right-[30px] "
                        style={{ color: "crimson !important" }}
                      >
                        <SiShopee />
                      </a>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
              <div className="w-full h-fit flex justify-center pb-1 border-t pt-2 mt-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex2) {
                      isIndex2 = true;
                      managerIndex2 = true;
                    } else {
                      managerIndex2 = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() =>
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              )
                            }
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex2 && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex2 && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
            </>
          ) : categoryType === news ? (
            <>
              <div className="w-full h-fit flex justify-center pb-1 border-b mb-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex) {
                      isIndex = true;
                      managerIndex = true;
                    } else {
                      managerIndex = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() =>
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              )
                            }
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
              {dataNews.length > 0 ? (
                dataNews.map((bl) => (
                  <Link
                    href="/[slug]"
                    as={`news/${routs[1]}/${bl.name}/${bl.id}`}
                    className="w-full flex flex-wrap md:flex-nowrap  mb-4 relative"
                    key={bl.id}
                    onClick={() => {
                      setNewsUp(bl);
                      setPre(true);
                    }}
                  >
                    <div
                      className="absolute left-[83px] cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const isD = window.confirm("Bạn có muốn xoá không?");
                        if (isD) {
                          setLoading(String(bl.id));
                          const del = await http.delete(`Blog/Delete/${bl.id}`);
                          fetCateName(nameRout);
                          if (newsUp) setNewsUp(undefined);
                          setLoading("");
                        }
                      }}
                    >
                      {loading === String(bl.id) ? "deleting..." : "delete"}
                    </div>
                    <div
                      className="absolute left-1 cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setNewsUp(bl);
                        setAdd(routs[1]);
                      }}
                    >
                      Update
                    </div>
                    <div className="min-w-full h-[130px] md:min-w-[250px] md:h-[155px]  mr-3 md:mr-5">
                      <img
                        src={bl.urlImage[0]?.image}
                        alt={bl.urlImage[0]?.path}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-fit">
                      <h3
                        className="text-base md:text-[17px] font-bold overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-all",
                        }}
                      >
                        {bl.name}
                      </h3>
                      <p className="text-xs mt-1">
                        {moment(bl.create_Date).format("DD/MM/YYYY HH:MM:SS")}
                      </p>
                      <div
                        className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{ __html: bl.content }}
                      ></div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Không có Blog nào</p>
              )}
              <div className="w-full pt-2 h-fit flex justify-center pb-1 border-t mt-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex2) {
                      isIndex2 = true;
                      managerIndex2 = true;
                    } else {
                      managerIndex2 = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() =>
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              )
                            }
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex2 && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex2 && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-fit flex justify-center pb-1 border-b mb-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex) {
                      isIndex = true;
                      managerIndex = true;
                    } else {
                      managerIndex = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() =>
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              )
                            }
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
              {dataGuid.length > 0 ? (
                dataGuid.map((g) => (
                  <Link
                    href="/[slug]"
                    as={`guide/${routs[1]}/${g.name}/${g.id}`}
                    className="w-full flex flex-wrap md:flex-nowrap  mb-4 relative"
                    key={g.id}
                  >
                    <div
                      className="absolute left-[83px] cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
                      onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const isD = window.confirm("Bạn có muốn xoá không?");
                        if (isD && g.id) {
                          setLoading(String(g.id));
                          const del = await http.delete(`Guide/Delete/${g.id}`);
                          fetCateName(nameRout);
                          if (newsUp) setNewsUp(undefined);
                          setLoading("");
                        }
                      }}
                    >
                      {loading === String(g.id) ? "deleting..." : "delete"}
                    </div>
                    <div
                      className="absolute left-1 cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setGuideUp(g);
                        setAdd(routs[1]);
                      }}
                    >
                      Update
                    </div>
                    <div className="min-w-full h-[130px] md:min-w-[250px] md:h-[155px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
                      <img
                        src={g.urlImage[0]?.image}
                        alt={g.urlImage[0]?.path}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <h3
                        className="text-base md:text-[17px] font-bold overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-all",
                        }}
                      >
                        {g.name}
                      </h3>
                      <p className="text-xs mt-1">
                        {moment(g.create_Date).format("DD/MM/YYYY HH:MM:SS")}
                      </p>
                      <div
                        className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{ __html: g.content }}
                      ></div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Không có guide nào</p>
              )}
              <div className="w-full  h-fit flex justify-center pb-1 border-t mt-3 pt-2">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex2) {
                      isIndex2 = true;
                      managerIndex2 = true;
                    } else {
                      managerIndex2 = false;
                    }
                    return (
                      <div key={p} className="flex w-auto h-fit">
                        {additionalPage > 1 && additionalPage === p && (
                          <div
                            onClick={() =>
                              setAdditionalPage((pre) =>
                                pre - 1 < 1 ? 1 : pre - 1
                              )
                            }
                            className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                          >
                            <MdSkipPrevious />
                          </div>
                        )}
                        {managerIndex2 && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex2 && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
                                  setPageChoice(p);
                                }
                              }}
                              className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                                pageChoice === p ? "bg-[#d2d5d8]" : ""
                              } cursor-pointer`}
                            >
                              {p}
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
      {add ? (
        categoryType === product ? (
          <AddProductModel
            upCate={productUp}
            setUpCate={setProductUp}
            title={routs[1]}
            fet={fetCateName}
            onClick={() => {
              setAdd("");
            }}
            cateId={cate.categoryId}
            cateName={nameRout}
          />
        ) : categoryType === news ? (
          <AddNewsModel
            title={routs[1]}
            onClick={() => {
              setAdd("");
            }}
            newsUp={newsUp}
            setNewsUp={setNewsUp}
            fet={fetCateName}
            cateId={cate.categoryId}
            cateName={nameRout}
          />
        ) : (
          <AddGuideModel
            title={routs[1]}
            onClick={() => {
              setAdd("");
            }}
            newsUp={guideUp}
            setNewsUp={setGuideUp}
            fet={fetCateName}
            cateId={cate.categoryId}
            cateName={nameRout}
          />
        )
      ) : (
        <></>
      )}
      {aboutUs && (
        <FormAboutUs title="About us" onClick={() => setAboutUs(false)} />
      )}
      <div
        className="w-fit fixed bg-[#0099e6] bottom-[80px] z-10 left-[52px] rounded-[5px] cursor-pointer font-medium px-3 py-1 text-white"
        onClick={() => setAboutUs(true)}
      >
        About us
      </div>
      {(productUp || newsUp) && pre && (
        <PreviousAdmin setPre={setPre} product={productUp} news={newsUp} />
      )}
    </div>
  );
};

export default page;
function useEffectLayout(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
