import React, { useState } from "react";

import { Fab } from "@material-ui/core";
import VideoIcon from "@material-ui/icons/Videocam";
import { useHistory } from "react-router-dom";

import { RouterPath } from "../utils/routerPath";
import styled from "styled-components";
interface Props {
  test?: string;
}

const VideoBtn = styled(Fab)`
  background-color: #4263c0;
  color: #fff;
  width: 100%;
  height: 100%;
  font-size: 12px;
`;

const JoinVideoCounselButton = (props: Props): JSX.Element => {
  const history = useHistory();
  const handleChange = () => {
    history.push(RouterPath.Video);
  };

  return (
    //client main 화면 영상연결버튼
    <VideoBtn color="primary" onClick={() => handleChange()}>
      <VideoIcon style={{ fontSize: 32 }} />
      실시간 영상 <br />
      입장
    </VideoBtn>
  );
};

export default JoinVideoCounselButton;
