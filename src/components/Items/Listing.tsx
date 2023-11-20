import React from "react";

const Listing: React.FC<{ data: string[] }> = ({
  data = ["Mazda", "lamborghini"],
}) => {
  return (
    <div className="w-full">
      <div className="w-[50%]">
        <p className="p-2 mb-10 font-medium rounded-[30px] whitespace-nowrap text-base border border-black text-center">
          Danh muc tin tức
        </p>
        {data.map((r) => (
          <p
            key={r}
            className="border-b text-sm mb-3 cursor-pointer border-[#303131]"
          >
            {r}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Listing;
