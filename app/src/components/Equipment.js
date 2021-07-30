import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import { fetchUserInfo } from "../services/fetchUserInfo";

export const Equipment = () => {
  const [electronics, setElectronics] = useState([]);

  const getItem = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/:equipment_id")
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserInfo()
      .then((res) => {
        setElectronics(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(electronics);

  return <div>Electronics</div>;
};
