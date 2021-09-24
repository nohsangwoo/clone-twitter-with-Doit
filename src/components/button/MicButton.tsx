import React, { useState, memo } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicoffIcon from "@material-ui/icons/MicOff";

import { useSelector } from "react-redux";
import { RootState } from "store/store";

const IconButtonContainer = styled(IconButton)`
  background-color: #fff;
  &:hover {
    background-color: #d8dff2;
  }
`;

interface Props {}

const MicButton = (props: Props): JSX.Element => {
  const [micOn, setMicOn] = useState(false);

  const myStream = useSelector((state: RootState) => state.streams.myStream);

  const micHandler = () => {
    if (myStream instanceof MediaStream) {
      myStream?.getAudioTracks().forEach((track: any) => {
        track.enabled = !track.enabled;
      });
      console.log("mic check", myStream.getAudioTracks()[0]);
      setMicOn(!micOn);
    }
  };

  return (
    <IconButtonContainer color="primary" onClick={micHandler}>
      {micOn ? <MicIcon /> : <MicoffIcon />}
    </IconButtonContainer>
  );
};

export default memo(MicButton);
