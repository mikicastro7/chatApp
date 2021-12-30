/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// eslint-disable-next-line camelcase
import { useNavigate } from "react-router-dom";
import ChatContext from "./ChatContext";
import useFetch from "../hooks/useFetch";
import useHttp from "../hooks/useHttp";

const ChatContextProvider = function (props) {
  const { data: chatsByType, requestData: requestChats, setData: setChatsByType } = useFetch();
  const [token, setToken] = useState(localStorage.getItem("api-token"));
  const [friendsChats, setFriendsChats] = useState(null);
  const [randomChats, setRandomChats] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { children } = props;

  const { sendRequest: getChat } = useHttp();

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  useEffect(() => {
    requestChats("http://localhost:5000/chat", {
      headers: myHeaders
    });
  }, [requestChats]);

  useEffect(() => {
    if (chatsByType !== null) {
      setFriendsChats(chatsByType.chats.friendsChats);
      setRandomChats(chatsByType.chats.randomChats);
      if (friendsChats) {
        setActiveChat(friendsChats[0]);
      } else {
        setActiveChat(null);
      }
    }
  }, [chatsByType, friendsChats]);

  const setActualChat = (chatId, response) => {
    if (response.status === "success") {
      setActiveChat(response.chat);
    }
  };

  const getChatHandler = async (chatId) => {
    if (chatId === activeChat._id) return;
    getChat({
      url: `http://localhost:5000/chat/${chatId}`,
      method: "GET",
      headers: myHeaders
    }, setActualChat.bind(null, chatId));
  };

  return (
    <ChatContext.Provider value={{
      friendsChats, randomChats, activeChat, getChatHandler
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
