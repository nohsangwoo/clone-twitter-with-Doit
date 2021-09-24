import React from "react";
import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Textsms";
import styled from "styled-components";

const ChatButtonContainer = styled(IconButton)`
  background-color: #fff;
  &:hover {
    background-color: #d8dff2;
  }
`;

interface Props {
  chatOpen: boolean;
  setChatHandler: (chatOpen: boolean) => void;
}

const ChatButton = ({ chatOpen, setChatHandler }: Props): JSX.Element => {
  const openChatHandler = (isOn: boolean) => {
    setChatHandler(!isOn);
  };

  return (
    <ChatButtonContainer
      color="primary"
      onClick={() => openChatHandler(!chatOpen)}
    >
      <ChatIcon />
    </ChatButtonContainer>
  );
};

export default ChatButton;
