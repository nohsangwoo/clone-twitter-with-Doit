import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketSlice from "store/reducers/socketSlice";
import styled from "styled-components";
import { v1 as uuidV1 } from "uuid";
import * as wss from "../wssConnection/wssConnection";
import * as webRTCHandler from "../webRTC/webRTCHandler";
import { RootState } from "store/store";

const ControllerContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 200px;
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 100px;
  padding: 10px;
  border: 2px solid blue;
  background-color: white;
  align-items: flex-start;
`;

const ButtonWrapper = styled.div``;

const ControlButton = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  transition: all 0.5s;
  border: 1px solid black;
  border-radius: 10px;
  color: black;
  background-color: white;
  font-weight: 600;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Controller = () => {
  const socketId = useSelector((state: RootState) => state?.socket?.socket?.id);

  // console.log("socketID: ", socketId);
  const dispatch = useDispatch();

  type HandlieJoinRoomType = {
    socketId: string;
    roomId: string;
    counselType: string;
    userType: string;
  };

  const handleJoinRoom = useCallback(() => {
    let roomId = uuidV1();
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
  }, [socketId]);

  useEffect(() => {
    console.log("socketId", socketId);
    // effect;
    // return () => {
    //   cleanup;
    // };
  }, [socketId]);

  const handleLeaveRoom = useCallback(() => {
    console.log("Leave room Button activated");

    webRTCHandler.leaveGroupCall();
  }, []);
  return (
    <ControllerContainer>
      Controler
      {/* join room */}
      <ButtonWrapper>
        <ControlButton onClick={handleJoinRoom}>Join Room</ControlButton>
      </ButtonWrapper>
      {/* leave Room */}
      <ButtonWrapper>
        <ControlButton onClick={handleLeaveRoom}>Leave Room</ControlButton>
      </ButtonWrapper>
    </ControllerContainer>
  );
};

export default Controller;
