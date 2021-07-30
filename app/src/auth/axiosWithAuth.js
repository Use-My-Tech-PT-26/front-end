import axios from "axios";

export const axiosWithAuth = () => {

    return axios.create({
      baseURL: "",
      headers: {
        Authorization: localStorage.getItem("token")
      }
  });
};