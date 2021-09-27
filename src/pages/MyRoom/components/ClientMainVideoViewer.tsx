import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "store/store";

const AdminMainVideoViewerContainer = styled.div`
  position: relative;
`;

const VideoContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  display: flex;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
`;

const VideoContent = styled.video`
  width: 100%;
  /* width: auto; */
`;

type Props = {};
const ClientMainVideoViewer = (props: Props): JSX.Element => {
  const userVideo = useRef<any>();

  const selectedStream = useSelector(
    (state: RootState) => state.streams.selectedStream
  );
  const globalMutedForAllVideoTag = useSelector(
    (state: RootState) => state.devices.globalMutedForAllVideoTag
  );

  useEffect(() => {
    console.log("useEffect for main view");
    if (selectedStream?.id) {
      userVideo.current.srcObject = selectedStream;
    } else {
      userVideo.current.srcObject = null;
    }
  }, [selectedStream]);

  return (
    <AdminMainVideoViewerContainer>
      <VideoContentWrapper>
        <VideoContent
          ref={userVideo}
          muted={globalMutedForAllVideoTag}
          autoPlay
          playsInline
        ></VideoContent>
      </VideoContentWrapper>
    </AdminMainVideoViewerContainer>
  );
};

export default ClientMainVideoViewer;
