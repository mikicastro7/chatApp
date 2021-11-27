/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import useFetch from "../hooks/useFetch";

const UserContextProvider = function (props) {
  const navigate = useNavigate();
  const { data, requestData } = useFetch();
  const { children } = props;
  const [userInfo, setUserInfo] = useState("cargando");
  const [loginError, setErrorLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token-acceso-api"));

  const loginUser = (e, formData) => {
    e.preventDefault();
    requestData("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  };

  const registerUser = (e, formData) => {
    e.preventDefault();
    requestData("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  };

  useEffect(() => {
    if (data) {
      if (data.error) {
        setErrorLogin(data);
        console.log("entra");
      } else if (data.token) {
        setToken(data.token);
        setUserInfo(token ? jwt_decode(token) : false);
        localStorage.setItem("token-acceso-api", data.token);
        navigate("/chat");
      }
    }
  }, [data, history, token]);
  useEffect(() => {
    setUserInfo(token ? jwt_decode(token) : false);
    console.log(userInfo);
  }, [token]);
  return (
    <UserContext.Provider value={{
      userInfo, loginUser, registerUser, loginError
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
