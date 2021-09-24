import React from "react";

import { IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/CloseRounded";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.87);
  z-index: 10;
`;
const MovieCloseBtn = styled(IconButton)`
  position: absolute;
  right: -1;
  top: 10px;
`;
const VideoBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VideoView = styled.video`
  width: 100%;
`;

interface Props {
  isMovieon: boolean;
  setIsMovieon: (isMovieon: boolean) => void;
}

const MovieList = ({ isMovieon, setIsMovieon }: Props): JSX.Element => {
  const handleToggleMovie = (isOn: boolean) => {
    setIsMovieon(!isOn);
  };

  return (
    // 홍보영상 리스트
    <VideoContainer>
      <MovieCloseBtn onClick={() => handleToggleMovie(!isMovieon)}>
        <CloseIcon style={{ color: "#fff" }} />
      </MovieCloseBtn>
      <VideoBox>
        <VideoView
          autoPlay={true}
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          // src="../../../res/images/video/mobile_vertical.mp4"
          controls={true}
        />
      </VideoBox>
    </VideoContainer>
  );
};

export default MovieList;
