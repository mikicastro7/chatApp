/* eslint-disable no-nested-ternary */
import React, { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import UserInfo from "./UserInfo";
import UsersContext from "../../Contexts/UsersContext";

const UsersTabs = function () {
  const {
    users, friends, sent, received
  } = useContext(UsersContext);
  return (
    <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
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
        <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="friends" title="Friends">
            <h1>Friends</h1>
          </Tab>
          <Tab eventKey="no friends" title="Random">
            <h1>No frienfds</h1>
          </Tab>
        </Tabs>
      </Tab>
    </Tabs>
  );
};

export default UsersTabs;
