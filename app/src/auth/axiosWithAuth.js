import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://use-my-techy-stuff.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
};
