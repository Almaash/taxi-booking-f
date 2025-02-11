"use client";
import React, { useState } from "react";
import paymentMeathodList from "@/app/data/paymentMeathodList";
import Image from "next/image";

const PaymentMeathod = () => {
  const [selectedCars, setSelecctedCars] = useState<any>();

  return (
    <>
      <div className="mt-1">
        <h2 className="text-gray-800 font-medium">Payment Meathod</h2>
        <div className="grid grid-cols-5 gap-4 md:grid-cols-2 lg:grid-cols-5 mt-1">
          {paymentMeathodList.map((item, index) => (
            <div
              className={`p-2 border-[1px] rounded-md hover:border-emerald-400 cursor-pointer ${
                index === selectedCars
                  ? "border-emerald-500 bg-emerald-500 border-[2px] text-white"
                  : "border-gray-300 bg-white "
              } transition-all duration-200 ease-in-out flex justify-center items-center`}
              key={index}
              onClick={() => setSelecctedCars(index)}
            >
              <Image
                width={30}
                height={50}
                src={item.image}
                alt={item.name}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PaymentMeathod;
