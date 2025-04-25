import React, { useEffect } from "react";

const Map = ({ parkingSpaces }) => {
  useEffect(() => {
    // Initialize Google Maps
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.9334, lng: 151.2191 }, // Center on Hillsdale, Sydney
      zoom: 15,
    });

    // Add custom parking spots
    parkingSpaces.forEach((spot) => {
      const color = spot.isFree ? "green" : "red"; // Green for free, Red for paid
      new window.google.maps.Marker({
        position: {
          lat: spot.location.coordinates[1],
          lng: spot.location.coordinates[0],
        },
        map: map,
        title: spot.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: color,
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "white",
        },
      });
    });
  }, [parkingSpaces]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default Map;
