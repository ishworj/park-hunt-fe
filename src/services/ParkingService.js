import axios from "axios";

export const getParkingData = async () => {
  try {
    // Here you can make a real API call, e.g., to your backend.
    // const response = await axios.get('/api/parking-spots');

    // Mock Data with a 10km LineString type location
    const parkingData = [
      {
        name: "Parking Space 1",
        location: {
          type: "LineString", // LineString to create a line
          coordinates: [
            [151.2191, -33.9334], // Starting point
            [151.2291, -33.9334], // 10 km line towards east (approximately)
          ],
        },
        isFree: true,
        additionalInfo: "Street Parking",
        source: "Custom",
      },
    ];

    return parkingData;
  } catch (error) {
    console.error("Error fetching parking data:", error);
    return [];
  }
};
