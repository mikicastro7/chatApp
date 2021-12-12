import React, { useContext } from "react";
import UsersContext from "../../Contexts/UsersContext";

const UserInfo = function ({ userName, userId, type }) {
  const {
    sendRequestHandler, acceptRequestHandler, declineRequestHandler
  } = useContext(UsersContext);
  const getButtonsByType = () => {
    if (type === 1) {
      return (
        <div>
          <button type="button" onClick={() => sendRequestHandler(userId)}>Add</button>
          <button type="button">Chat</button>
        </div>
      );
    } else if (type === 2) {
      return (
        <div>
          <button type="button">Chat</button>
        </div>
      );
    } else if (type === 3) {
      return (
        <div>
          <button type="button" onClick={() => acceptRequestHandler(userId)}>Accept</button>
          <button type="button" onClick={() => declineRequestHandler(userId)}>Decline</button>
          <button type="button">Chat</button>
        </div>
      );
    } else if (type === 4) {
      return (
        <div>
          <button type="button">Chat</button>
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
