import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Polyline,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";
import { getParkingLines } from "../features/ParkingLineAxios";

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const Explore = () => {
  const [center, setCenter] = useState(null);
  const [parkingCoordinates, setParkingCoordinates] = useState([]); // <-- add state

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("my location         ", latitude, longitude);
          setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          setCenter({ lat: -33.8688, lng: 151.2093 }); // fallback
        }
      );
    } else {
      setCenter({ lat: -33.8688, lng: 151.2093 });
    }

    // Fetch parking lines
    const fetchParkingLines = async () => {
      const lines = await getParkingLines(); // <-- actually call the function
      setParkingCoordinates(lines); // <-- store in state
    };

    fetchParkingLines();
  }, []);

  if (!center) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading Google Maps.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div>
      <div style={{ position: "relative" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {/* Dynamically render polyline lines */}
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

          {/* Circle Marker for Current Location */}
          <Circle
            center={center}
            radius={50}
            options={{
              fillColor: "#FF0000",
              fillOpacity: 0.4,
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Explore;
