"use client";
import React from "react";
import Booking from "./Booking/Booking";
import MapBoxMap from "./Map/MapBoxMap";
import { useSearchParams } from "next/navigation";
import MapBoxMapBooked from "./Map/MapBoxMapBooked";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="max-sm:px-0  ">
      <div className="max-sm:relative grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="max-sm:absolute z-50 max-sm:h-[50%] top-72 order-2 md:order-1 w-full  ">
          <Booking />
        </div>

        <div className="order-1 md:order-2 col-span-1 md:col-span-2 max-sm:h-[50%]">
          {status === "succeeded" ? <MapBoxMapBooked /> : <MapBoxMap />}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
