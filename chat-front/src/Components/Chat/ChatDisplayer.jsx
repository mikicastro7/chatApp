/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, {
  useRef, useEffect, useContext, useState
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import ChatContext from "../../Contexts/ChatContext";
import AuthContext from "../../Contexts/AuthContext";

const ChatDisplayer = function () {
  const elementRef = useRef(null);
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    if (elementRef.current !== null) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  const {
    activeChat, sendMessageHandler
  } = useContext(ChatContext);
  const {
    userInfo
  } = useContext(AuthContext);
  let chatWith = null;
  const userToChatWith = () => {
    if (activeChat) {
      chatWith = activeChat.users.filter(user => user._id !== userInfo.id)[0];
      return `Chat with ${chatWith.userName}`;
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessageHandler(activeChat._id, chatText);
    setChatText("");
  };

  let messages = [];

  const formatMessages = () => {
    if (activeChat === undefined) {
      messages = <p className="no-chat">Chat with somone or select a random chat what are you waiting for</p>;
    } else if (activeChat) {
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
      <form onSubmit={(e) => submitMessage(e)} className="form-send-message">
        <input onChange={(e) => setChatText(e.target.value)} value={chatText} type="text" placeholder="Write message" />
        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
};

export default ChatDisplayer;
