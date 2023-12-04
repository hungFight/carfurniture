import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
const Listing: React.FC<{
  data?: {
    categoryName: string;
    categoryId: number;
  }[];
  choice: string;
  onClick: (vl: string) => void;
  default?: string;
  Tag?: any;
  menu?: string;
  loading?: boolean;
  handleDeleteDirectory: (id: number) => Promise<void>;
}> = ({
  data,
  choice,
  onClick,
  default: defaultR,
  Tag = Link,
  menu,
  handleDeleteDirectory,
  loading,
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
              {loading ? (
                <p>Loading...</p>
              ) : (
                data?.map((r) => (
                  <div key={r.categoryId} className="w-full relative mb-3">
                    <Tag
                      href={`/[slug]`}
                      as={`/${defaultR}/${r.categoryName}`}
                      className={`w-full  text-sm md:text-base cursor-pointer  ${
                        choice === r.categoryName ? "text-[#0087ff]" : ""
                      }`}
                      onClick={() => onClick(r.categoryName)}
                    >
                      {r.categoryName}
                    </Tag>
                    <div
                      className="absolute top-1 right-2"
                      onClick={async () =>
                        await handleDeleteDirectory(r.categoryId)
                      }
                    >
                      <IoClose />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="hidden min-[768px]:block">
          {data?.map((r) => (
            <div
              key={r.categoryId}
              className="w-full border-b relative border-[#303131]  mb-3"
            >
              <Tag
                href={`/[slug]`}
                as={`/${defaultR}/${r.categoryName}`}
                className={`w-full  text-sm md:text-base cursor-pointer  ${
                  choice === r.categoryName ? "text-[#0087ff]" : ""
                }`}
                onClick={() => onClick(r.categoryName)}
              >
                {r.categoryName}
              </Tag>
              <div
                className="absolute top-1 right-2"
                onClick={async () => await handleDeleteDirectory(r.categoryId)}
              >
                <IoClose />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
