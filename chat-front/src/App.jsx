import React from "react";
import {
  BrowserRouter as Router, Routes, Route, Redirect
} from "react-router-dom";

import Auth from "./Pages/Auth/Auth";

import UserContextProvider from "./Contexts/UserContextProvider";

const App = function () {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={(
              <UserContextProvider>
                <Auth />
              </UserContextProvider>
            )}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
