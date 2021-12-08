import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = function ({ userName }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("api-token");
    navigate("/");
  };

  return (
    <div className="logout-info">
      <p>{userName}</p>
      <button className="logout" type="button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
