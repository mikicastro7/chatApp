/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// eslint-disable-next-line camelcase
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ChatContext from "./ChatContext";
import useFetch from "../hooks/useFetch";
import useHttp from "../hooks/useHttp";

const ChatContextProvider = function (props) {
  const { data: chatsByType, requestData: requestChats, setData: setChatsByType } = useFetch();
  const [token, setToken] = useState(localStorage.getItem("api-token"));
  const [friendsChats, setFriendsChats] = useState(null);
  const [randomChats, setRandomChats] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [firstTimeChats, setFirstTimeChats] = useState(true);
  const [socket, setSocket] = useState();
  const { children } = props;

  const { sendRequest: getChatRequest } = useHttp();
  const { sendRequest: createGetChatRequest } = useHttp();
  const { sendRequest: sendMessageRequest } = useHttp();

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    requestChats("http://localhost:5000/chat", {
      headers: myHeaders
    });
  }, [requestChats]);

  useEffect(() => {
    if (chatsByType !== null) {
      setFriendsChats(chatsByType.chats.friendsChats);
      setRandomChats(chatsByType.chats.randomChats);
      chatsByType.chats.friendsChats.forEach(chat => {
        joinChatRoomSocket(chat._id);
      });
      chatsByType.chats.randomChats.forEach(chat => {
        joinChatRoomSocket(chat._id);
      });
      if (friendsChats) {
        if (firstTimeChats) {
          setActiveChat(friendsChats[0]);
          setFirstTimeChats(false);
        }
      } else {
        setActiveChat(null);
      }
    }
  }, [chatsByType, friendsChats]);

  const joinChatRoomSocket = (roomId) => {
    socket.emit("join-room", roomId);
  };

  const setActualChat = (chatId, response) => {
    if (response.status === "success") {
      setActiveChat(response.chat);
    }
  };

  const getChatHandler = async (chatId) => {
    if (activeChat && chatId === activeChat._id) return;
    getChatRequest({
      url: `http://localhost:5000/chat/${chatId}`,
      method: "GET",
      headers: myHeaders
    }, setActualChat.bind(null, chatId));
  };

  const getNewChat = (response) => {
    if (response.status === "success") {
      if (response.chat.new === false) {
        setActiveChat(response.chat.chat);
      } else {
        requestChats("http://localhost:5000/chat", {
          headers: myHeaders
        });
        setActiveChat(response.chat.chat);
      }
    }
  };

  const createGetChatHandler = async (userWithId) => {
    console.log(userWithId);
    createGetChatRequest({
      url: "http://localhost:5000/chat/new",
      method: "POST",
      body: JSON.stringify({
        chatWith: userWithId
      }),
      headers: myHeaders
    }, getNewChat.bind(null));
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("recive-message", (message, room) => {
      if (room === activeChat._id) {
        setActiveChat(prevState => ({ ...prevState, messages: [...prevState.messages, message] }));
      }
    });
    return () => socket.off("recive-message");
  }, [socket]);

  const sendMessage = async (chatId, text, response) => {
    socket.emit("send-message", response.message, activeChat._id);
    setActiveChat(prevState => ({ ...prevState, messages: [...prevState.messages, response.message] }));
  };

  const sendMessageHandler = async (chatId, text) => {
    sendMessageRequest({
      url: "http://localhost:5000/chat/new-message",
      method: "POST",
      body: JSON.stringify({
        chatId,
        text
      }),
      headers: myHeaders
    }, sendMessage.bind(null, chatId, text));
  };

  return (
    <ChatContext.Provider value={{
      friendsChats, randomChats, activeChat, getChatHandler, createGetChatHandler, sendMessageHandler
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
