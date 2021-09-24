import React, { useState } from "react";

import { Fab, IconButton, Tooltip } from "@material-ui/core";
import CamIcon from "@material-ui/icons/Videocam";

interface Props {
  videoModeon: boolean;
  voiceModeon: boolean;
  setVideoModeon: (voiceModeon: boolean) => void;
}

const VoiceCounselButton = ({
  videoModeon,
  setVideoModeon,
  voiceModeon
}: Props): JSX.Element => {
  const handleToggleVideo = (isOn: boolean) => {
    setVideoModeon(!isOn);
  };

  return (
    <Tooltip title="영상상담">
      <Fab
        style={{ marginLeft: 6 }}
        data-aos="zoom-in"
        data-aos-delay="300"
        onClick={() => handleToggleVideo(!videoModeon)}
        color={videoModeon ? "primary" : undefined}
        size="small"
        disabled={voiceModeon === true ? true : false}
      >
        <CamIcon />
      </Fab>
    </Tooltip>
  );
};

export default VoiceCounselButton;
