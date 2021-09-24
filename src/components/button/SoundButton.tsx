import React, { useState, memo } from "react";
import { IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SoundIcon from "@material-ui/icons/VolumeUp";
import SoundoffIcon from "@material-ui/icons/VolumeOff";
import styled from "styled-components";

import { RootState } from "../../store/store";
import devicesSlice from "store/reducers/devicesSlice";

const SoundButtonContainer = styled(IconButton)`
  background-color: #fff;
  :hover {
    background-color: #d8dff2;
  }
`;

interface Props {}

const SoundButton = (props: Props): JSX.Element => {
  const [soundOn, setSoundon] = useState(false);
  const dispatch = useDispatch();

  const globalMutedForAllVideoTag = useSelector(
    (state: RootState) => state.devices.globalMutedForAllVideoTag
  );

  const soundHandler = () => {
    setSoundon(!soundOn);
    dispatch(
      devicesSlice.actions.setGlobalMutedForAllVideoTag(
        !globalMutedForAllVideoTag
      )
    );
  };

  return (
    <SoundButtonContainer color="primary" onClick={soundHandler}>
      {!globalMutedForAllVideoTag ? <SoundIcon /> : <SoundoffIcon />}
    </SoundButtonContainer>
  );
};

export default memo(SoundButton);
