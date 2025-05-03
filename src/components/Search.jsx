import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    console.log("Search query:", query);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating collapsed search bar (readonly) */}
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
          <span className="flex-grow-1">Search Maps...</span>
          <FaMicrophone size={20} color="#000" />
        </div>
      )}

      {/* Fullscreen overlay with search bar at top */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-light "
          style={{ zIndex: 2000 }}
        >
          <div
            className="d-flex align-items-center bg-white text-dark mt-2 py-1 px-2"
            style={{
              width: "350px",
              position: "absolute", // <-- ADD THIS
              top: "10px", // <-- Position at top like collapsed
              left: "50%", // <-- Center horizontally
              transform: "translateX(-50%)", // <-- Align center
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              zIndex: 2001,
            }}
          >
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Search Maps..."
              className="form-control border-0 shadow-none bg-white"
              style={{
                flex: 1,
                outline: "none",
                fontWeight: 500,
              }}
            />
            <FaMicrophone
              size={20}
              color="#000"
              style={{ marginLeft: "10px" }}
            />
            <IoClose
              size={22}
              color="#000"
              style={{ marginLeft: "14px" }}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="mt-5 pt-5">
            <p>Recents</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
