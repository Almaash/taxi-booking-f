import React from "react";
import { Layer, Source } from "react-map-gl/mapbox";

const MapBoxRoute = (props: any) => {
  let coordinatesArray: [string, string][] = [];

  // Check if the status is 'succeeded'
  if (props?.status === 'succeeded') {
    let data = props?.coordinates;

    coordinatesArray = data
      .split(",")
      .map((value: any, index: any, array: any) => {
        if (index % 2 === 0) {
          return [array[index], array[index + 1]];
        }
      });

    // Filter out incomplete coordinate pairs
    coordinatesArray = coordinatesArray.filter(
      (item: [string, string]): any => item?.length === 2
    );
  }

  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: props?.status === 'succeeded' ? coordinatesArray : props?.coordinates,
        },
        properties: {},
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "#047857", "line-width": 4 }}
      />
    </Source>
  );
};

export default MapBoxRoute;
