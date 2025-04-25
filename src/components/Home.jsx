import React, { useEffect, useState } from "react";
import ParkingList from "./ParkingList.jsx";
import { getParkingData } from "../services/ParkingService.js";
import Map from "./Map.jsx";
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar.jsx";

const Home = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getParkingData();
      setParkingSpaces(data);
    };
    fetchData();
  }, []);
  return (
    <Container>
      <SearchBar />
      <Map parkingSpaces={parkingSpaces} />
      <ParkingList parkingSpaces={parkingSpaces} />
    </Container>
  );
};

export default Home;
