/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { useRoutes, BrowserRouter as Router, } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "./Components/ProtectedRoute";

import Auth from "./Pages/Auth/Auth";

import UserContextProvider from "./Contexts/UserContextProvider";
import NotFoundPage from "./Pages/NotFoundPage";

const App = function () {
  const isAuthenticated = localStorage.getItem("token-acceso-api");
  console.log(isAuthenticated, "aquiii");
  const routing = useRoutes(routes(isAuthenticated));

  return (
    <>
      {routing}
    </>
  );
};

export default App;
