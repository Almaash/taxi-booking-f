"use client";
import BookingPage from "@/components/BookingPage";
import Home from "@/components/Home";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userLocation, setUserLocation] = useState<any>();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lan: pos.coords.longitude,
      });
    });
  };
  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <BookingPage />
      </UserLocationContext.Provider>
    </div>
  );
};

export default page;
