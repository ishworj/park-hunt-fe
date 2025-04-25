import React from "react";

const ParkingList = ({ parkingSpaces }) => {
  return (
    <div className="parking-list">
      <h2>Available Parking Spaces</h2>
      <ul>
        {parkingSpaces.map((spot, index) => (
          <li key={index}>
            <span>{spot.name} - </span>
            <span style={{ color: spot.isFree ? "green" : "red" }}>
              {spot.isFree ? "Free" : "Paid"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingList;
