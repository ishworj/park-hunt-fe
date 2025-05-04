import React, { useState, useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { getParkingLines } from "../features/ParkingLineAxios";
import Search from "./Search.jsx";
import { FaLocationArrow } from "react-icons/fa";
import { Button } from "react-bootstrap";
import MapDisplay from "./MapDisplay.jsx";

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const Explore = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [parkingCoordinates, setParkingCoordinates] = useState([]);
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const position = { lat: coords.latitude, lng: coords.longitude };
          setMyLocation(position);
          setMapCenter((prev) => prev || position);
        },
        () => {
          const fallback = { lat: -33.8688, lng: 151.2093 };
          setMyLocation(fallback);
          setMapCenter((prev) => prev || fallback);
        }
      );
    }
  }, []);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

 const handleRecenter = () => {
   if (mapRef.current && myLocation) {
     mapRef.current.panTo(myLocation); 
   }
 };

  if (loadError) return <div>Error loading Google Maps.</div>;
  if (!isLoaded || !myLocation) return <div>Loading...</div>;

  return (
    <div>
      <Search setMapCenter={setMapCenter} />
      <Button
        style={{
          position: "absolute",
          bottom: "150px",
          right: "10px",
          zIndex: 9999,
          padding: "12px",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        className="d-flex justify-content-center align-items-center shadow"
        onClick={handleRecenter}
      >
        <FaLocationArrow />
      </Button>

      <MapDisplay
        myLocation={myLocation}
        mapCenter={mapCenter}
        parkingCoordinates={parkingCoordinates}
        onMapLoad={onMapLoad}
      />
    </div>
  );
};

export default Explore;
