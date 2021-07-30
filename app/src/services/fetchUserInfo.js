import { axiosWithAuth } from "../auth/axiosWithAuth";

export const fetchUserInfo = () => {
  return axiosWithAuth()
    .get("/equipment")
    .then((res) => res)
    .catch((err) => err);
};
