/* eslint-disable no-nested-ternary */
import React, { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import UserInfo from "./UserInfo";
import ChatInfo from "./ChatInfo";
import UsersContext from "../../Contexts/UsersContext";
import ChatContext from "../../Contexts/ChatContext";

const UsersTabs = function () {
  const {
    users, friends, sent, received
  } = useContext(UsersContext);

  const {
    friendsChats, randomChats
  } = useContext(ChatContext);

  return (
    <Tabs defaultActiveKey="chats" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="users" title="Users">
        {users !== null ? users.length !== 0 ? users.map(user => <UserInfo key={user._id} userName={user.userName} userId={user._id} type={1} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="friends" title="Friends">
        {users !== null ? friends.length !== 0 ? friends.map(user => <UserInfo key={user._id} userName={user.userName} userId={user._id} type={2} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="requests" title="Friend requests">
        {users !== null ? received.length !== 0 ? received.map(user => <UserInfo key={user._id} userName={user.userName} userId={user._id} type={3} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent requests">
        {users !== null ? sent.length !== 0 ? sent.map(user => <UserInfo key={user._id} userName={user.userName} userId={user._id} type={4} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="chats" title="Chats">
        <Tabs defaultActiveKey="friendsChats" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="friendsChats" title="Friends">
            {friendsChats != null ? friendsChats.length !== 0 ? friendsChats.map(chat => <ChatInfo chatType={1} key={chat._id} lastMessage={chat.messages[chat.messages.length - 1]} users={chat.users} chatId={chat._id} />) : <p>no data</p> : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Tab>
          <Tab eventKey="randomChats" title="Random">
            {randomChats != null ? randomChats.length !== 0 ? randomChats.map(chat => <ChatInfo chatType={2} key={chat._id} lastMessage={chat.messages[chat.messages.length - 1]} users={chat.users} chatId={chat._id} />) : <p>no data</p> : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Tab>
        </Tabs>
      </Tab>
    </Tabs>
  );
};

export default UsersTabs;
