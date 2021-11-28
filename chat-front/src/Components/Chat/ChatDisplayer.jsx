/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatDisplayer = function ({ chatName }) {
  return (
    <div className="chat-displayer">
      <h2>{chatName}</h2>
      <div className="messages-container">
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
        <p className="my-message">Message mine</p>
        <p className="other-message">Message other</p>
      </div>
      <form className="form-send-message">
        <input type="text" placeholder="Write message" />
        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
};

export default ChatDisplayer;
