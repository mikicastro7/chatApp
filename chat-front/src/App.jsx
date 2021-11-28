/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { useRoutes, BrowserRouter as Router, } from "react-router-dom";
import routes from "./routes";

const App = function () {
  const isAuthenticated = localStorage.getItem("api-token");
  const routing = useRoutes(routes(isAuthenticated));

  return (
    <>
      {routing}
    </>
  );
};

export default App;
