import { apiProcessor } from "../helper/axiosHelper";
export const googleAuth = (code) => {
  const apiObj = {
    method: "get",
    url: `/auth/google?code=${code}`,
  };
  return apiProcessor(apiObj);
};
