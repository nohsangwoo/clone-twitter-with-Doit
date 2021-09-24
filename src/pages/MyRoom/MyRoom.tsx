import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyDevices } from "store/actions/devicesActions";
import * as wss from "components/utils/wssConnection/wssConnection";
import streamSlice from "store/reducers/streamSlice";
import styled from "styled-components";
import UserList from "./components/UserList";

const UserListWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 80px;
  border: 1px solid red;
`;
const MyRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(streamSlice.actions.getMyStreamSagaTrigger());
    dispatch(getMyDevices());
    wss.connectWithWebSocket();
  }, []);
  return (
    <div>
      <UserListWrapper>
        <UserList />
      </UserListWrapper>
    </div>
  );
};

export default MyRoom;
