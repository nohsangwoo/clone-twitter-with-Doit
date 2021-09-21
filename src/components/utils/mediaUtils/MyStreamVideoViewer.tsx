import React, { useEffect, useRef } from "react";
import styled from "styled-components";
// import io from "socket.io-client";
// import Peer from "simple-peer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import devicesSlice from "../../../store/reducers/devicesSlice";
import { getMyStream } from "store/actions/streamActions";

import { useHistory, useLocation } from "react-router-dom";

import { RouterPath } from "../routerPath";
import { IconButton, Tooltip } from "@material-ui/core";
import Fullscreen from "@material-ui/icons/Fullscreen";
import * as webRTCHandler from "../webRTC/webRTCHandler";
import * as wss from "../wssConnection/wssConnection";

import { RootState } from "store/store";
import streamSlice from "store/reducers/streamSlice";
import { getMyDevices } from "store/actions/devicesActions";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #000000;
`;

const VideoContent = styled.video`
  position: relative;
  display: flex;
  height: 100%;
  width: auto;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  z-index: -1;
`;

const IconButtonWrapper = styled(IconButton)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const CircularProgressStyled = styled(CircularProgress)`
  color: #fff;
  margin-bottom: 10px;
`;

const FullscreenButton = styled(Fullscreen)`
  color: #fff;
`;

type Props = {
  isSetStream?: boolean;
};

const MyStreamVideoViewer = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const userVideo = useRef<any>();
  const location = useLocation();
  const history = useHistory();

  // const globalMutedForAllVideoTag = useSelector(
  //   (state: RootState) => state.devices.globalMutedForAllVideoTag
  // );

  const myStream = useSelector((state: RootState) => state.streams.myStream);

  useEffect(() => {
    try {
      dispatch(getMyStream());
      // webRTCHandler.getMyStream();

      dispatch(getMyDevices());

      wss.connectWithWebSocket();
    } catch (e) {
      if (e instanceof TypeError) {
        console.error(e.message);
      }
    }
  }, []);
  useEffect(() => {
    try {
      if (myStream instanceof MediaStream) {
        userVideo.current.srcObject = myStream;
      }
    } catch (e) {
      if (e instanceof TypeError) {
        console.error(e.message);
      }
    }
  }, [myStream]);

  useEffect(() => {
    // 해당 컴포넌트가 새로 고침후 접속시 video tag는 꼭 muted속성이 true여야 하니깐 초기화 하는내용
    dispatch(devicesSlice.actions.setGlobalMutedForAllVideoTag(true));
  }, []);

  const handleSetMainStream = () => {
    if (props?.isSetStream) {
      dispatch(streamSlice.actions.setSelectedStream(myStream));
    }
  };

  return (
    <VideoContainer data-aos="flip-left" data-aos-delay="000">
      {/* 현재 디바이스의 연결된 비디오 및 오디오 장치 정보를 모두 구하고 redux에 저장함 */}

      {/* 내화면인경우 mute는 비활성화 근데 이거 따로 설정해야하나? */}
      <VideoContent
        ref={userVideo}
        muted={true}
        autoPlay
        playsInline
        onClick={handleSetMainStream}
      />
      {/* <CircularProgressStyled disableShrink />
      연결중 입니다. */}
      {location.pathname === RouterPath.Chat && (
        <Tooltip title="전체화면">
          <IconButtonWrapper onClick={() => history.push(RouterPath.Video)}>
            <FullscreenButton />
          </IconButtonWrapper>
        </Tooltip>
      )}
    </VideoContainer>
  );
};

export default MyStreamVideoViewer;
