import React from "react";

const Routing: React.FC<{ routs: (string | undefined)[] }> = ({ routs }) => {
  return (
    <div className="flex w-fit ">
      <a href="/" className="whitespace-nowrap">
        Trang chủ
      </a>
      {routs?.map((r) => (
        <div key={r} className="w-fit flex  items-center justify-center">
          <p className="mx-5">/</p>
          <p className="whitespace-nowrap text-sm md:text-base cursor-pointer">
            {r}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Routing;
