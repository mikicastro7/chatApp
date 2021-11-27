import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import NotFoundPage from "./Pages/NotFoundPage";
import UserContextProvider from "./Contexts/UserContextProvider";

const routes = (isLoggedIn) => [
  {
    path: "/chat",
    element: isLoggedIn ? <h1>Logged</h1> : <Navigate to="/" />,
    children: [
      /*  { path: "/dashboard", element: <Dashboard /> },
        { path: "/account", element: <Account /> },
      { path: "/", element: <Navigate to="/chat" /> }, */
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? (
      <UserContextProvider>
        <Auth />
      </UserContextProvider>
    ) : <Navigate to="/chat" />,
    children: [
      { path: "login", element: <UserContextProvider><Auth /></UserContextProvider> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

export default routes;
