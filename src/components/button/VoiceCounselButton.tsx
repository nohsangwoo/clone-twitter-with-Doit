import React, { useState } from "react";

import { Fab, IconButton, Tooltip } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import CamIcon from "@material-ui/icons/Videocam";
import styled from "styled-components";

interface Props {
  voiceModeon: boolean;
  setVoiceModeon: (voiceModeon: boolean) => void;
  videoModeon: boolean;
}

const VoiceFab = styled(Fab)<{ voicemodeon: string }>`
  background-color: ${props =>
    props.voicemodeon === "true" ? "#4263C0" : "#fff"};
`;

const VoiceCounselButton = ({
  voiceModeon = false,
  setVoiceModeon,
  videoModeon
}: Props): JSX.Element => {
  const handleToggleVoice = (isOn: boolean) => {
    setVoiceModeon(!isOn);
  };

  return (
    <Tooltip title="음성상담">
      <VoiceFab
        voicemodeon={String(voiceModeon)}
        color={voiceModeon ? "primary" : undefined}
        size="small"
        // data-aos="zoom-in"
        // data-aos-delay="200"
        onClick={() => handleToggleVoice(!voiceModeon)}
        disabled={videoModeon === true ? true : false}
      >
        <MicIcon />
      </VoiceFab>
    </Tooltip>
  );
};

export default VoiceCounselButton;
