import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "store/store";

const AdminMainVideoViewerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
`;

const VideoContent = styled.video<{
  windowWidthSize: string;
  windowHeightSize: string;
}>`
  width: ${props => props.windowWidthSize};
  height: ${props => props.windowHeightSize};
`;

type Props = {};
const ClientMainVideoViewer = (props: Props): JSX.Element => {
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);
  const [windowHeightSize, setWindowHeightSize] = useState(window.innerHeight);

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

  const handleWindowResize = useCallback(event => {
    setWindowWidthSize(window.innerWidth);
    setWindowHeightSize(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    console.log("windowWidthSize", windowWidthSize);
    console.log("windowHeightSize", windowHeightSize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize, windowWidthSize, windowHeightSize]);

  return (
    <AdminMainVideoViewerContainer>
      <VideoContentWrapper>
        <VideoContent
          ref={userVideo}
          muted={globalMutedForAllVideoTag}
          autoPlay
          playsInline
          windowWidthSize={String(windowWidthSize)}
          windowHeightSize={String(windowHeightSize)}
        ></VideoContent>
      </VideoContentWrapper>
    </AdminMainVideoViewerContainer>
  );
};

export default ClientMainVideoViewer;
