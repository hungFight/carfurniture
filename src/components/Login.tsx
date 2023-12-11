import React, { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
const Login = () => {
  const [eye, setEye] = useState<boolean>(true);
  return (
    <div className="w-full h-full z-[999] flex items-center justify-center bg-[#212121d4] fixed top-0 left-0 ">
      <div className="w-[350px] flex flex-wrap items-center bg-[#4184a5] justify-center px-3 py-5 rounded-[5px]">
        <h3 className="text-base w-full text-center font-bold text-white mb-3">
          MazdaShop.vn
        </h3>
        <input
          type="text"
          placeholder="User name"
          required
          name="userName"
          className="w-full px-3 py-2 rounded-[5px] mb-3 border-[2px] border-[#308db4]"
        />
        <div className="w-full mb-3 relative">
          <input
            type={eye ? "password" : "text"}
            placeholder="password"
            required
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
        <button className="px-5 py-1 rounded-[5px] bg-white">Login</button>
      </div>
    </div>
  );
};

export default Login;
