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

const Home = styled.div`
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0px;
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
`;

const MediaControlContainer = ({
  chatOpen,
  setChatHandler
}: Props): JSX.Element => {
  return (
    //client 영상 스트리밍 제어버튼모음

    // <Home data-aos="fade-left" data-aos-delay="200">
    <Home>
      <MicBtn />
      <SoundBtn />
      <CamBtn />
      <ChatBtn chatOpen={chatOpen} setChatHandler={setChatHandler} />
    </Home>
  );
};

export default MediaControlContainer;
