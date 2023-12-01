"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import styles from "./styleComponent.module.scss";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
const AddProductModel: React.FC<{
  title: string;
  onClick: () => void;
  cateId: number;
  cateName: string;
}> = ({ title, onClick, cateId, cateName }) => {
  const [value, setValue] = useState<string>("");
  const [pre, setPre] = useState<boolean>(false);

  const [product, setProduct] = useState<{
    Name: string;
    Price: string;
    Discount: string;
    Description: string;
    UrlShoppe: string;
    categoryId: number;
    categoryName: string;
    FormCollection: any;
  }>({
    Name: "",
    Price: "",
    Discount: "",
    Description: "",
    UrlShoppe: "",
    categoryId: cateId,
    categoryName: cateName,
    FormCollection: null,
  });
  const [image, setImage] = useState<string>("");
  console.log(product);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const handleUploadFIle = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setProduct({ ...product, FormCollection: file });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(product.FormCollection, "product");

    const formData = new FormData();
    product.Description = value;
    formData.append("Name", product.Name);
    formData.append("Price", product.Price);
    formData.append("Discount", product.Discount);
    formData.append("Description", product.Description);
    formData.append("UrlShoppe", product.UrlShoppe);
    formData.append("categoryId", String(product.categoryId));
    formData.append("categoryName", cateName);
    formData.append("file", product.FormCollection);
    const res = await http.post("Product/Create", formData);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", , "video"],
      ["clean"],
      [{ size: ["small", false, "large", "huge"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];
  return (
    <>
      <div
        className="w-full h-full top-0 left-0 z-9 fixed bg-[#1f1f1fde] z-50"
        onClick={onClick}
      ></div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full h-full p-5 overflow-auto z-50 sm:w-[640px] flex justify-center flex-wrap  fixed top-1/2 right-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"
      >
        <h3 className="w-full p-3 text-center relative">
          {title}
          <div
            className="absolute top-3 left-2 text-[30px] cursor-pointer"
            onClick={onClick}
          >
            <IoCloseCircleOutline />
          </div>
        </h3>
        <div className="w-full my-2 flex items-center flex-wrap">
          <label className="text-base mr-3" htmlFor="productFile">
            Tải ảnh sản phẩm lên:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productFile"
            type="file"
            name="file"
            onChange={(e) => handleUploadFIle(e)}
          />
          {image && (
            <div className="w-[200px] h-[200px]">
              <img src={image} className="w-full h-full" />
            </div>
          )}
        </div>
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productName">
            Tên sản phẩm:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productName"
            type="text"
            onChange={(e) => setProduct({ ...product, Name: e.target.value })}
            placeholder="Tên sản phẩm"
          />
        </div>{" "}
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productPrice">
            Giá sản phẩm:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productPrice"
            type="text"
            onChange={(e) => setProduct({ ...product, Price: e.target.value })}
            placeholder="Giá sản phẩm"
          />
        </div>{" "}
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productDiscount">
            Giá gốc sản phẩm:
          </label>
          <input
            id="productDiscount"
            required
            type="text"
            onChange={(e) =>
              setProduct({ ...product, Discount: e.target.value })
            }
            placeholder="Giá gốc sản phẩm"
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
          />
        </div>{" "}
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productShop">
            Link shop:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productShop"
            type="text"
            placeholder="Link shop"
            onChange={(e) =>
              setProduct({ ...product, UrlShoppe: e.target.value })
            }
          />
        </div>{" "}
        <div className={`w-full my-2 flex items-center  flex-wrap `}>
          <h3 className="text-base mr-3 w-full">Mô tả:</h3>
          <ReactQuill
            className="w-full"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>{" "}
        {/* <div

        ></div> */}
        <div className="flex justify-around items-center w-full">
          <div
            className="text-sm px-3 py-1 hover:text-[#0074da] cursor-pointer"
            onClick={() => setPre(true)}
          >
            Preview
          </div>
          <button
            className="text-sm px-3 py-1 hover:text-[#0074da] cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {pre && (
        <div
          className="w-full h-full fixed top-0 left-0 bg-white z-[999] overflow-auto"
          onClick={() => setPre(false)}
        >
          <div className="w-full min-[1200px]:w-[1200px] relative mt-15 border-t p-5">
            <div>
              <div className="min-[1000px]:flex">
                <div className="w-full h-[300px] min-[600px]:w-[500px]  ">
                  <img
                    src={image}
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
                      {product.Price}đ
                    </p>
                    {product.Discount && (
                      <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                        {product.Discount}đ
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
                  dangerouslySetInnerHTML={{ __html: value }}
                  className={`text-xs md:text-[13px] w-full mb-5 ${styles.dangerouslySet}`}
                ></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModel;
