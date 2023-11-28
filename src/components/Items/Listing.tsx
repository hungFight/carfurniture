import Link from "next/link";
import React, { useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
const Listing: React.FC<{
  data?: string[];
  choice: string;
  onClick: (vl: string) => void;
  default?: string;
  Tag?: any;
  menu?: string;
}> = ({
  data = ["Mazda", "lamborghini"],
  choice,
  onClick,
  default: defaultR,
  Tag = Link,
  menu,
}) => {
  const [onTap, setOnTap] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div className="w-full md:w-[80%] max-[768px]:flex ">
        <div className="w-full p-2 relative mb-10 font-medium rounded-[30px] whitespace-nowrap text-base border border-black text-center">
          Danh muc {menu}
          <div
            className="w-full h-full flex items-center justify-end absolute top-0 right-0 min-[768px]:hidden pr-3"
            onClick={() => setOnTap(!onTap)}
          >
            <PiDotsNineBold />
          </div>
          {onTap && (
            <div
              className="absolute w-full bg-white top-[44px] left-0 rounded-[5px] px-1 py-5 shadow-[0_0_4px_#909090] z-20 "
              onClick={(e) => e.stopPropagation()}
            >
              {data.map((r) => (
                <div key={r} className="w-full  mb-3">
                  <Tag
                    href={`/${defaultR}/${r}`}
                    className={`w-full  text-sm md:text-base cursor-pointer  ${
                      choice === r ? "text-[#0087ff]" : ""
                    }`}
                    onClick={() => onClick(r)}
                  >
                    {r}
                  </Tag>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden min-[768px]:block">
          {data.map((r) => (
            <div key={r} className="w-full border-b border-[#303131]  mb-3">
              <Tag
                href={`/${defaultR}/${r}`}
                className={`w-full  text-sm md:text-base cursor-pointer  ${
                  choice === r ? "text-[#0087ff]" : ""
                }`}
                onClick={() => onClick(r)}
              >
                {r}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
