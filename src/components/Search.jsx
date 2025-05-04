import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Search = ({ setMapCenter }) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry) {
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setSelectedPlace(address);
      setIsOpen(false);
      setQuery("");

      if (setMapCenter) {
        setMapCenter({ lat, lng });
      }

      console.log("Selected Place:", address);
      console.log("Coordinates:", lat, lng);
    }
  };

  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setQuery(transcript);
      inputRef.current.value = transcript;
    };

    recognition.onend = () => {
      setListening(false);
      // Trigger Google Maps place search
      setTimeout(() => {
        handlePlaceChanged();
      }, 300); // slight delay to let Autocomplete pick up the final input
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error", e);
      setListening(false);
    };

    recognition.start();
  };

  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="position-absolute d-flex align-items-center bg-light text-dark"
          style={{
            width: "350px",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "10px 16px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          }}
        >
          <span className="flex-grow-1">
            {selectedPlace || "Search Maps..."}
          </span>
          <FaMicrophone size={20} color="#000" />
        </div>
      )}

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-light"
          style={{
            zIndex: 2000,
            overflow: "visible",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-between bg-white text-dark mt-2 py-1 px-2"
            style={{
              width: "350px",
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              zIndex: 2001,
            }}
          >
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Search Maps..."
                className="form-control border-0 shadow-none bg-white"
                style={{
                  flex: 1,
                  outline: "none",
                  fontWeight: 500,
                }}
              />
            </Autocomplete>
            <div>
              {listening ? (
                <FaMicrophone
                  size={20}
                  color="blue"
                  className="mic-animate"
                  style={{ marginLeft: "10px" }}
                />
              ) : (
                <FaMicrophone
                  size={20}
                  color="#000"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={startListening}
                />
              )}
              <IoClose
                size={22}
                color="#000"
                style={{ marginLeft: "14px", cursor: "pointer" }}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          <div className="mt-5 pt-5 text-center">
            <p>Recents</p>
          </div>
        </div>
      )}

    </>
  );
};

export default Search;
