import React, { useEffect, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import PaymentMeathod from "./PaymentMeathod";
import { useUserLocation } from "@/context/UserLocationContext";
import { useSearchParams } from "next/navigation";
import BookingConfirmation from "./BookingConfirmation";

const Booking = () => {
  const { directationData, paymentAmount } = useUserLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [payment, setPayment] = useState<any>();

  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  useEffect(() => {
    if (paymentAmount.length > 0) {
      setIsVisible(true);
    }
  }, [paymentAmount]);
  return (
    <>
      {status === "succeeded" ? (
        <BookingConfirmation />
      ) : (
        <div className="p-6 max-sm:p-2 max-sm:bg-[#047857] max-sm:rounded-t-xl max-sm:w-full max-sm:h-screen bg-[#ECFDF5]">
          <h2 className="text-[20px] font-semibold max-sm:text-white max-sm:p-2">
            Booking
          </h2>
          <div className="border-[1px] max-sm:border-[0px] p-5 rounded-t-md h-[35rem] max-sm:h-[14rem] overflow-y-auto max-sm:bg-[#047857] bg-white">
            <AutoCompleteAddress />
            {directationData?.routes && <Cars setPayment={setPayment} />}

            {paymentAmount.length > 0 && (
              <div
                className={`${
                  isVisible
                    ? "transform translate-y-0 opacity-100"
                    : "transform translate-y-10 opacity-0"
                } transition-all duration-500 ease-out`}
              >
                <PaymentMeathod payment={payment} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
