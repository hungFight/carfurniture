"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import styles from "./styleComponent.module.scss";
const AddProductModel: React.FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  const [value, setValue] = useState("");
  console.log(value);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const handleUploadFIle = (e: React.ChangeEvent<HTMLInputElement>) => {};
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
        <div className="w-full my-2 flex items-center">
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
            placeholder="Giá gốc sản phẩm"
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
          />
        </div>{" "}
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productSDT">
            Số điện thoại:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productSDT"
            type="text"
            placeholder="Số điện thoại"
          />
        </div>{" "}
        <div className="w-full my-2 flex items-center">
          <label className="text-base mr-3" htmlFor="productMess">
            Link messenger:
          </label>
          <input
            required
            className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
            id="productMess"
            type="text"
            placeholder="Link messenger"
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
          />
        </div>{" "}
        <div className="w-full my-2 flex items-center  flex-wrap">
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
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className={`w-full mb-5 ${styles.dangerouslySet}`}
        ></div>
      </form>
    </>
  );
};

export default AddProductModel;
