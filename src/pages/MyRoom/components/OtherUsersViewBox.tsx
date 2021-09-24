import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { RootState } from "store/store";
import styled from "styled-components";
import VideoViewer from "./VideoViewer";

const ClientViewBoxContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin: 0 5px;
`;

const VideoContentWrapper = styled.div`
  width: 70px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: black;
  box-sizing: border-box;
`;

const ClientViewBox = () => {
  const otherStream = useSelector(
    (state: RootStateOrAny) => state.streams.otherStream
  );
  const globalMutedForAllVideoTag = useSelector(
    (state: RootState) => state.devices.globalMutedForAllVideoTag
  );

  console.log("otherStream 외부 값", otherStream);

  return (
    <ClientViewBoxContainer>
      {/* 해당 방에 접속한 client의 수 만큼 렌더링 하기위해 맵을 돌림 */}

      {Array.isArray(otherStream) &&
        otherStream?.map((stream: MediaStream, index: number): JSX.Element => {
          return (
            <VideoContentWrapper key={index}>
              {/* video viewer는 컴포넌트로 만들어서 재사용함 (admin 한정) */}
              <VideoViewer
                stream={stream}
                setMute={globalMutedForAllVideoTag}
              />
            </VideoContentWrapper>
          );
        })}
    </ClientViewBoxContainer>
  );
};

export default ClientViewBox;
