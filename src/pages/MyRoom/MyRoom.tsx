import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMyDevices } from "store/actions/devicesActions";
import * as wss from "components/utils/wssConnection/wssConnection";
import streamSlice from "store/reducers/streamSlice";
import styled from "styled-components";
import UserList from "./components/UserList";
import ControlPanel from "components/utils/mediaUtils/ControlPanel";
import MediaControlContainer from "components/containers/MediaControlContainer";

const UserListWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 80px;
  border: 1px solid red;
`;
const MyRoom = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const setChatHandler = () => {
    setChatOpen(!chatOpen);
    console.log(chatOpen);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(streamSlice.actions.getMyStreamSagaTrigger());
    dispatch(getMyDevices());
    wss.connectWithWebSocket();
  }, []);
  return (
    <div>
      <ControlPanel />
      <UserListWrapper>
        <UserList />
      </UserListWrapper>
      <MediaControlContainer
        chatOpen={chatOpen}
        setChatHandler={setChatHandler}
      />
    </div>
  );
};

export default MyRoom;
