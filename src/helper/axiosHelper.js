import axios from "axios";
const ROOT_URL = import.meta.env.VITE_APP_ROOT_URL;

export const apiProcessor = async ({
  method,
  url,
  data,
  contentType = "application/json",
}) => {
  const headers = {
    "Content-type": contentType,
  };
  try {
    const response = await axios({
      method,
      url: `${ROOT_URL}${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    const message = error?.response?.data?.message ?? error.message;
    return {
      status: "error",
      message,
    };
  }
};
