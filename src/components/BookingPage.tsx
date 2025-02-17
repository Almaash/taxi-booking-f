"use client";
import React from "react";
import Booking from "./Booking/Booking";
import MapBoxMap from "./Map/MapBoxMap";

const BookingPage = () => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="order-2 md:order-1">
            <Booking />
          </div>
          <div className="order-1 md:order-2 col-span-2">
            <MapBoxMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
