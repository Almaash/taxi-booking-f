import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserLocation } from "@/context/UserLocationContext";
import { GrLocationPin } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";


export default function BookingConfirmation() {
  const { sourceAddress, destinationAddress, directationData } =
    useUserLocation();
  const [showImage, setShowImage] = useState(false);
  const router = useRouter();

  const pickupAddress = localStorage.getItem("sourceAddress");
  const dropLocation = localStorage.getItem("destination");
  const distance = localStorage.getItem("distance");
  const time = localStorage.getItem("time");
  const paynentAmount = localStorage.getItem("paynentAmount");

  // formatted date and time ==================
  const currentDateTime = new Date();

  const options: any = {
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateTime = currentDateTime.toLocaleString("en-US", options);
  const finalDateTime = formattedDateTime.replace(",", " •");

  // ====================================

  const handleCancelClick = () => {
    setShowImage(true);

    
    setTimeout(() => {
      setShowImage(false); 
      router.push(`/?status=cancelled`); 
    }, 2000);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="bg-green-100 text-green-700 p-2 rounded-md text-sm font-medium">
                Booking Confirmed
              </span>
            </div>
            <h1 className="text-xl font-semibold mt-2">Booking #RF789023</h1>
          </div>
        </div>

        <div className="space-y-8 overflow-y-auto h-[400px] bg-gray-50 rounded">
          <div className="bg-white p-6 m-4 rounded-lg shadow-lg">
            <div className="flex justify-between">

            <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
            <GiPathDistance className="text-2xl text-black"/>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-3">
                    <div className="pt-1 ">
                      <Image
                        src="/marker.png"
                        alt="marker loading"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="">
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium text-gray-900">
                        {pickupAddress}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-b my-4"></div>
                  <div>
                    <div className="flex space-x-3">
                      <div className="pt-1 ">
                        <GrLocationPin className="text-2xl text-emerald-800" />
                      </div>
                      <div className="">
                        <p className="text-sm text-gray-500">Drop Location</p>
                        <p className="font-medium text-gray-900">
                          {dropLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <IoIosTimer className="text-xl text-emerald-700" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium text-gray-900">{finalDateTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
              <GiPathDistance className="text-xl text-emerald-700"/>

                <div>
                  <p className="text-sm text-gray-500">Estimated Duration</p>
                  <h2 className="text-white text-[15px]">
                    <span className="text-black pr-3 font-semibold">
                      Distance:{" "}
                      <span className="text-emerald-600">{distance} Km</span>
                    </span>
                    <span className="text-black pr-3 font-semibold">
                      Duration:{" "}
                      <span className="text-emerald-600">{time} Min</span>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg m-4 ">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Base Fare</span>
                <span>${paynentAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Fees</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-b my-4"></div>
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total Amount</span>
                <span>${paynentAmount}</span>
              </div>
              <div className="mt-4 bg-green-50 p-4 rounded-lg">
                {/* <div className="flex items-center gap-2 text-green-700">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M7 5l5 5l5-5" />
                  </svg>
                  <span className="text-sm font-medium">
                    Paid via Google Pay
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            className="w-full px-6 py-2 border-2 border-transparent text-slate-gray-800 font-semibold rounded-lg transition duration-300 ease-in-out hover:border-slate-gray-800 bg-yellow-400 hover:bg-yellow-200"
            onClick={handleCancelClick}
          >
            Cancel Ride
          </button>

        </div>
      </div>
      {showImage && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
          <Image
            src="/success.gif"
            alt="Cancelling..."
            width={100}
            height={100}
            className="w-64 h-52 rounded-full"
          />
        </div>
      )}
    </div>
  );
}
