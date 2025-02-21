"use client";
import CarList from "@/app/data/CarList";
import { useUserLocation } from "@/context/UserLocationContext";
import Image from "next/image";
import React, { useState } from "react";
import { PiSeatFill } from "react-icons/pi";

const Cars = ({setPayment}:any) => {
  const [selectedCars, setSelecctedCars] = useState<any>();
  
  const { directationData, setPaymentAmount } = useUserLocation();



  const getCost = (charges: any) => {
    return ((charges * directationData.routes[0].distance) / 1000).toFixed(2);
  };
  return (
    <>
      <div className="mt-5">
        <h2 className="text-gray-800 font-medium max-sm:text-white">Select Cars</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 overflow-y-auto max-h-[13rem] mt-1 max-sm:bg-emerald-700 bg-emerald-50 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent max-sm:w-full">
          {CarList.map((item, index) => (
            <div
              className={`m-4 p-4 border-[1px] rounded-md hover:border-emerald-400 cursor-pointer ${
                index === selectedCars
                  ? "border-emerald-500 bg-emerald-500 border-[2px] text-white"
                  : "border-gray-300 bg-white "
              } transition-all duration-200 ease-in-out`}
              key={index}
              onClick={() => {
                setSelecctedCars(index),
                setPayment(getCost(item?.charges)),
                  setPaymentAmount(getCost(item?.charges));
                  localStorage.setItem("paynentAmount", getCost(item?.charges));
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex">
                  <Image
                    width={50}
                    height={20}
                    src={item.image}
                    alt={item.name}
                    className="w-auto h-auto object-contain"
                  />
                  <div className="pl-2">
                    <h2
                      className={`font-semibold text-lg ${
                        index === selectedCars ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </h2>
                    <div
                      className={`flex text-xs ${
                        index === selectedCars ? "text-white" : "text-gray-600"
                      }`}
                    >
                      <div className="">
                        <PiSeatFill className="mt-0.5 mr-1" />
                      </div>
                      <div className="">
                        {item.seats} ({item.brand})
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-gray-700">
                  <div
                    className={` pl-2 ${
                      index === selectedCars ? "text-white" : "text-emerald-600"
                    }`}
                  >
                    {item.rating} ★
                  </div>
                </div>
                <div
                  className={` pl-2  ${
                    index === selectedCars ? "text-white" : "text-emerald-900"
                  }`}
                >
                  $ {directationData.routes ? getCost(item.charges) : 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
