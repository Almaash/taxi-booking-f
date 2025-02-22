import { useUserLocation } from "@/context/UserLocationContext";
import React from "react";

const DistanceTime = () => {
  const { directationData } = useUserLocation();

  localStorage.setItem("distance", (directationData?.routes[0]?.distance / 1000).toFixed(2));
  localStorage.setItem("time", (directationData?.routes[0]?.duration / 60).toFixed(2));

  return (
    <div className="bg-emerald-500 p-2 rounded-lg">
      <h2 className="text-white text-[15px] max-sm:text-[12px]">
        Distance:{" "}
        <span className='text-black pr-3 font-semibold'>{(directationData?.routes[0]?.distance / 1000).toFixed(2)} Km</span>
        Duration:{" "}
        <span className='text-black pr-3 font-semibold'>{(directationData?.routes[0]?.duration / 60).toFixed(2)} min</span>
      </h2>
    </div>
  );
};

export default DistanceTime;
