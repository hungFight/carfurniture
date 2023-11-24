"use client";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
const AddProductModel: React.FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const handleUploadFIle = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <>
      <div
        className="w-full h-full top-0 left-0 z-9 fixed bg-[#1f1f1fde] z-50"
        onClick={onClick}
      ></div>
      <form
        encType="multipart/form-data"
        className="w-full h-full p-5 z-50 sm:w-[640px] flex justify-center flex-wrap overflow-overlay z-10 fixed top-1/2 right-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"
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
        <div className="w-full flex items-center">
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
        </div>
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productName">
            Tên sản phẩm:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productName"
            type="text"
            placeholder="Tên sản phẩm"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productPrice">
            Giá sản phẩm:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productPrice"
            type="text"
            placeholder="Giá sản phẩm"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productDiscount">
            Giá gốc sản phẩm:
          </label>
          <input
            id="productDiscount"
            required
            type="text"
            placeholder="Giá gốc sản phẩm"
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productSDT">
            Số điện thoại:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productSDT"
            type="text"
            placeholder="Số điện thoại"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productMess">
            Link messenger:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productMess"
            type="text"
            placeholder="Link messenger"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productShop">
            Link shop:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productShop"
            type="text"
            placeholder="Link shop"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productDes">
            Mô tả:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productDes"
            type="text"
            placeholder="Mô tả"
          />
        </div>{" "}
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productVideo">
            Id video của YouTuBe:
          </label>
          <input
            id="productVideo"
            type="text"
            placeholder="Id video của YouTuBe"
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
          />
        </div>
        <div className="w-full flex items-center">
          <label className="text-base mr-3" htmlFor="productFile">
            Tải ảnh mô tả:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productFile"
            type="file"
            name="file"
          />
        </div>
        <div className="w-full flex p-3 justify-around">
          <button
            type="button"
            className=" text-sm h-fit rounded-[5px] border-[#4a8cbf] border-[1px] px-3 py-1 cursor-pointer"
          >
            Xem trước
          </button>{" "}
          <button
            type="submit"
            className=" text-sm h-fit rounded-[5px] border-[#4a8cbf] border-[1px] px-3 py-1 cursor-pointer"
          >
            Thêm
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProductModel;
