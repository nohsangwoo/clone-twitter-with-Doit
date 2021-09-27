import React from "react";
import MicBtn from "../button/MicButton";
import SoundBtn from "../button/SoundButton";
import CamBtn from "../button/CamButton";
import ChatBtn from "../button/ChatButton";
import styled from "styled-components";

interface Props {
  chatOpen: boolean;
  setChatHandler: (chatopen: boolean) => void;
}

const ConversationBTNContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0px;
  display: flex;
  justify-content: space-around;
  background: white;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
`;

const MediaControlContainer = ({
  chatOpen,
  setChatHandler
}: Props): JSX.Element => {
  return (
    //client 영상 스트리밍 제어버튼모음

    // <Home data-aos="fade-left" data-aos-delay="200">
    <ConversationBTNContainer>
      <MicBtn />
      <SoundBtn />
      <CamBtn />
      <ChatBtn chatOpen={chatOpen} setChatHandler={setChatHandler} />
    </ConversationBTNContainer>
  );
};

export default MediaControlContainer;
