import { apiProcessor } from "../helper/axiosHelper";

export const addnewLineApi = (obj) => {
  const apiObj = {
    method: "post",
    url: "/line",
    data: obj,
  };
  return apiProcessor(apiObj);
};


export const getParkingLines = async () => {
  const apiObj = {
    method: "get",
    url: "/line",
  };

  const { status, Parkinglines } = await apiProcessor(apiObj);

  if (status === "success" && Array.isArray(Parkinglines)) {
    const parkingCoordinates = Parkinglines.map((item) =>
      item.line.map(({ lat, lng }) => ({ lat, lng }))
    );
    return parkingCoordinates;
  } else {
    return [];
  }
};
