/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";
import ChatContext from "../../Contexts/ChatContext";

const ChatInfo = function ({ users, chatId, lastMessage }) {
  const {
    userInfo
  } = useContext(AuthContext);
  const {
    activeChat, getChatHandler
  } = useContext(ChatContext);
  let chatWith = null;
  const userToChatWith = () => {
    chatWith = users.filter(user => user._id !== userInfo.id)[0];
    return chatWith.userName;
  };

  let lastMessageUserName = null;
  let seenMessage = null;

  if (lastMessage) {
    lastMessageUserName = users.find(user => user._id === lastMessage.user);
    lastMessageUserName = lastMessageUserName._id === userInfo.id ? "Me" : lastMessageUserName.userName;
    if (lastMessage.user === userInfo.id) {
      seenMessage = true;
    } else {
      seenMessage = lastMessage.seen;
    }
  }
  const lastMessageDate = lastMessage ? new Date(lastMessage.createdAt).toLocaleDateString() : "";

  let isChatActive = null;
  if (activeChat) {
    isChatActive = activeChat._id === chatId;
  }

  return (
    <div role="button" tabIndex={0} onClick={() => getChatHandler(chatId)} className={`chat-preview-displayer ${seenMessage ? "" : "blue-color"} ${isChatActive ? "active-chat" : ""}`}>
      <p>{userToChatWith()}</p>
      <p className="last-message">{lastMessage ? `${lastMessageUserName}: ${lastMessage.text}` : "Send your first message"}</p>
      <p>{lastMessageDate}</p>
    </div>
  );
};

export default ChatInfo;
