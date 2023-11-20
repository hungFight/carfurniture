import React from "react";
import { CiSearch } from "react-icons/ci";

const InputSearch = () => {
  return (
    <div className="flex relative w-fit">
      <input
        type="text"
        placeholder="Search"
        className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
      />
      <div className="text-[20px] flex items-center justify-center p-1 absolute right-1 top-[2px]">
        <CiSearch />
      </div>
      <div className="text-[14px] shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] rounded-md cursor-pointer flex items-center justify-center p-1 absolute right-[-70px] top-[2px]">
        Tìm kiếm
      </div>
    </div>
  );
};

export default InputSearch;
