import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import streamSlice from "store/reducers/streamSlice";
import { useDispatch } from "react-redux";
const VideoContent = styled.video`
  height: 100%;
  width: auto;
  z-index: 10;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: gray;
    transform: scale(1.1);
  }
`;

type Props = {
  stream?: MediaStream;
  setMute: boolean;
};
const VideoViewer = ({ stream, setMute }: Props) => {
  const userVideo = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (stream?.id) {
        userVideo.current.srcObject = stream;
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }, [stream]);

  const handleSetMainStream = () => {
    dispatch(streamSlice.actions.setSelectedStream(stream));
  };

  return (
    <>
      <VideoContent
        ref={userVideo}
        muted={setMute}
        autoPlay
        playsInline
        onClick={handleSetMainStream}
      />
    </>
  );
};

export default VideoViewer;
