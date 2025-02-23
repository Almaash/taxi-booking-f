import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserLocation } from "@/context/UserLocationContext";
import { GrLocationPin } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";

export default function BookingConfirmation() {
  // const { sourceAddress, destinationAddress, directationData } =
  //   useUserLocation();
  const [showImage, setShowImage] = useState(false);
  const [showModal, setModal] = useState(false);
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
    setModal(false);
    setShowImage(true);

    setTimeout(() => {
      setShowImage(false);
      router.push(`/`);
    }, 2000);
  };

  return (
    <div className="p-4 max-sm:bg-[#047857] max-sm:rounded-t-xl max-sm:w-full max-sm:h-screen overflow-y-auto">
    {/* <div className="p-4 max-sm:bg-[#047857] max-sm:rounded-t-xl max-sm:rounded-xl max-sm:w-full overflow-y-auto max-sm:h-[400px] max-sm:border-t-2 "> */}
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="bg-white p-6 max-sm:p-2 rounded-lg shadow-lg">
          <div className="flex items-center max-sm:flex-col max-sm:justify-start justify-between">
            <div>
              <span className="bg-green-10 max-sm:bg-transparent text-green-700 p-2 rounded-md text-sm font-medium">
                Booking Confirmed
              </span>
            </div>
            <h1 className="text-xl font-semibold mt-2">Booking #RF789023</h1>
          </div>
        </div>

        <div className="space-y-6 bg-gray-50 max-sm:bg-white rounded sm:overflow-y-auto sm:h-[400px]">
          <div className="bg-white p-6 max-sm:p-2 m-4 max-sm:m-2 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
              <GiPathDistance className="text-2xl text-black" />
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
                <GiPathDistance className="text-xl text-emerald-700" />

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

          <div className="bg-white p-6 rounded-lg shadow-lg m-4 max-sm:m-2 max-sm:p-2 ">
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
              <div className="mt-4 bg-green-50 p-4 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            className="w-full px-6 py-2 mt-2 border-2 border-transparent text-slate-gray-800 font-semibold rounded-lg transition duration-300 ease-in-out hover:border-slate-gray-800 bg-yellow-400 hover:bg-yellow-200"
            // onClick={handleCancelClick}
            onClick={() => setModal(true)}
          >
            Cancel Ride
          </button>
        </div>
      </div>
      {showImage && (
        <div className="flex items-center justify-center flex-col fixed  top-0 left-0 right-0 bottom-0   z-10 bg-white">
          <Image
            src="/success2.gif"
            alt="Cancelling..."
            width={100}
            height={100}
            className="w-72 h-52 bg-transparent mix-blend-multiply"
          />
          <h1 className="text-xl">Your ride has been cancelled. </h1>
        </div>
      )}

      {showModal && (
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center max-sm:w-[90%]">
            <h1 className="text-xl mb-4">
              Are you sure you want to cancel this Cab?
            </h1>
            <div className="flex space-x-4">
              <button
                className="px-8 bg-emerald-600 hover:bg-emerald-800 text-white rounded-md"
                onClick={handleCancelClick}
              >
                Yes
              </button>
              <button
                className="px-8 py-2 hover:bg-gray-100  rounded-md border bg-gray-200"
                onClick={() => setModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
