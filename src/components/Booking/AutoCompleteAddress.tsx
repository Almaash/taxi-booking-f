"use client";

import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

interface LocationData {
  display_name: string;
  lat: string;
  lon: string;
}

const AutoCompleteAddress = () => {
  const { control, setValue, handleSubmit, watch } = useForm();
  const [sourceData, setSourceData] = useState<LocationData[]>([]);
  const [destData, setDestData] = useState<LocationData[]>([]);
  const [isSourceSelected, setIsSourceSelected] = useState(false);
  const [isDestSelected, setIsDestSelected] = useState(false);
  const timeoutRef = useRef<any>(null);

  const sourceAddress = watch("source");
  const destination = watch("destination");

  // Fetching data based on the search query
  // const fetchData = async (query: string, type: "source" | "destination") => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  //     );

  //     const extractedData = response?.data?.map((item: any) => ({
  //       display_name: item.display_name,
  //       lat: item.lat,
  //       lon: item.lon,
  //     }));

  //     if (type === "source") {
  //       setSourceData(extractedData);
  //     } else {
  //       setDestData(extractedData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleSearch = async (
    query: string,
    type: "source" | "destination"
  ) => {
    try {
      const response = await fetch(`/api/search-address?q=${query}`);
      const data = await response.json();

      const extractedData = data?.suggestions?.map((item: any) => ({
        display_name: `${item?.name}, ${item?.place_formatted}`,
        lat: item?.lat,
        lon: item?.lon,
      }));

      if (type === "source") {
        setSourceData(extractedData);
      } else {
        setDestData(extractedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sourceAddress) {
        handleSearch(sourceAddress, "source");
      }
      if (destination) {
        handleSearch(destination, "destination");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [sourceAddress, destination]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (sourceAddress) {
  //       fetchData(sourceAddress, "source");
  //     }
  //     if (destination) {
  //       fetchData(destination, "destination");
  //     }
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [sourceAddress, destination]);

  const getPredictions = (value: string, type: "source" | "destination") => {
    const data = type === "source" ? sourceData : destData;
    return data.filter(
      (item) =>
        item?.display_name.toLowerCase().includes(value.toLowerCase()) ||
        item?.lat.includes(value) ||
        item?.lon.includes(value)
    );
  };

  const onChange = (value: string, type: "source" | "destination") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length > 0) {
      timeoutRef.current = setTimeout(() => {
        const predictions = getPredictions(value, type);
        if (type === "source") {
          setSourceData(predictions);
        } else {
          setDestData(predictions);
        }
      }, 500);
    } else {
      if (type === "source") {
        setSourceData([]);
      } else {
        setDestData([]);
      }
    }
  };

  const handleSelectAddress = (
    item: LocationData,
    type: "source" | "destination"
  ) => {
    if (type === "source") {
      setValue("source", item.display_name);
      setIsSourceSelected(true);
      setSourceData([]);
    } else {
      setValue("destination", item.display_name);
      setIsDestSelected(true);
      setDestData([]);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Source Address */}
        <div>
          <label htmlFor="source" className="text-gray-500">
            Where From?
          </label>
          <Controller
            name="source"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="">
                <input
                  {...field}
                  type="text"
                  onChange={(e) => {
                    field.onChange(e);
                    onChange(e.target.value, "source");
                  }}
                  className="bg-white  border-[1px] w-full rounded-md outline-none focus:border-emerald-600 p-2"
                  placeholder="search for source..."
                />

                {sourceData?.length > 0 && !isSourceSelected && (
                  <ul className=" w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto mt-1">
                    {sourceData?.map((item: LocationData, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectAddress(item, "source")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {item.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          />
        </div>

        {/* Destination Address */}
        <div className="mt-5">
          <label htmlFor="destination" className="text-gray-500">
            Where To?
          </label>
          <Controller
            name="destination"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="">
                <input
                  {...field}
                  type="text"
                  onChange={(e) => {
                    field.onChange(e);
                    onChange(e.target.value, "destination");
                  }}
                  className="bg-white  border-[1px] w-full rounded-md outline-none focus:border-emerald-600 p-2"
                  placeholder="search for destination..."
                />

                {destData?.length > 0 &&
                  !isDestSelected && ( // Show suggestions if not selected
                    <ul className=" w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto mt-1">
                      {destData?.map((item: LocationData, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleSelectAddress(item, "destination")
                          }
                          className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                          {item.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            )}
          />
        </div>
      </form>

      {/* <div className="mt-10">
        <p>Selected Source: {sourceAddress}</p> <br /><br />
        <p>Selected Destination: {destination}</p>
      </div> */}
    </div>
  );
};

export default AutoCompleteAddress;
