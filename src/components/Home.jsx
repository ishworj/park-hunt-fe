import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
 console.log(key)
const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: -33.8688, 
  lng: 151.2093, 
};

function Home() {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        map.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        map.setZoom(15); // zoom in when a place is selected
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAgtopqUJR-xea7GzJuHMdoTeD5hqGsKcU"
      libraries={["places"]}
    >
      <div style={{ padding: "10px" }}>
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search parking eg,"
            ref={inputRef}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `200px`,
              height: `40px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `16px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              
              marginLeft: "-150px",
              top: "10px",
            }}
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={7}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Home;
