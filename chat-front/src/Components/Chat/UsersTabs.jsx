import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const UsersTabs = function () {
  return (
    <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="users" title="Users">
        <h3>Users</h3>
      </Tab>
      <Tab eventKey="friends" title="Friends">
        <h3>Friends</h3>
      </Tab>
      <Tab eventKey="requests" title="Friend requests">
        <h3>Friend requests</h3>
      </Tab>
      <Tab eventKey="sent" title="Sent requests">
        <h3>Sent requests</h3>
      </Tab>
      <Tab eventKey="chats" title="Chats">
        <h3>Chats</h3>
      </Tab>
    </Tabs>
  );
};

export default UsersTabs;
