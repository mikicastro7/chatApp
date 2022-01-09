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
    const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}`);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    requestChats(`${process.env.REACT_APP_SERVER_URL}/chat`, {
      headers: myHeaders
    });
  }, [requestChats]);

  useEffect(() => {
    console.log("aspkodmaskpomdasokpm");
    if (chatsByType !== null) {
      setFriendsChats(chatsByType.chats.friendsChats);
      setRandomChats(chatsByType.chats.randomChats);
      chatsByType.chats.friendsChats.forEach(chat => {
        joinChatRoomSocket(chat._id);
      });
      chatsByType.chats.randomChats.forEach(chat => {
        joinChatRoomSocket(chat._id);
      });
    }
  }, [chatsByType]);

  useEffect(() => {
    if (friendsChats) {
      if (firstTimeChats) {
        console.log("apskdmkasmdkjas");
        setActiveChat(friendsChats[0]);
        setFirstTimeChats(false);
      }
    } else {
      setActiveChat(null);
    }
  }, [friendsChats]);

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
      url: `${process.env.REACT_APP_SERVER_URL}/chat/${chatId}`,
      method: "GET",
      headers: myHeaders
    }, setActualChat.bind(null, chatId));
  };

  const getNewChat = (response) => {
    if (response.status === "success") {
      if (response.chat.new === false) {
        setActiveChat(response.chat.chat);
      } else {
        requestChats(`${process.env.REACT_APP_SERVER_URL}/chat`, {
          headers: myHeaders
        });
        setActiveChat(response.chat.chat);
      }
    }
  };

  const createGetChatHandler = async (userWithId) => {
    createGetChatRequest({
      url: `${process.env.REACT_APP_SERVER_URL}/chat/new`,
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
      if (activeChat != null) {
        if (room === activeChat._id) {
          setActiveChat(prevState => ({ ...prevState, messages: [...prevState.messages, message] }));
        }
      }
      let isFriendChat = true;
      let messagedChatIndex = friendsChats.findIndex(chat => chat._id === room);
      if (messagedChatIndex === -1) {
        messagedChatIndex = randomChats.findIndex(chat => chat._id === room);
        isFriendChat = false;
      }
      if (isFriendChat) {
        setFriendsChats(prevState => ([{
          ...prevState[messagedChatIndex],
          messages:
            [...prevState[messagedChatIndex].messages, message]
        },
        ...prevState.filter((chat, i) => i !== messagedChatIndex)]));
      } else {
        setRandomChats(prevState => ([{
          ...prevState[messagedChatIndex],
          messages:
            [...prevState[messagedChatIndex].messages, message]
        },
        ...prevState.filter((chat, i) => i !== messagedChatIndex)]));
      }
    });
    return () => socket.off("recive-message");
  }, [socket, friendsChats, randomChats]);

  const sendMessage = async (chatId, text, response) => {
    socket.emit("send-message", response.message, activeChat._id);
    setActiveChat(prevState => ({ ...prevState, messages: [...prevState.messages, response.message] }));
  };

  const sendMessageHandler = async (chatId, text) => {
    sendMessageRequest({
      url: `${process.env.REACT_APP_SERVER_URL}/chat/new-message`,
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
