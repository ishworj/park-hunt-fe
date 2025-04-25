import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // Search icon from react-icons

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <InputGroup className="m-2">
        <FormControl
          placeholder="Search parking spots on the map..."
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroup.Text>
          <Button variant="outline-secondary">
            <FaSearch />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
