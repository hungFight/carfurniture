"use client";
import http from "@/utils/http";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
const FormAboutUs: React.FC<{ title: string }> = ({ title }) => {
  const [data, setData] = useState<{
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    url_Mess: string;
  }>();
  const dataF = useRef<typeof data>();
  const fet = async () => {
    const res = await http.get<(typeof data)[]>("AboutUs/GetAll");
    console.log(res, "data");
    dataF.current = res.data[0];
    setData(res.data[0]);
  };
  useEffect(() => {
    fet();
  }, []);
  const handleUpdate = async () => {
    if (JSON.stringify(dataF.current) !== JSON.stringify(data) && data) {
      const res = await http.put<(typeof data)[]>("AboutUs/Update", {
        Id: data.id,
        Name: data.name,
        Address: data.address,
        Phone: data.phone,
        Email: data.email,
        Url_Mess: data?.url_Mess,
      });
      console.log(res.data, "update");
    }
  };
  return (
    <>
      <div className="w-full z-50 h-full p-5 sm:w-[640px] overflow-overlay  bg-white">
        <h3 className="w-full p-3 text-center relative">About us</h3>
        <div className="w-full flex items-center h-fit my-3">
          <label className="text-base mr-3" htmlFor="nameCTY">
            Tên công ty
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="nameCTY"
            type="text"
            onChange={(e) => {
              if (data) {
                setData({ ...data, name: e.target.value });
              }
            }}
            value={data?.name ?? ''}
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
            value={data?.address ?? ''}
            onChange={(e) => {
              if (data) {
                setData({ ...data, address: e.target.value });
              }
            }}
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
            value={data?.phone ?? ''}
            onChange={(e) => {
              if (data) {
                setData({ ...data, phone: e.target.value });
              }
            }}
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
            value={data?.email ?? ''}
            onChange={(e) => {
              if (data) {
                setData({ ...data, email: e.target.value });
              }
            }}
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
            value={data?.url_Mess ?? ''}
            onChange={(e) => {
              if (data) {
                setData({ ...data, url_Mess: e.target.value });
              }
            }}
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
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default FormAboutUs;
