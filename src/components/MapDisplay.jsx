import React from "react";
import { GoogleMap, Polyline, Circle, Polygon } from "@react-google-maps/api";
import {
  generateDirectionCone,
  useDeviceHeading,
} from "../helper/mapHelpers.js";

const mapContainerStyle = {
  width: "100%",
  height: "93vh",
};

const MapDisplay = ({ myLocation, parkingCoordinates, onMapLoad }) => {
  const heading = useDeviceHeading();

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={myLocation}
        zoom={15}
        onLoad={onMapLoad}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          rotateControl: true,
        }}
      >
        {parkingCoordinates.map((coords, index) => (
          <Polyline
            key={index}
            path={coords}
            options={{
              strokeColor: "#00FF00",
              strokeOpacity: 1.0,
              strokeWeight: 5,
            }}
          />
        ))}

        <Circle
          center={myLocation}
          radius={50}
          options={{
            fillColor: "#2196F3",
            fillOpacity: 0.4,
            strokeColor: "#2196F3",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />

        {heading !== null && heading !== 0 && (
          <Polygon
            path={generateDirectionCone(myLocation, heading)}
            options={{
              fillColor: "#0000FF",
              fillOpacity: 0.3,
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapDisplay;
