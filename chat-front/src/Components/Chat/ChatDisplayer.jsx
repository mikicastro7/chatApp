/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import ChatContext from "../../Contexts/ChatContext";
import AuthContext from "../../Contexts/AuthContext";

const ChatDisplayer = function ({ chatName }) {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef.current !== null) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  const {
    activeChat
  } = useContext(ChatContext);
  const {
    userInfo
  } = useContext(AuthContext);
  let chatWith = null;
  const userToChatWith = () => {
    if (activeChat !== null) {
      chatWith = activeChat.users.filter(user => user._id !== userInfo.id)[0];
      return `Chat with ${chatWith.userName}`;
    }
  };

  let messages = [];

  const formatMessages = () => {
    if (activeChat !== null) {
      activeChat.messages.forEach((message, i) => {
        let className = null;
        if (userInfo.id === message.user) className = "my-message";
        else className = "other-message";
        if (i === activeChat.messages.length - 1) {
          messages.push(<p ref={elementRef} key={message._id} className={className}>{message.text}</p>);
        } else {
          messages.push(<p key={message._id} className={className}>{message.text}</p>);
        }
      });
    } else {
      messages = (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
  };

  formatMessages();

  return (
    <div className="chat-displayer">
      <h2>{userToChatWith()}</h2>
      <div className="messages-container">
        {messages}
      </div>
      <form className="form-send-message">
        <input type="text" placeholder="Write message" />
        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
};

export default ChatDisplayer;
