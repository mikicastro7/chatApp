/* eslint-disable no-nested-ternary */
import React, { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import UserInfo from "./UserInfo";
import UsersContext from "../../Contexts/UsersContext";

const UsersTabs = function () {
  let users = null;
  let friends = null;
  let sent = null;
  let received = null;

  const {
    usersByType
  } = useContext(UsersContext);

  if (usersByType) {
    users = usersByType.usersByType.users;
    friends = usersByType.usersByType.friends;
    sent = usersByType.usersByType.sent;
    received = usersByType.usersByType.received;
  }

  return (
    <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="users" title="Users">
        {users !== null ? users.length !== 0 ? users.map(user => <UserInfo key={user._id} userName={user.userName} type={1} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="friends" title="Friends">
        {users !== null ? friends.length !== 0 ? friends.map(user => <UserInfo key={user._id} userName={user.userName} type={2} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="requests" title="Friend requests">
        {users !== null ? received.length !== 0 ? received.map(user => <UserInfo key={user._id} userName={user.userName} type={3} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent requests">
        {users !== null ? sent.length !== 0 ? sent.map(user => <UserInfo key={user._id} userName={user.userName} type={3} />) : <p>no data</p> : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Tab>
      <Tab eventKey="chats" title="Chats">
        <h3>Chats</h3>
      </Tab>
    </Tabs>
  );
};

export default UsersTabs;
