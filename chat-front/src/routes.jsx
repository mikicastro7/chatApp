import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import NotFoundPage from "./Pages/NotFoundPage";
import Chat from "./Pages/Chat/Chat";

import AuthContextProvider from "./Contexts/AuthContextProvider";
import UsersContextProvider from "./Contexts/UsersContextsProvider";
import ChatContextProvider from "./Contexts/ChatContextProvider";

const routes = (isLoggedIn) => [
  {
    path: "/chat",
    element: isLoggedIn
      ? (
        <AuthContextProvider>
          <UsersContextProvider>
            <ChatContextProvider>
              <Chat />
            </ChatContextProvider>
          </UsersContextProvider>
        </AuthContextProvider>
      ) : <Navigate to="/" />,
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
