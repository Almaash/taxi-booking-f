"use client";
import React, { useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUserLocation } from "@/context/UserLocationContext";
import Image from "next/image";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MapBoxMap = () => {
  const mapRef = useRef<any>(null);

  const {
    userLocation,
    sourceCoordinates,
    destinationCoordinates,
    setdirectationData,
    directationData,
  } = useUserLocation();

  const markerLatitude: any = userLocation?.lat;
  const markerLongitude: any = userLocation?.lan;

  // move the map to the source place
  useEffect(() => {
    if (mapRef.current && sourceCoordinates) {
      mapRef.current.flyTo({
        center: [sourceCoordinates?.lan, sourceCoordinates?.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

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
        <h1>Map</h1>
        <div className="rounded-lg overflow-hidden">
          <Map
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A"
            initialViewState={{
              longitude: sourceCoordinates?.lan
                ? sourceCoordinates?.lan
                : markerLongitude,
              latitude: sourceCoordinates?.lat
                ? sourceCoordinates?.lat
                : markerLatitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: 600, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {/* source coordinates */}
            {sourceCoordinates != 0 && (
              <Marker
                longitude={sourceCoordinates?.lan}
                latitude={sourceCoordinates?.lat}
                anchor="bottom"
              >
                <img src="./marker.png" className="w-11" />
              </Marker>
            )}
            {/* destination coordinates */}
            {destinationCoordinates != 0 && (
              <Marker
                longitude={destinationCoordinates?.lan}
                latitude={destinationCoordinates?.lat}
                anchor="bottom"
              >
                <img src="./marker.png" className="w-11" />
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

export default MapBoxMap;
