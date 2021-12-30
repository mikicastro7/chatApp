import React, { useContext } from "react";
import UsersContext from "../../Contexts/UsersContext";
import ChatContext from "../../Contexts/ChatContext";

const UserInfo = function ({ userName, userId, type }) {
  const {
    sendRequestHandler, acceptRequestHandler, declineRequestHandler
  } = useContext(UsersContext);
  const {
    createGetChatHandler
  } = useContext(ChatContext);

  const getButtonsByType = () => {
    if (type === 1) {
      return (
        <div>
          <button type="button" onClick={() => sendRequestHandler(userId)}>Add</button>
          <button type="button" onClick={() => createGetChatHandler(userId)}>Chat</button>
        </div>
      );
    } else if (type === 2) {
      return (
        <div>
          <button type="button" onClick={() => createGetChatHandler(userId)}>Chat</button>
        </div>
      );
    } else if (type === 3) {
      return (
        <div>
          <button type="button" onClick={() => acceptRequestHandler(userId)}>Accept</button>
          <button type="button" onClick={() => declineRequestHandler(userId)}>Decline</button>
          <button type="button" onClick={() => createGetChatHandler(userId)}>Chat</button>
        </div>
      );
    } else if (type === 4) {
      return (
        <div>
          <button type="button" onClick={() => createGetChatHandler(userId)}>Chat</button>
        </div>
      );
    }
  };
  return (
    <div className="user-displayer">
      <p>{userName}</p>
      {getButtonsByType()}
    </div>
  );
};

export default UserInfo;
