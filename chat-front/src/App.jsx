import React from "react";
import {
  BrowserRouter as Router, Routes, Route, Redirect
} from "react-router-dom";
import Auth from "./Pages/Auth/Auth";

const App = function () {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
