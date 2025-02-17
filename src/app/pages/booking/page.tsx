"use client";
import BookingPage from "@/components/BookingPage";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userLocation, setUserLocation] = useState<any>();
    const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
    const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
    const [directationData, setdirectationData] = useState<any>([]);
    const [paymentAmount, setPaymentAmount] = useState<any>([]);
     
    const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true); // Set to true only after the component mounts
}, []);

if (!isClient) return null;
    
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
    <UserLocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        sourceCoordinates,
        setSourceCoordinates,
        destinationCoordinates,
        setDestinationCoordinates,
        directationData,
        setdirectationData,
        paymentAmount,
        setPaymentAmount,
      }}
    >
      <BookingPage />
    </UserLocationContext.Provider>
  );
};

export default page;
