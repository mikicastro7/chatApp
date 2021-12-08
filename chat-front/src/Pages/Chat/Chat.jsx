import React, { useContext } from "react";
import Logout from "../../Components/Auth/Logout";

import UsersTabs from "../../Components/Chat/UsersTabs";
import ChatDisplayer from "../../Components/Chat/ChatDisplayer";
import AuthContext from "../../Contexts/AuthContext";

const Chat = function () {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <header>
        <nav>
          <div />
          <h1>Chat App</h1>
          <Logout userName={userInfo.user} />
        </nav>
      </header>
      <div>
        <div className="users-chat-wraper container">
          <div className="users-container">
            <UsersTabs />
          </div>
          <div className="chat-container">
            <ChatDisplayer chatName="Chat With miki" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
