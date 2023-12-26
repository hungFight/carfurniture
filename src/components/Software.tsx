"use client";
import http from "@/utils/http";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import httpToken from "@/utils/httpToken";
import { AxiosError } from "axios";
const Software: React.FC<{
  title: string;
  onClick: () => void;
  setLogin: (value: React.SetStateAction<boolean>) => void;
}> = ({ title, onClick, setLogin }) => {
  const [data, setData] = useState<
    {
      id: number;
      name: string;
      link: string;
    }[]
  >([]);
  const dataF = useRef<typeof data>();
  const tokeRef = useRef<string>("");
  const cookies = useCookies();
  const [loading, setLoading] = useState<boolean>(false);
  const fet = async (token: string, refreshToken: string) => {
    const axio = httpToken(token, refreshToken, cookies);
    if (tokeRef.current) {
      const res = await axio.get<(typeof data)[]>("AboutUs/GetAll");
      dataF.current = res.data[0];
      setData(res.data[0]);
    }
  };

  useEffect(() => {
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    if (!token || !refreshToken) {
      redirect("/");
    } else {
      tokeRef.current = token;
      fet(token, refreshToken);
    }
  }, []);

  // const handleUpdate = async () => {
  //   try {
  //     const tok = cookies.get("token");
  //     const tokR = cookies.get("refreshToken");

  //     if (tok && tokR) {
  //       const axio = httpToken(tok, tokR, cookies);
  //       if (tokeRef.current) {
  //         setLoading(true);

  //         if (
  //           dataF.current?.id &&
  //           JSON.stringify(dataF.current) !== JSON.stringify(data) &&
  //           data
  //         ) {
  //           const res = await axio.put<(typeof data)[]>("AboutUs/Update", {
  //             Id: data.id,
  //             Name: data.name,

  //           });

  //           onClick();
  //         } else {
  //           const res = await axio.post<(typeof data)[]>("AboutUs/Create", {
  //             Id: data.id,
  //             Name: data.name,
  //             Address: data.address,
  //             Phone: data.phone,
  //             Email: data.email,
  //             Url_Mess: data?.url_Mess,
  //             google_map: data.google_map,
  //           });
  //         }
  //       }
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     if (err.response?.status === 400) {
  //       setLogin(true);
  //     }
  //   }
  // };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center bg-[#1c1c1cc4] z-[999]"
      onClick={onClick}
    >
      <div
        className="w-full z-50 h-full p-5 sm:w-[640px] overflow-overlay  bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="w-full p-3 text-center relative">Software</h3>

        {data.map((d) => (
          <div key={d.id}>
            <div className="w-full flex items-center h-fit my-3">
              <input
                required
                className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
                id="address"
                type="text"
                value={d?.name}
                placeholder="Tên phần mềm"
              />
            </div>{" "}
            <div className="w-full flex items-center h-fit my-3">
              <input
                required
                className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
                id="sdt"
                type="text"
                value={d.link}
                placeholder="Link"
              />
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Software;
