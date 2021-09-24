import React, { useState, memo } from "react";
import { IconButton } from "@material-ui/core";
import CamIcon from "@material-ui/icons/Videocam";
import CamoffIcon from "@material-ui/icons/VideocamOff";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "store/store";

const CamButtonContainer = styled(IconButton)`
  background-color: #fff;
  &:hover {
    background-color: #d8dff2;
  }
`;

interface Props {}

const CamButton = (props: Props): JSX.Element => {
  const myStream = useSelector((state: RootState) => state.streams.myStream);

  const [camOn, setCamOn] = useState(true);

  const handleClick = () => {
    if (myStream instanceof MediaStream) {
      myStream
        .getVideoTracks()
        .forEach((track: any) => (track.enabled = !track.enabled));
      setCamOn(!camOn);
    }
  };

  return (
    <CamButtonContainer color="primary" onClick={handleClick}>
      {camOn ? <CamIcon /> : <CamoffIcon />}
    </CamButtonContainer>
  );
};

export default memo(CamButton);
