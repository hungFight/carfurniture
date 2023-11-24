"use client";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
const FormAboutUs: React.FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  return (
    <>
      <div
        className="w-full h-full top-0 left-0 z-9 fixed bg-[#1f1f1fde] z-50"
        onClick={onClick}
      ></div>
      <div className="w-full z-50 h-full p-5 sm:w-[640px] overflow-overlay z-10 fixed top-1/2 right-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white">
        <h3 className="w-full p-3 text-center relative">
          About us
          <div
            className="absolute top-3 left-2 text-[30px] cursor-pointer"
            onClick={onClick}
          >
            <IoCloseCircleOutline />
          </div>
        </h3>
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="nameCTY">
            Tên công ty
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="nameCTY"
            type="text"
            placeholder="Tên công ty"
          />
        </div>
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="address">
            Địa chỉ
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="address"
            type="text"
            placeholder="Tên sản phẩm"
          />
        </div>{" "}
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="sdt">
            SĐT:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="sdt"
            type="text"
            placeholder="Số điện thoại"
          />
        </div>{" "}
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            required
            type="text"
            placeholder="Email"
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
          />
        </div>{" "}
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="Messenger">
            Messenger
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="Messenger"
            type="text"
            placeholder="Messenger"
          />
        </div>{" "}
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="Location">
            Location
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="Location"
            type="text"
            placeholder="Location"
          />
        </div>{" "}
        <div className="w-full text-center">
          <button
            type="submit"
            className=" text-sm h-fit rounded-[5px] border-[#4a8cbf] border-[1px] px-3 py-1 mt-5 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default FormAboutUs;
