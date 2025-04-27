import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const defaultCenter = {
  lat: -33.8688,
  lng: 151.2093,
};

const parkingCoordinates = [
  { lat: -33.951075, lng: 151.227634 },
  { lat: -33.951497, lng: 151.227811 },
];

function Home() {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
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
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setCenter(location);
        map.panTo(location);
        map.setZoom(15);

        setTimeout(() => {
          searchNearbyParking(location);
        }, 1000);
      }
    }
  };

  const handleSearch = () => {
    const query = inputRef.current.value;

    if (!query) {
      alert("Please enter a place to search");
      return;
    }

    if (!map) {
      alert("Map is not ready yet!");
      return;
    }

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      query: query,
      fields: ["geometry", "name"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results[0]
      ) {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };

        setCenter(location);
        map.panTo(location);
        map.setZoom(15);

        setTimeout(() => {
          searchNearbyParking(location);
        }, 1000);
      } else {
        alert("Place not found.");
      }
    });
  };

  const searchNearbyParking = (location) => {
    if (!map) return;

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: 5000,
      type: "parking",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map((place) => ({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          name: place.name,
        }));

        setMarkers(newMarkers);
      } else {
        console.error("Nearby search failed:", status);
      }
    });
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker = {
      position: { lat, lng },
      id: markers.length + 1,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setCenter({ lat, lng });
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    if (map) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const request = {
        origin: new window.google.maps.LatLng(center.lat, center.lng),
        destination: new window.google.maps.LatLng(
          marker.position.lat,
          marker.position.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          setDirections(result);
        } else {
          alert("Directions request failed due to " + status);
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey={key} libraries={["places"]}>
      <div style={{ padding: "10px", position: "relative" }}>
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search any place..."
            ref={inputRef}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `300px`,
              height: `40px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `16px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "10px",
              zIndex: 10,
            }}
          />
        </Autocomplete>

        <button
          onClick={handleSearch}
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            padding: "8px 16px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        <button
          onClick={() => handleMarkerClick(selectedMarker)}
          style={{
            position: "absolute",
            top: "110px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            padding: "8px 16px",
            backgroundColor: "#34A853",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Get Directions
        </button>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onClick={handleMapClick}
        >
          <Polyline
            path={parkingCoordinates}
            options={{
              strokeColor: "#00FF00", // Green color
              strokeOpacity: 1.0,
              strokeWeight: 5,
            }}
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <strong>{selectedMarker.name}</strong>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Home;
