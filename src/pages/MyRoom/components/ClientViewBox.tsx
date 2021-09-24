import React from "react";
import styled from "styled-components";
import MyStreamVideoViewer from "components/utils/mediaUtils/MyStreamVideoViewer";

const ClientViewBoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 70px;
  height: 90px;
  margin: 0 5px;
  z-index: 10;
`;

const VideoContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;

const ClientViewBox = () => {
  return (
    <ClientViewBoxContainer>
      <VideoContentWrapper>
        <MyStreamVideoViewer isSetStream={true} />
      </VideoContentWrapper>
    </ClientViewBoxContainer>
  );
};

export default ClientViewBox;
