import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import NotFoundPage from "./Pages/NotFoundPage";
import UserContextProvider from "./Contexts/UserContextProvider";
import Chat from "./Pages/Chat/Chat";

const routes = (isLoggedIn) => [
  {
    path: "/chat",
    element: isLoggedIn ? <UserContextProvider><Chat /></UserContextProvider> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: !isLoggedIn ? (
      <UserContextProvider>
        <Auth />
      </UserContextProvider>
    ) : <Navigate to="/chat" />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

export default routes;
