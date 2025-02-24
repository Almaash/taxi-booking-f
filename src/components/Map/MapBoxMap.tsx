"use client";
import React, { useEffect, useRef, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUserLocation } from "@/context/UserLocationContext";
import Image from "next/image";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";
import { useSearchParams } from "next/navigation";

const MapBoxMap = () => {
  const mapRef = useRef<any>(null);

  const {
    userLocation,
    sourceCoordinates,
    destinationCoordinates,
    setdirectationData,
    directationData,
  } = useUserLocation();

  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  const destCoordinates: any = localStorage.getItem("destCoordinates");
  const sourceCoordinatesd: any = localStorage.getItem("sourceCoordinates");

  let srcCord = JSON.parse(sourceCoordinatesd);
  let destCord = JSON.parse(destCoordinates);

  const markerLatitude: any = userLocation?.lat;
  const markerLongitude: any = userLocation?.lan;

  // ----------------------------------

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const height = windowWidth < 640 ? 300 : 600;
  useEffect(() => {
    if (mapRef.current && sourceCoordinates) {
      mapRef.current.flyTo({
        center: [sourceCoordinates?.lan, sourceCoordinates?.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  // ----------------------------------

  // move the map to the destination place
  useEffect(() => {
    if (mapRef.current && destinationCoordinates) {
      mapRef.current.flyTo({
        center: [destinationCoordinates?.lan, destinationCoordinates?.lat],
        duration: 2500,
      });
    }

    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates?.lan},${sourceCoordinates?.lat};${destinationCoordinates?.lan},${destinationCoordinates?.lat}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A`
    );

    const result = await res.json();
    setdirectationData(result);
  };

  // console.log(markerLatitude,"23.3554049")
  // console.log(markerLongitude,"85.3606529")

  // if (markerLatitude == undefined && markerLongitude == undefined) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Image src="/MapGrowing.gif" alt="map loading" width={30} height={30} />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="">
        <div className="rounded-lg overflow-hidden mt-2 max-sm:mt-0">
          <Map
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A"
            initialViewState={{
              longitude:
                sourceCoordinates?.lon !== undefined
                  ? sourceCoordinates?.lon
                  : markerLongitude !== undefined
                  ? markerLongitude
                  : 85.3606529,
              latitude:
                sourceCoordinates?.lat !== undefined
                  ? sourceCoordinates?.lat
                  : markerLatitude !== undefined
                  ? markerLatitude
                  : 23.3554049,
              zoom: 14,
            }}
            style={{ width: "100%", height: height, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {sourceCoordinates != 0 ? (
              <Marker
                longitude={sourceCoordinates?.lan}
                latitude={sourceCoordinates?.lat}
                anchor="bottom"
              >
                <Image
                  src="/marker.png"
                  alt="marker loading"
                  width={40}
                  height={40}
                />
              </Marker>
            ) : (
              <Marker
                longitude={markerLongitude || 85.3096}
                latitude={markerLatitude || 23.3441}
                anchor="bottom"
              >
                <Image
                  src="/marker.png"
                  alt="marker loading"
                  width={40}
                  height={40}
                />
              </Marker>
            )}

            {destinationCoordinates != 0 && (
              <Marker
                longitude={destinationCoordinates?.lan}
                latitude={destinationCoordinates?.lat}
                anchor="bottom"
              >
                <Image
                  src="/image.png"
                  alt="marker loading"
                  width={40}
                  height={40}
                />
              </Marker>
            )}

            {directationData?.routes ? (
              <MapBoxRoute
                coordinates={directationData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        </div>
        {directationData?.routes && (
          <>
            {/* <div className="absolute bottom-[25px] z-20 right-[33px] hidden md:block ">
            <DistanceTime />
          </div>
           <div className="absolute z-20 right-[10px] top-[25px] max-sm:top-[15px] md:top-auto md:right-[33px] md:bottom-[5px] md:hidden">
           <DistanceTime />
         </div> */}
            <div className="fixed bottom-[25px] z-20 right-[33px] hidden md:block">
              <DistanceTime />
            </div>

            <div className="fixed z-10  top-[15px] max-sm:top-[75px] max-sm:right-[10px] max-sm:bottom-[10px] md:top-auto md:right-[33px] md:bottom-[5px] md:hidden inline-block">
              <DistanceTime />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MapBoxMap;
