import React, { useState } from "react";

import { Fab } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/CloseRounded";

import AloIcon from "../../res/images/svgicon/alo_logo.svg";
import styled from "styled-components";

interface Props {
  isAlomodeon?: boolean;
  setIsAlomodeon: (isAlomodeon: boolean) => void;
}

const AloMainBtn = styled(Fab)`
  position: fixed;
  width: 66px;
  height: 66px;
  bottom: 20px;
  right: 20px;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
`;

const AloButton = ({ isAlomodeon, setIsAlomodeon }: Props): JSX.Element => {
  const handleToggleAlo = (isOn: boolean) => {
    setIsAlomodeon(!isOn);
  };

  return (
    //타사이트내 위치하는 alo서비스 연결 버튼
    <AloMainBtn
      onClick={() => handleToggleAlo(!isAlomodeon)}
      color={isAlomodeon ? "primary" : undefined}
    >
      {isAlomodeon ? (
        <CloseIcon></CloseIcon>
      ) : (
        <img src={AloIcon} style={{ width: 36 }} />
      )}
    </AloMainBtn>
  );
  // }
};
export default AloButton;
