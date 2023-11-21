import Link from "next/link";
import React from "react";

const Listing: React.FC<{
  data: string[];
  choice: string;
  onClick: (vl: string) => void;
  default: string;
}> = ({
  data = ["Mazda", "lamborghini"],
  choice,
  onClick,
  default: defaultR,
}) => {
  return (
    <div className="w-full">
      <div className="w-[50%] md:w-[80%]">
        <p className="p-2 mb-10 font-medium rounded-[30px] whitespace-nowrap text-base border border-black text-center">
          Danh muc tin tức
        </p>
        {data.map((r) => (
          <div key={r} className="w-full border-b border-[#303131]">
            <Link
              href={`/${defaultR}/${r}`}
              className={`w-full  text-sm md:text-base mb-3 cursor-pointer  ${
                choice === r ? "text-[#0087ff]" : ""
              }`}
              onClick={() => onClick(r)}
            >
              {r}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;