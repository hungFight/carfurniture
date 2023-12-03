"use client";
import React from "react";
import styles from "./styleComponent.module.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
const AddNewsModel: React.FC<{
  title: string;
  onClick: () => void;
  cateId: number;
  cateName: string;
}> = ({ title, onClick, cateId, cateName }) => {
  const [value, setValue] = useState<string>("");
  const [pre, setPre] = useState<boolean>(false);

  const [news, setNews] = useState<{
    Name: string;
    Content: string;
    categoryId: number;
    FormCollection: any;
  }>({
    Name: "",
    Content: "",
    categoryId: cateId,
    FormCollection: null,
  });
  const [image, setImage] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    news.Content = value;
    formData.append("Name", news.Name);
    formData.append("Content", news.Content);
    formData.append("categoryId", String(news.categoryId));
    formData.append("FormCollection", news.FormCollection);
    const res = await http.post("Blog/Create", formData);
  };
  const handleUploadFIle = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setNews({ ...news, FormCollection: file });
    }
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
  console.log(value, "news");

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
            Tải ảnh sản phẩm lên:
          </label>
          <input
            required
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
            onChange={(e) => setNews({ ...news, Name: e.target.value })}
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
          className="w-full h-full fixed top-0 left-0 bg-white z-[999] flex justify-center"
          onClick={() => setPre(false)}
        >
          <div className="w-full h-full flex justify-between mb-4 overflow-auto md:w-[80%] mt-5">
            <div className="w-full h-full">
              <div className="w-fill h-[260px] min-[600px]:w-[600px] min-[600px]:h-[300px]">
                <img
                  src="https://pasal.edu.vn/upload_images/images/2020/03/05/dfgdf.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-full p-2">
                <h3 className="text-base md:text-[17px] font-bold">
                  {news.Name}
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

export default AddNewsModel;
