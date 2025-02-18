"use client";
import BookingPage from "@/components/BookingPage";
import Home from "@/components/Home";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useClerk } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useClerk();

  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directationData, setdirectationData] = useState<any>([]);
  const [paymentAmount, setPaymentAmount] = useState<any>([]);
  const [sourceAddress, setSourceAddress] = useState<any>('');
  const [destinationAddress, setDestinationAddress] = useState<any>('');
  const [carDetails, setCarDetails] = useState<any>('');
  const [timeDuratation, setTimeDuratation] = useState<any>('');

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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true only after the component mounts
  }, []);

  if (!isClient) return null;

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
          setdirectationData,
          paymentAmount,
          setPaymentAmount,
          sourceAddress,
          setSourceAddress,
          destinationAddress,
          setDestinationAddress,
          carDetails,
          setCarDetails,
          timeDuratation,
          setTimeDuratation,
        }}
      >
        {user ? <BookingPage /> : <Home />}
      </UserLocationContext.Provider>
    </div>
  );
};

export default page;
