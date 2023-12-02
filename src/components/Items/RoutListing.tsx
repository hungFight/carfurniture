"use client";
import InputSearch from "@/components/Items/InputSearch";
import Listing from "@/components/Items/Listing";
import Routing from "@/components/Items/Routing";
import Image from "next/image";
import styles from "./styleNews.module.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const RoutListing: React.FC<{
  dataList?: string[];
  currentPath: string;
  title: string;
  defaultR?: string;
  cate?: string[];
}> = ({ currentPath, title, defaultR, cate, dataList }) => {
  const pathname = usePathname();
  const [routs, setRouts] = useState([
    title,
    window?.location.pathname.split(`/`)[2]
      ? window.location.pathname.split(`/`)[2]
      : defaultR,
  ]);
  console.log(window.location.pathname.split(`/`), "rout defaultR", defaultR);
  useEffect(() => {
    if (!window.location.pathname.split(`${currentPath}/`)[1])
      setRouts((pre) => pre.filter((r, index) => index !== 1));
    console.log(
      "vooooo",
      window.location.pathname.split(`/`)[3],
      window.location.pathname.split(`/`)
    );
    if (pathname.split(routs[1] ?? "")[1]) {
      if (window.location.pathname.split(`/`)[3]) {
        console.log("vooooo 333");

        routs[1] = window.location.pathname.split(`/`)[2];
        routs[2] = decodeURIComponent(window.location.pathname.split(`/`)[3]);
        setRouts(routs);
      }

      setLoad(!load);
    } else {
      console.log("vooooo 11c");
      routs[1] = window.location.pathname.split(`/`)[2];
      setRouts(routs.filter((r, index) => index !== 2));
      setLoad(!load);
    }
    console.log("vooo", pathname.split(routs[1] ?? ""));
  }, [pathname]);
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
    <div className={`px-5 w-full ${routs[3] ? "" : "md:w-[400px]"} `}>
      <div className="w-full my-3 mb-4">
        <Routing routs={routs} />
      </div>
      {!routs[2] && (
        <div className="w-full flex mb-15 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-[350px]  mb-5 md:border-r mr-2">
            <div className="w-full">
              <Listing
                onClick={handleRount}
                choice={routs[1]}
                data={cate ?? []}
                default={currentPath}
              />
            </div>
          </div>
          <h3 className="w-full md:hidden text-center border-b">
            {routs[1]} {currentPath}
          </h3>
        </div>
      )}
    </div>
  );
};

export default RoutListing;
