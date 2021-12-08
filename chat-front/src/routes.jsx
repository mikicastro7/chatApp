import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import NotFoundPage from "./Pages/NotFoundPage";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import UsersContextProvider from "./Contexts/UsersContextsProvider";
import Chat from "./Pages/Chat/Chat";

const routes = (isLoggedIn) => [
  {
    path: "/chat",
    element: isLoggedIn ? <UsersContextProvider><AuthContextProvider><Chat /></AuthContextProvider></UsersContextProvider> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: !isLoggedIn ? (
      <AuthContextProvider>
        <Auth />
      </AuthContextProvider>
    ) : <Navigate to="/chat" />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

export default routes;
