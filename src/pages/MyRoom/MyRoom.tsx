import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyDevices } from "store/actions/devicesActions";
import * as wss from "components/utils/wssConnection/wssConnection";
import streamSlice from "store/reducers/streamSlice";
import styled from "styled-components";
import UserList from "./components/UserList";
import ControlPanel from "components/utils/mediaUtils/ControlPanel";
import MediaControlContainer from "components/containers/MediaControlContainer";
import Controller from "components/utils/controller/Controller";
import { useLocation } from "react-router-dom";
import { RootState } from "store/store";
import socketSlice from "store/reducers/socketSlice";
import { locationStateType } from "components/TweetFactory";

const UserListWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 80px;
  border: 1px solid red;
`;

type HandlieJoinRoomType = {
  socketId: string;
  roomId: string;
  counselType: string;
  userType: string;
};

interface Props {}

const MyRoom = (props: Props) => {
  const location = useLocation<locationStateType>();
  const [chatOpen, setChatOpen] = useState(false);
  const socketId = useSelector((state: RootState) => state?.socket?.socket?.id);

  const setChatHandler = () => {
    setChatOpen(!chatOpen);
    console.log(chatOpen);
  };
  const dispatch = useDispatch();

  const handleJoinRoom = useCallback(
    roomId => {
      // let roomId = uuidV1();

      console.log("uuid", roomId);

      const data: HandlieJoinRoomType = {
        socketId: socketId,
        roomId,
        counselType: "Video",
        userType: "Client"
      };

      console.log("Join room Button activated");
      dispatch(socketSlice.actions.getRoomHostInfo(data));
      wss.joinRoom({ roomId: roomId });
    },
    [socketId]
  );

  useEffect(() => {
    dispatch(streamSlice.actions.getMyStreamSagaTrigger());
    dispatch(getMyDevices());
    wss.connectWithWebSocket();
    if (location?.state?.roomId) {
      console.log("location state", location.state.roomId);
      handleJoinRoom(location.state.roomId);
    }
  }, []);
  return (
    <div>
      <ControlPanel />
      <Controller />
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
