"use client";

import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useUserLocation } from "@/context/UserLocationContext";

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

  const {
    sourceCoordinates,
    setSourceCoordinates,
    destinationCoordinates,
    setDestinationCoordinates,
  } = useUserLocation();


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
        mapbox_id: item?.mapbox_id,
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

  const getPredictions = (value: string, type: "source" | "destination") => {
    const data = type === "source" ? sourceData : destData;
    return data.filter(
      (item) =>
        item?.display_name.toLowerCase().includes(value.toLowerCase()) ||
        item?.lat?.includes(value) ||
        item?.lon?.includes(value)
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

  const onSourceAddressClick = async (item: any) => {
    setTimeout(async () => {
      setValue("source", item?.display_name);
      setIsSourceSelected(true);
      setSourceData([]);

      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${item?.mapbox_id}?session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&access_token=pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A`
      );

      const result = await res.json();
      
      setSourceCoordinates({
        lan:result?.features[0]?.geometry?.coordinates[0],
        lat:result?.features[0]?.geometry?.coordinates[1]
      })
    }, 500);
  };
  
  const onDetinationAddressClick = async (item: any) => {
    setTimeout(async () => {
      setValue("destination", item?.display_name);
      setIsDestSelected(true);
      setDestData([]);

      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${item?.mapbox_id}?session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&access_token=pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A`
      );

      const result = await res.json();
      
      setDestinationCoordinates({
        lan:result?.features[0]?.geometry?.coordinates[0],
        lat:result?.features[0]?.geometry?.coordinates[1]
      })
    }, 500);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        onClick={() => {
                          handleSelectAddress(item, "source"),
                            onSourceAddressClick(item);
                        }}
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
                  !isDestSelected && ( 
                    <ul className=" w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto mt-1">
                      {destData?.map((item: LocationData, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            {handleSelectAddress(item, "destination"),
                              onDetinationAddressClick(item)
                            }
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
