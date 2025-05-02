import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query:", query);
  };

  return (
    <>
      <button
        className="form-control text-start text-muted"
        style={{ cursor: "pointer", backgroundColor: "#fff" }}
        onClick={() => setIsOpen(true)}
      >
        Search a place…
      </button>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex flex-column justify-content-center align-items-center"
          style={{ zIndex: 9999 }}
        >
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
            onClick={() => setIsOpen(false)}
          />
          <div className="text-center">
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Search a place…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: "80vw", maxWidth: "500px" }}
            />
            <button className="btn btn-success btn-lg" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
