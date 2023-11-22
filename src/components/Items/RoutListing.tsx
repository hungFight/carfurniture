"use client";
import InputSearch from "@/components/Items/InputSearch";
import Listing from "@/components/Items/Listing";
import Routing from "@/components/Items/Routing";
import Image from "next/image";
import styles from "./styleNews.module.scss";
import { useState } from "react";
const RoutListing: React.FC<{
  currentPath: string;
  title: string;
  defaultR?: string;
}> = ({ currentPath, title, defaultR }) => {
  const [routs, setRouts] = useState([
    title,
    window?.location.pathname.split(`${currentPath}/`)[1]
      ? window.location.pathname.split(`${currentPath}/`)[1]
      : defaultR,
  ]);
  console.log(window.location.pathname.split(`${currentPath}/`), "rout");

  const [load, setLoad] = useState(false);
  const handleRount = (vl: string) => {
    if (routs.length >= 2) {
      routs[1] = vl;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      setRouts((pre) => [...pre, vl]);
    }
    setLoad(!load);
  };
  return (
    <div className=" px-5 w-full md:w-[400px]">
      <div className="w-full my-3 mb-4">
        <Routing routs={routs} />
      </div>
      <div className="w-full flex mb-15 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[350px]  mb-5 md:border-r mr-2">
          <div className="w-full">
            <Listing
              onClick={handleRount}
              choice={routs[1]}
              default={currentPath}
            />
          </div>
        </div>
        <h3 className="w-full md:hidden text-center border-b">
          {routs[1]} {currentPath}
        </h3>
      </div>
    </div>
  );
};

export default RoutListing;
