"use client";
import React from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUserLocation } from "@/context/UserLocationContext";

const MapBoxMap = () => {
  const { userLocation } = useUserLocation();

  const markerLatitude = userLocation?.lat ?? 23.3710452;
  const markerLongitude = userLocation?.lan ?? 85.3478513;
  return (
    <>
      <div className="">
        <h1>Map</h1>
        <div className="rounded-lg overflow-hidden">
          <Map
            mapboxAccessToken="pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A"
            initialViewState={{
              longitude: markerLongitude,
              latitude: markerLatitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: 600, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker longitude={markerLongitude} latitude={markerLatitude} anchor="bottom">
              <img src="./marker.png" className="w-14" />
            </Marker>
          </Map>
        </div>
      </div>
    </>
  );
};

export default MapBoxMap;
