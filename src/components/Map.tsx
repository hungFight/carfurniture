"use client";
import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";import { PiMessengerLogoLight } from "react-icons/pi";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const Map = () => {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyCvGAdqp8kJxiDmk_kUs9K7kOjDB6rNKAc",
  // });

  // const [map, setMap] = useState<any>(null);

  // const onLoad = useCallback((map: any) => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;
  //     const center = { lat: latitude, lng: longitude };

  //     map.panTo(center);
  //     setMap(map);
  //   });
  // }, []);

  // const onUnmount = useCallback(() => {
  //   setMap(null);
  // }, []);

  // return isLoaded ? (
  //   <GoogleMap
  //     mapContainerStyle={containerStyle}
  //     center={{ lat: 0, lng: 0 }}
  //     zoom={3}
  //     onLoad={onLoad}
  //     onUnmount={onUnmount}
  //   >
  //     {map && (
  //       <Marker position={{ lat: map.center.lat(), lng: map.center.lng() }} />
  //     )}
  //   </GoogleMap>
  // ) : (
  //   <></>
  // );
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
          mazdashop.vn
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <MdLocationOn />
          </div>
          Địa chỉ:{" "}
          <p className="font-light ml-1 mx-2">
            Xom trai, tot dong, chuong my, ha noi
          </p>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <FaPhone />
          </div>
          SDT:{" "}
          <a href="tel:0974034981" className="font-light mx-2">
            0974034981
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
            nguyentronghung05072003@gmail.com
          </a>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[12px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <PiMessengerLogoLight />
          </div>
          Messenger:{" "}
          <a
            href="#"
            className="font-light mx-2"
          >
            url
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Map;
