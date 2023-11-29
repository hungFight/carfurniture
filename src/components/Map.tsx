"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { PiMessengerLogoLight } from "react-icons/pi";
import http from "@/utils/http";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const Map = () => {
  const [data, setData] = useState<{
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    url_Mess: string;
  }>();
  const fet = async () => {
    const res = await http.get<(typeof data)[]>("AboutUs/GetAll");
    console.log(res, "data");
    setData(res.data[0]);
  };
  useEffect(() => {
    fet();
  }, []);

  return (
    <div className="flex  text-white md:relative right-[76px] justify-center w-fit">
      <div className="w-[200px] h-[100px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[200px] bg-white mr-3 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0443016137747!2d105.81429!3d20.9908612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac93b436c251%3A0x4090fcaf119992b1!2zMzQ5IFAuIFbFqSBUw7RuZyBQaGFuLCBLaMawxqFuZyDEkMOsbmgsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1700400017540!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <div className="">
        <h3 className="font-bold text-base mb-2">Liên hệ</h3>
        <h3 className="font-semibold mb-1 text-[14px] opacity-[0.7]">
          {data?.name}
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <MdLocationOn />
          </div>
          Địa chỉ: <p className="font-light ml-1 mx-2">{data?.address}</p>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <FaPhone />
          </div>
          SDT:{" "}
          <a href="tel:0974034981" className="font-light mx-2">
            {data?.phone}
          </a>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <AiOutlineMail />
          </div>
          Email:{" "}
          <a
            href="mailto:nguyentronghung05072003@gmail.com"
            className="font-light mx-2"
          >
            {data?.email}
          </a>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <PiMessengerLogoLight />
          </div>
          Messenger:{" "}
          <a href="#" className="font-light mx-2">
            {data?.url_Mess}
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Map;
