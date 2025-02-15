import React from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import PaymentMeathod from "./PaymentMeathod";
import { useUserLocation } from "@/context/UserLocationContext";

const Booking = () => {
  const { directationData } = useUserLocation();
  return (
    <>
      <div className="p-4">
        <h2 className="text-[20px] font-semibold ">Booking</h2>
        <div className="border-[1px] p-5 rounded-md  h-[35rem]">
          <AutoCompleteAddress />
          {directationData?.routes && <Cars />}
          
          <PaymentMeathod />
          <button className="bg-emerald-600 text-white w-full rounded p-1 mt-2 hover:bg-emerald-800">
            Book
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
