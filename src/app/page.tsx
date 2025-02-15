"use client";
import BookingPage from "@/components/BookingPage";
import Home from "@/components/Home";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directationData, setdirectationData] = useState<any>([]);

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
      <UserLocationContext.Provider
        value={{
          userLocation,
          setUserLocation,
          sourceCoordinates,
          setSourceCoordinates,
          destinationCoordinates,
          setDestinationCoordinates,
          directationData,
          setdirectationData
        }}
      >
        <BookingPage />
      </UserLocationContext.Provider>
    </div>
  );
};

export default page;
