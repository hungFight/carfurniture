"use client";
import http from "@/utils/http";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
const Login = () => {
  const [account, setAccount] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });
  const [err, setErr] = useState<boolean>(false);
  const [eye, setEye] = useState<boolean>(true);
  const handleLogin = async () => {
    if (account.userName && account.password) {
      const res = await http.post<{
        expiration: string;
        refreshToken: string;
        token: string;
      }>("/User/Login", {
        username: account.userName,
        password: account.password,
      });

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("expiration", res.data.expiration);
        window.location.reload();
      } else {
        setErr(true);
      }
    } else {
      setErr(true);
    }
  };
  return (
    <div className="w-full h-full z-[999] flex items-center justify-center bg-[#212121d4] fixed top-0 left-0 ">
      <div className="w-[350px] flex flex-wrap items-center bg-[#4184a5] justify-center px-3 py-5 rounded-[5px]">
        <h3 className="text-base w-full text-center font-bold text-white mb-3">
          MazdaShop.vn
        </h3>
        {err && (
          <h3 className="text-base w-full text-center font-bold text-red-500 mb-3">
            Tài khoản hoặc password sai!
          </h3>
        )}
        <input
          type="text"
          placeholder="User name"
          required
          name="userName"
          onChange={(e) => setAccount({ ...account, userName: e.target.value })}
          className="w-full px-3 py-2 rounded-[5px] mb-3 border-[2px] border-[#308db4]"
        />
        <div className="w-full mb-3 relative">
          <input
            type={eye ? "password" : "text"}
            placeholder="password"
            required
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            name="password"
            className="w-full px-3 py-2 rounded-[5px]  border-[2px] border-[#308db4]"
          />
          <p className="text-white mt-2 text-base">Quên mật khẩu</p>
          {eye ? (
            <div
              className="absolute top-[13px] right-3"
              onClick={() => setEye(false)}
            >
              <IoEyeOffOutline />
            </div>
          ) : (
            <div
              className="absolute top-[13px] right-3"
              onClick={() => setEye(true)}
            >
              <MdOutlineRemoveRedEye />
            </div>
          )}
        </div>
        <button
          className="px-5 py-1 rounded-[5px] bg-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
