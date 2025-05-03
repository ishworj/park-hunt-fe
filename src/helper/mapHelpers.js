// utils/mapHelpers.js
import { useEffect, useState } from "react";

// Generate a directional cone polygon based on location and heading
export const generateDirectionCone = (location, heading, length = 100) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const lat = location.lat;
  const lng = location.lng;
  const earthRadius = 6378137;

  const offset = (angleOffset) => {
    const rad = toRad(heading + angleOffset);
    const dx = length * Math.sin(rad);
    const dy = length * Math.cos(rad);

    const newLat = lat + (dy / earthRadius) * (180 / Math.PI);
    const newLng =
      lng + (dx / (earthRadius * Math.cos(toRad(lat)))) * (180 / Math.PI);

    return { lat: newLat, lng: newLng };
  };

  return [location, offset(-15), offset(15), location];
};

// Custom hook to get real-time heading ie direction
export const useDeviceHeading = () => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.absolute || event.alpha != null) {
        setHeading(event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true
      );
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation
      );
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return heading;
};
