import React, { useEffect, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import PaymentMeathod from "./PaymentMeathod";
import { useUserLocation } from "@/context/UserLocationContext";

const Booking = () => {
  const { directationData, paymentAmount } = useUserLocation();
  const [isVisible, setIsVisible] = useState(false);



  useEffect(() => {
    // This will trigger when the component is mounted or paymentAmount changes
    if (paymentAmount.length > 0) {
      setIsVisible(true);
    }
  }, [paymentAmount]);
  return (
    <>  
      <div className="p-4">
        <h2 className="text-[20px] font-semibold ">Booking</h2>
        <div className="border-[1px] p-5 rounded-md h-[35rem]">
          <AutoCompleteAddress />
          {directationData?.routes && <Cars />}

          {paymentAmount.length > 0 && (
        <div
          className={`${
            isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
          } transition-all duration-500 ease-out`}
        >
          <PaymentMeathod />
          
        </div>
      )}
        </div>
      </div>
    </>
  );
};

export default Booking;
