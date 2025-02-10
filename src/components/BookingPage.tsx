import React from "react";
import Booking from "./Booking/Booking";

const BookingPage = () => {
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div className=""><Booking/></div>
            <div className="col-span-2 bg-red-100">Map</div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
