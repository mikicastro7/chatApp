/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UsersContext from "./UsersContext";
import useFetch from "../hooks/useFetch";

const UsersContextProvider = function (props) {
  const navigate = useNavigate();
  const { data: usersByType, requestData: requestUsers } = useFetch();
  const { children } = props;
  const [token, setToken] = useState(localStorage.getItem("api-token"));
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  useEffect(() => {
    requestUsers("http://localhost:5000/users", {
      headers: myHeaders
    });
  }, [requestUsers]);

  return (
    <UsersContext.Provider value={{
      usersByType
    }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
