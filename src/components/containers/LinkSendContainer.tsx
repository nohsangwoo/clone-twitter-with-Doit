import React from "react";
import {
  Button,
  // createMuiTheme,
  createStyles,
  ListSubheader,
  Paper,
  ThemeProvider
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import styled from "styled-components";
// import NotiIcon from "@material-ui/icons/Notifications";
import { useSelector } from "react-redux";
import NotiList from "./NotiList";
import { RootState } from "../../store/store";

const LinkContainer = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  min-width: 320px;
  box-sizing: border-box;
  z-index: 101;
  & > h4,
  & > div {
    margin-bottom: 12px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  & * {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const SendMessage = styled.h4``;

const UrlBox = styled.div`
  display: flex;
  & > :nth-child(1) {
    flex: 1;
    justify-content: flex-start;
  }
  & > :nth-child(2) {
    margin-left: 10px;
  }
`;

const MessageContainer = styled(ListSubheader)`
  & svg {
  }
`;

const LinkSendContainer = () => {
  const linkTheme = createTheme({
    overrides: {
      MuiButton: createStyles({
        root: {
          color: "rgba(0,0,0,0.54)",
          fontWeight: 600
        },
        outlined: {
          padding: "8px 16px"
        }
      })
    }
  });

  const noticount = useSelector((state: RootState) => state.counter.noticount);
  const otherStrem = useSelector(
    (state: RootState) => state.streams.otherStream
  );

  const camNotiHandler = () => {
    if (noticount === 0) {
      return (
        <LinkContainer>
          <MessageContainer>알림이 없습니다.</MessageContainer>
        </LinkContainer>
      );
    }
    return (
      <LinkContainer>
        <MessageContainer>{noticount}개의 알림이 있습니다.</MessageContainer>
        <NotiList />
      </LinkContainer>
    );
  };

  const selectModeToggle = useSelector(
    (state: RootState) => state.toggleselect.selectModeToggle
  );
  return (
    //admin 접속시 noti 화면
    <ThemeProvider theme={linkTheme}>
      {selectModeToggle === "cam" &&
        otherStrem.length === 0 &&
        camNotiHandler()}
      {selectModeToggle === "mycam" && (
        <LinkContainer>
          <SendMessage>SMS를 발송하거나 링크를 복사하여공유하세요</SendMessage>
          <UrlBox>
            <Button variant="outlined">alo.to/09c2197</Button>
            <Button variant="outlined">Copy</Button>
          </UrlBox>
          <Button variant="outlined" fullWidth={true}>
            메시지(SMS) 보내기
          </Button>
        </LinkContainer>
      )}
      {selectModeToggle === "photo" && (
        <LinkContainer>
          <SendMessage>사진을 올려주세요</SendMessage>
        </LinkContainer>
      )}
    </ThemeProvider>
  );
};

export default LinkSendContainer;
