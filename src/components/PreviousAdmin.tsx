import React from "react";
import styles from "./styleComponent.module.scss";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { SiShopee } from "react-icons/si";

const PreviousAdmin: React.FC<{
  setPre: React.Dispatch<React.SetStateAction<boolean>>;
  product: {
    Id: number;
    Name: string;
    Price: string;
    Discount: string;
    Description: string;
    UrlShoppe: string;
    categoryId: number;
    categoryName: string;
    path: string;
    FormCollection: any;
  };
}> = ({ setPre, product }) => {
  console.log(product);

  return (
    <div
      className="w-full h-full fixed top-0 left-0  z-[999] flex justify-center bg-[#000000c9]"
      onClick={() => setPre(false)}
    >
      <div className="w-[80%] min-[1200px]:w-[1200px] bg-white overflow-auto  relative mt-15 border-t p-5">
        <div>
          <div className="min-[1000px]:flex">
            <div className="w-full h-[300px] min-[600px]:w-[500px]  ">
              <img
                src={product?.FormCollection}
                alt={product.Name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1 min-[1000px]:ml-3 ">
              <h3
                className={`font-bold text-sm md:text-base ${styles.nameTag}`}
              >
                {product.Name}
              </h3>
              <div className="w-full mt-1 md:mt-2 flex  items-center border-b border-solid">
                <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                  {product.Price.toLocaleString().replace(/,/g, ".")}đ
                </p>
                {product.Discount && (
                  <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                    {product.Discount.toLocaleString().replace(/,/g, ".")}đ
                  </p>
                )}
              </div>
              <div className="mt-3 flex ">
                <a
                  href={"#"}
                  target="_blank"
                  className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center"
                >
                  <div className="flex text-[20px] text-[#4993de] mr-2">
                    <PiMessengerLogoLight />
                  </div>{" "}
                  Messenger
                </a>
                <a
                  href={`#`}
                  className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center"
                >
                  <div className="flex text-[20px] text-[#57eb57] mr-2">
                    <CiPhone />
                  </div>{" "}
                  00000000000
                </a>
                <a
                  href={"#"}
                  target="_blank"
                  className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] flex items-center bg-slate-700"
                >
                  <div className="flex text-[#ff6f6f] text-[20px] mr-2">
                    {" "}
                    <SiShopee />
                  </div>{" "}
                  Shoppe
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Mô tả</h3>
            <div
              dangerouslySetInnerHTML={{ __html: product.Description }}
              className={`text-xs md:text-[13px] w-full mb-5 ${styles.dangerouslySet}`}
            ></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PreviousAdmin;
