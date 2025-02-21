"use client";
import React, { useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUserLocation } from "@/context/UserLocationContext";
import Image from "next/image";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MapBoxMapBooked = () => {
  const mapRef = useRef<any>(null);

  const { userLocation, setdirectationData, directationData } =
    useUserLocation();

  const destCoordinates: any = localStorage.getItem("destCoordinates");
  const sourceCoordinatesd: any = localStorage.getItem("sourceCoordinates");

  let srcCord = JSON.parse(sourceCoordinatesd);
  let destCord = JSON.parse(destCoordinates);

  const markerLatitude: any = userLocation?.lat;
  const markerLongitude: any = userLocation?.lan;

  // move the map to the source place
  useEffect(() => {
    if (mapRef.current && srcCord) {
      mapRef.current.flyTo({
        center: [srcCord?.lan, srcCord?.lat],
        duration: 2500,
      });
    }
  }, []);

  // move the map to the destination place
  useEffect(() => {
    if (mapRef.current && destCord) {
      mapRef.current.flyTo({
        center: [destCord?.lan, destCord?.lat],
        duration: 2500,
      });
    }

    if (srcCord && destCord) {
      getDirectionRoute();
    }
  }, []);

  const getDirectionRoute = async () => {
    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${srcCord?.lan},${srcCord?.lat};${destCord?.lan},${destCord?.lat}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A`
    );

    const result = await res.json();
    setdirectationData(result);
  };

  if (markerLatitude == undefined && markerLongitude == undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/MapGrowing.gif" alt="map loading" width={30} height={30} />
      </div>
    );
  }

  return (
    <>
      <div className="">
        <h1 className="pt-3"> </h1>
        <div className="rounded-lg overflow-hidden">
          <Map
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A"
            initialViewState={{
              longitude: srcCord?.lan ? srcCord?.lan : markerLongitude,
              latitude: srcCord?.lat ? srcCord?.lat : markerLatitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: 600, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {/* source coordinates */}
            {srcCord != 0 ? (
              <Marker
                longitude={srcCord?.lan}
                latitude={srcCord?.lat}
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
                longitude={markerLongitude}
                latitude={markerLatitude}
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

            {/* destination coordinates */}
            {destCord != 0 && (
              <Marker
                longitude={destCord?.lan}
                latitude={destCord?.lat}
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
          <div className="absolute bottom-[11px] z-20 right-[5px] hidden md:block">
            <DistanceTime />
          </div>
        )}
      </div>
    </>
  );
};

export default MapBoxMapBooked;
