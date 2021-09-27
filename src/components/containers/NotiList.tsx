import React from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";
import VideoIcon from "@material-ui/icons/Videocam";
import ChatIcon from "@material-ui/icons/Sms";
import VoiceIcon from "@material-ui/icons/Mic";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { joinRoom } from "../utils/wssConnection/wssConnection";
import { RootState } from "../../store/store";
import toggleSlice from "store/reducers/toggleSlice";
import socketSlice, { roomHostInfoType } from "store/reducers/socketSlice";
import counterSlice from "store/reducers/counterSlice";

const ListItemWrapper = styled.div`
  cursor: pointer;
`;
enum counselType {
  Video = "Video",
  Voice = "Voice",
  Chat = "Chat"
}

enum noticeMessage {
  Video = "영상 상담을 요청하였습니다.",
  Chat = "채팅 상담을 요청하였습니다.",
  Voice = "음성 상담을 요청하였습니다."
}

const NotiListItem = styled(ListItem)`
  & > div:nth-child(1) {
    min-width: 42px;
  }
  & > div > span {
    font-size: 13px;
    font-weight: 600;
  }
  & > div > p {
    font-size: 11px;
  }
`;

const NotiList = () => {
  const otherUsersInfoList = useSelector(
    (state: RootState) => state.socket.otherUsersInfoList
  );

  const dispatch = useDispatch();
  console.log("notilist otherUsersInfoList: ", otherUsersInfoList);

  const noticeSellector = (Type?: string): JSX.Element => {
    switch (Type) {
      case counselType.Video:
        return (
          <>
            <VideoIcon />
            <ListItemText
              primary={noticeMessage?.[Type]}
              secondary={"15분 전"}
            />
          </>
        );
      case counselType.Chat:
        return (
          <>
            <ChatIcon />
            <ListItemText
              primary={noticeMessage?.[Type]}
              secondary={"15분 전"}
            />
          </>
        );
      case counselType.Voice:
        return (
          <>
            <VoiceIcon />
            <ListItemText
              primary={noticeMessage?.[Type]}
              secondary={"15분 전"}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  const handleJoinRoom = (data: roomHostInfoType) => {
    console.log("handleJoinRoom data: ", data);
    dispatch(socketSlice.actions.getRoomHostInfo(data));
    joinRoom({ roomId: data.roomId });
    dispatch(toggleSlice.actions.setIsModeSelect(false));

    dispatch(socketSlice.actions.removeTargetSocket(data.roomId));
    dispatch(counterSlice.actions.totalCountDecrease(0));
  };
  return (
    // 상담요청 리스트 보여주는곳
    <>
      <List id={"noti-list"}>
        {otherUsersInfoList.map(
          (
            data: {
              socketId: string;
              roomId: string;
              counselType: string;
              userType: string;
            },
            index: number
          ) => {
            return (
              <ListItemWrapper key={index} onClick={() => handleJoinRoom(data)}>
                <NotiListItem button={true} key={index}>
                  {noticeSellector(data.counselType)}
                </NotiListItem>
                <div style={{ fontSize: "9px" }}>
                  {/* 요청자 아이디 */}
                  {`user ID : ${data.socketId}`}
                </div>
                <div style={{ fontSize: "9px" }}>
                  {/* 요청자 방 아이디 */}
                  {`room ID : ${data.roomId}`}
                </div>
              </ListItemWrapper>
            );
          }
        )}
      </List>
    </>
  );
};
export default NotiList;
