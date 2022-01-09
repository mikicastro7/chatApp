/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// eslint-disable-next-line camelcase
import { useNavigate } from "react-router-dom";
import UsersContext from "./UsersContext";
import useFetch from "../hooks/useFetch";
import useHttp from "../hooks/useHttp";

const UsersContextProvider = function (props) {
  const navigate = useNavigate();
  const { data: usersByType, requestData: requestUsers, setData: setUsersByType } = useFetch();
  const [users, setUsers] = useState(null);
  const [friends, setFriends] = useState(null);
  const [sent, setSent] = useState(null);
  const [received, setReceived] = useState(null);
  const { children } = props;
  const [token, setToken] = useState(localStorage.getItem("api-token"));
  const myHeaders = new Headers();

  const { sendRequest: friendRequest } = useHttp();
  const { sendRequest: acceptRequest } = useHttp();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  useEffect(() => {
    requestUsers(`${process.env.REACT_APP_SERVER_URL}/users`, {
      headers: myHeaders
    });
  }, [requestUsers]);

  useEffect(() => {
    if (usersByType !== null) {
      setUsers(usersByType.usersByType.users);
      setFriends(usersByType.usersByType.friends);
      setSent(usersByType.usersByType.sent);
      setReceived(usersByType.usersByType.received);
    }
  }, [usersByType]);

  const passUserToSent = (userId) => {
    const user = users.find(user => user._id === userId);
    setUsers(prevState => prevState.filter(user => user._id !== userId));
    setSent(prevState => [...prevState, user]);
  };

  const sendRequestHandler = async (userIdSend) => {
    friendRequest({
      url: `${process.env.REACT_APP_SERVER_URL}/users/send-request`,
      method: "POST",
      body: JSON.stringify({
        friendToSendRquest: userIdSend
      }),
      headers: myHeaders
    }, passUserToSent.bind(null, userIdSend));
  };

  const passReceivedToFriend = (userId) => {
    const user = received.find(user => user._id === userId);
    setReceived(prevState => prevState.filter(user => user._id !== userId));
    setFriends(prevState => [...prevState, user]);
  };

  const acceptRequestHandler = async (userIdAccept) => {
    friendRequest({
      url: `${process.env.REACT_APP_SERVER_URL}/users/accept-request`,
      method: "POST",
      body: JSON.stringify({
        friendToAccept: userIdAccept
      }),
      headers: myHeaders
    }, passReceivedToFriend.bind(null, userIdAccept));
  };

  const passReceivedToUser = (userId) => {
    const user = received.find(user => user._id === userId);
    setReceived(prevState => prevState.filter(user => user._id !== userId));
    setUsers(prevState => [...prevState, user].sort());
  };

  const declineRequestHandler = async (userIdDecline) => {
    friendRequest({
      url: `${process.env.REACT_APP_SERVER_URL}/users/decline-request`,
      method: "POST",
      body: JSON.stringify({
        friendToDecline: userIdDecline
      }),
      headers: myHeaders
    }, passReceivedToUser.bind(null, userIdDecline));
  };

  return (
    <UsersContext.Provider value={{
      users, friends, sent, received, sendRequestHandler, acceptRequestHandler, declineRequestHandler
    }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
