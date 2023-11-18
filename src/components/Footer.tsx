"use client";
import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Footer = () => {
  return (
    <div>
      map
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      ></GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Footer));
