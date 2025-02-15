import React from "react";
import { Layer, Source } from "react-map-gl/mapbox";

const MapBoxRoute = (props: any) => {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props?.coordinates },
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
