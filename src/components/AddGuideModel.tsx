"use client";
import React, { useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import styles from "../app/news/styleNews.module.scss";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
const AddGuideModel: React.FC<{
  title: string;
  onClick: () => void;
  cateId: number;
  cateName: string;
  newsUp:
    | {
        id: number;
        name: string;
        create_Date: string;
        content: string;
        urlImage: {
          image: string;
          path: string;
        }[];
      }
    | undefined;
  fet(name: string): Promise<void>;
  setNewsUp: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          name: string;
          create_Date: string;
          content: string;
          urlImage: {
            image: string;
            path: string;
          }[];
        }
      | undefined
    >
  >;
}> = ({ title, onClick, cateId, cateName, newsUp, fet, setNewsUp }) => {
  const [value, setValue] = useState<string>(newsUp?.content ?? "");
  const [pre, setPre] = useState<boolean>(false);

  const [product, setProduct] = useState<{
    Id?: number;
    Name: string;
    Content: string;
    categoryId: number;
    FormCollection: any;
  }>({
    Id: newsUp?.id,
    Name: newsUp?.name ?? "",
    Content: newsUp?.content ?? "",
    categoryId: cateId,
    FormCollection: null,
  });
  const [image, setImage] = useState<string>(newsUp?.urlImage[0].image ?? "");
  console.log(product);
  const checkRef = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(newsUp, "newsUp");

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const handleUploadFIle = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      checkRef.current = true;
      setImage(URL.createObjectURL(file));
      setProduct({ ...product, FormCollection: file });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(product.FormCollection, "product");
    setLoading(true);
    const formData = new FormData();
    product.Content = value;
    formData.append("categoryName", cateName);
    formData.append("Name", product.Name);
    formData.append("Content", product.Content);
    formData.append("categoryId", String(product.categoryId));
    formData.append("FormCollection", product.FormCollection);
    if (newsUp) {
      // update
      formData.append("Id", String(newsUp.id));

      formData.append("FormCollection", product.FormCollection);
      if (checkRef.current) formData.append("Paths", newsUp.urlImage[0]?.path);
      if (newsUp.id !== null) {
        const res = await http.put("Guide/Update", formData);
      }
    } else {
      if (cateName && cateId && product.Name && product.Content) {
        //add
        formData.append("FormCollection", product.FormCollection);
        formData.append("Name", product.Name);
        formData.append("Content", product.Content);
        if (product.FormCollection) {
          const res = await http.post("Guide/Create", formData);
        }
      }
    }
    await fet(cateName);
    checkRef.current = false;
    setNewsUp(undefined);
    onClick();
    setLoading(false);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", , "video"],
      ["clean"],
      [{ size: ["small", false, "large", "huge"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];
  return (
    <>
      <div
        className="w-full h-full top-0 left-0 z-9 fixed bg-[#1f1f1fde] z-50"
        onClick={onClick}
      ></div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full h-full p-5 overflow-auto z-50 sm:w-[640px] flex justify-center flex-wrap  fixed top-1/2 right-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"
      >
        <h3 className="w-full p-3 text-center relative">
          {title}
          <div
            className="absolute top-3 left-2 text-[30px] cursor-pointer"
            onClick={onClick}
          >
            <IoCloseCircleOutline />
          </div>
        </h3>
        <div className="w-full my-2 flex items-center flex-wrap">
          <label className="text-base mr-3" htmlFor="productFile">
            Tải ảnh hưỡng dẫn:
          </label>
          <input
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productFile"
            type="file"
            name="file"
            onChange={(e) => handleUploadFIle(e)}
          />
          {image && (
            <div className="w-[200px] h-[200px]">
              <img src={image} className="w-full h-full" />
            </div>
          )}
        </div>
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productName">
            Tiêu đề:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productName"
            type="text"
            value={product?.Name ?? ""}
            onChange={(e) => setProduct({ ...product, Name: e.target.value })}
            placeholder="Tiêu đề"
          />
        </div>{" "}
        <div className={`w-full my-2 flex items-center  flex-wrap `}>
          <h3 className="text-base mr-3 w-full">Content:</h3>
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
            className="text-sm px-3 py-1 hover:text-[#0074da] cursor-pointer"
            onClick={() => setPre(true)}
          >
            Preview
          </div>
          <button
            className="text-sm px-3 py-1 hover:text-[#0074da] cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {pre && (
        <div
          className="w-full h-full fixed top-0 left-0 bg-white z-[999] overflow-auto"
          onClick={() => setPre(false)}
        >
          <div className="w-full h-full flex justify-between mb-4 overflow-auto md:w-[80%] mt-5">
            <div className="w-full h-full">
              <div className="w-fill h-[260px] min-[600px]:w-[600px] min-[600px]:h-[300px]">
                <img src={image} className="w-full h-full" />
              </div>
              <div className="w-full h-full p-2">
                <h3 className="text-base md:text-[17px] font-bold">
                  {product.Name}
                </h3>
                <p className="text-sm ">date time</p>
                <div
                  className={`w-full text-sm md:text-base  mt-3  ${styles.dangerouslySet}`}
                  // style={{
                  //   display: "-webkit-box",
                  //   WebkitLineClamp: 3,
                  //   WebkitBoxOrient: "vertical",
                  // }}
                  dangerouslySetInnerHTML={{ __html: value }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddGuideModel;
