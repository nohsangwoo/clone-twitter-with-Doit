import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "store/store";

const AdminMainVideoViewerContainer = styled.div`
  position: relative;
`;

const VideoContentWrapper = styled.div`
  width: 360px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoContent = styled.video`
  height: 100%;
  width: auto;
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
