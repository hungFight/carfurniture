"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import styles from "./styleComponent.module.scss";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
import Image from "@/app/product/[cate]/[...detailed]/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { redirect } from "next/navigation";
import httpToken from "@/utils/httpToken";
import { useCookies } from "next-client-cookies";
import { AxiosError } from "axios";

const AddProductModel: React.FC<{
  title: string;
  onClick: () => void;
  cateId: number;
  cateName: string;
  fet(name: string): Promise<void>;

  upCate?: {
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
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  setUpCate: React.Dispatch<
    React.SetStateAction<
      | {
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
          urlImage: {
            image: string;
            path: string;
          }[];
        }
      | undefined
    >
  >;
  setLogin: (value: React.SetStateAction<boolean>) => void;
}> = ({
  title,
  onClick,
  cateId,
  cateName,
  fet,
  upCate,
  setUpCate,
  setLogin,
}) => {
  const cookies = useCookies();
  const [value, setValue] = useState<string>(upCate?.Description ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const [pre, setPre] = useState<boolean>(false);
  const checkRef = useRef<boolean>(false);
  const [product, setProduct] = useState<{
    Name: string;
    Price: string;
    Discount: string;
    Description: string;
    UrlShoppe: string;
    categoryId: number;
    categoryName: string;
    FormCollection: any;
  }>({
    Name: upCate?.Name ?? "",
    Price: upCate?.Price ?? "",
    Discount: upCate && upCate?.Discount !== "null" ? upCate.Discount : "",
    Description: "",
    UrlShoppe: upCate?.UrlShoppe ?? "",
    categoryId: upCate?.categoryId ?? cateId,
    categoryName: upCate?.categoryName ?? cateName,
    FormCollection: null,
  });
  const [image, setImage] = useState<string[]>(
    upCate?.urlImage.map((f) => f.image) ?? []
  );
  const tokeRef = useRef<string>("");

  const handleUploadFIle = (e: any) => {
    const files = e.target.files;
    const fils = [];
    for (let i = 0; i < files.length; i++) {
      fils.push(files[i]);
    }
    if (fils.length) {
      checkRef.current = true;
      setImage(fils.map((f: any) => URL.createObjectURL(f)));
      setProduct({ ...product, FormCollection: fils });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const accessToken = cookies.get("token");
      const refreshToken = cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        const axio = httpToken(accessToken, refreshToken, cookies);

        setLoading(true);
        const formData = new FormData();
        product.Description = value;
        formData.append("Name", product.Name);
        formData.append("Price", product.Price);
        formData.append("Description", product.Description);
        formData.append("UrlShoppe", product.UrlShoppe);
        formData.append("categoryId", String(product.categoryId));
        formData.append("categoryName", cateName);
        product.FormCollection?.map((f: any) => {
          formData.append("FormCollection", f);
        });
        if (!upCate) {
          formData.append("Price_After", product.Discount);
          const res = await axio.post("Product/Create", formData);
        } else {
          formData.append("Price_After", product.Discount);
          if (checkRef.current) {
            upCate.urlImage.map((f) => {
              formData.append("Paths", f.path);
            });
          }
          formData.append("Id", String(upCate.Id));
          const res = await axio.put("Product/Update", formData);
          checkRef.current = false;
        }
        await fet(cateName);
        setUpCate(undefined);
        onClick();
        setLoading(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setLogin(true);
      }
    }
  };
  useEffect(() => {
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    if (!token || !refreshToken) {
      redirect("/");
    }
  }, []);
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "sub",
    "super",
    "color",
    "background",
    "link",
    "image",
    "video",
    "align",
  ];

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
          {
            color: ["red", "green", "blue", "yellow", "black", "pink", "gray"],
          },
          { background: [] },
        ],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
      ],
      handlers: {
        // Add custom handlers if needed
      },
    },
    // Add more modules as needed
  };

  return (
    <>
      <div
        className="w-full h-full top-0 left-0 z-9 fixed bg-[#1f1f1fde] z-50"
        onClick={onClick}
      ></div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className=" h-full p-5 items-start overflow-auto z-50 w-[80%] flex justify-center flex-wrap  fixed top-1/2 right-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"
      >
        <h3 className="w-full p-3 h-fit text-center relative bg-[#0f6ab8] rounded-[5px] text-white">
          Danh mục {title}
          <div
            className="absolute top-[9px] left-2 text-[30px] cursor-pointer  hover:text-[#ff4367]"
            onClick={onClick}
          >
            <IoCloseCircleOutline />
          </div>
        </h3>
        <div className="w-1/2 min-h-[85%]">
          {" "}
          <div className="w-full my-2 flex items-center flex-wrap">
            <label
              className="text-base cursor-pointer  w-[127px] px-5 py-1 rounded-[5px] shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px]"
              htmlFor="productFile"
            >
              Tải ảnh lên
            </label>
            <input
              required={upCate ? false : true}
              className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="productFile"
              type="file"
              name="file"
              hidden
              multiple
              onChange={(e) => handleUploadFIle(e)}
            />
            {image && (
              <div className="w-full  flex flex-wrap">
                {image.map((url) => (
                  <img
                    src={url}
                    key={url}
                    className="w-[150px] h-[150px] mr-2 mt-2"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="w-full my-2 flex items-center">
            <input
              value={product.Name}
              required
              className="w-[350px] outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="productName"
              type="text"
              onChange={(e) => setProduct({ ...product, Name: e.target.value })}
              placeholder="Tên sản phẩm"
            />
          </div>{" "}
          <div className="w-full my-2 flex items-center">
            <input
              value={product.Price}
              required
              className="w-[350px] outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="productPrice"
              type="text"
              onChange={(e) =>
                setProduct({ ...product, Price: e.target.value })
              }
              placeholder="Giá sản phẩm"
            />
          </div>{" "}
          <div className="w-full my-2 flex items-center">
            <input
              id="productDiscount"
              type="text"
              value={product.Discount}
              onChange={(e) =>
                setProduct({ ...product, Discount: e.target.value })
              }
              placeholder="Giá gốc sản phẩm"
              className="w-[350px] outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            />
          </div>{" "}
          <div className="w-full my-2 flex items-center">
            <input
              required
              className="w-[350px] outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="productShop"
              value={product.UrlShoppe}
              type="text"
              placeholder="Link shop"
              onChange={(e) =>
                setProduct({ ...product, UrlShoppe: e.target.value })
              }
            />
          </div>{" "}
        </div>
        <div className={`w-1/2 my-2 flex items-center  flex-wrap `}>
          <ReactQuill
            className="w-full"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>{" "}
        {/* <div

        ></div> */}
        <div className="flex justify-around items-center w-full">
          <div
            className="text-sm px-3 py-1 bg-[#3390e1] text-white rounded-[5px]  cursor-pointer"
            onClick={() => setPre(true)}
          >
            Preview
          </div>
          <button
            className="text-sm bg-[#3390e1] text-white rounded-[5px] px-3 py-1  cursor-pointer"
            type="submit"
          >
            Submit{loading ? " is in processing..." : ""}
          </button>
        </div>
      </form>
      {pre && (
        <div
          className="w-full h-full fixed top-0 left-0 bg-white z-[999] overflow-auto"
          onClick={() => setPre(false)}
        >
          <div className="w-full min-[1200px]:w-[1200px] relative mt-15 border-t p-5">
            <div>
              <div className="min-[1000px]:flex">
                <div
                  className={`w-full ${
                    image?.length > 1 ? "h-[470px] " : "h-[350px] "
                  } min-[600px]:w-[500px]`}
                >
                  <div className="w-full h-[350px] min-[600px]:w-[500px]  ">
                    <img
                      src={image[0]}
                      alt={image[0]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {image.length > 1 && (
                    <div className="h-[100px] mt-3">
                      <Swiper
                        pagination={true}
                        modules={[Pagination]}
                        className="mySwiper h-full"
                        spaceBetween={15}
                        slidesPerView={5}
                      >
                        {image.map((f) => (
                          <SwiperSlide key={f}>
                            <img
                              src={f}
                              alt={f}
                              className="w-full h-full object-cover"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>

                <div className="mt-1 min-[1000px]:ml-3 ">
                  <h3
                    className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                  >
                    {product.Name}
                  </h3>
                  <div className="w-full mt-1 md:mt-2 flex  items-center border-b border-solid">
                    <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                      {product.Price}đ
                    </p>
                    {product.Discount && (
                      <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                        {product.Discount}đ
                      </p>
                    )}
                  </div>
                  <div className="mt-3 flex ">
                    <a
                      href={"#"}
                      target="_blank"
                      className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center"
                    >
                      <div className="flex text-[20px] text-[#4993de] mr-2">
                        <PiMessengerLogoLight />
                      </div>{" "}
                      Messenger
                    </a>
                    <a
                      href={`#`}
                      className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center"
                    >
                      <div className="flex text-[20px] text-[#57eb57] mr-2">
                        <CiPhone />
                      </div>{" "}
                      00000000000
                    </a>
                    <a
                      href={"#"}
                      target="_blank"
                      className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] flex items-center bg-slate-700"
                    >
                      <div className="flex text-[#ff6f6f] text-[20px] mr-2">
                        {" "}
                        <SiShopee />
                      </div>{" "}
                      Shoppe
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold">Mô tả</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: value }}
                  className={`text-xs md:text-[13px] w-full mb-5 ${styles.dangerouslySet}`}
                ></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModel;
