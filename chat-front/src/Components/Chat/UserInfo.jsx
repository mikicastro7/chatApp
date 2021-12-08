import React from "react";

const UserInfo = function ({ userName, userId, type }) {
  const getButtonsByType = () => {
    if (type === 1) {
      return (
        <div>
          <button type="button">Add</button>
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
