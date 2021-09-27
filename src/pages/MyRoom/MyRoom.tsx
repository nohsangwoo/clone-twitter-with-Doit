import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wss from "components/utils/wssConnection/wssConnection";
import styled from "styled-components";
import UserList from "./components/UserList";
// import ControlPanel from "components/utils/mediaUtils/ControlPanel";
import MediaControlContainer from "components/containers/MediaControlContainer";
// import Controller from "components/utils/controller/Controller";
import { useHistory } from "react-router-dom";
import { RootState } from "store/store";
import socketSlice from "store/reducers/socketSlice";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import ClientMainVideoViewer from "./components/ClientMainVideoViewer";
import toggleSlice from "store/reducers/toggleSlice";
import ControlPanel from "components/utils/mediaUtils/ControlPanel";

const MyRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const MainViewWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const UserListWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 80px;
  z-index: 10;
  /* border: 1px solid red; */
`;

type HandlieJoinRoomType = {
  socketId: string;
  roomId: string;
  counselType: string;
  userType: string;
};

const CloseBTN = styled.div`
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const SettingBTN = styled.div`
  cursor: pointer;
  position: fixed;
  top: 90px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
`;
interface Props {
  selectedRoomId: string;
}

const MyRoom = ({ selectedRoomId }: Props) => {
  const history = useHistory();

  const [chatOpen, setChatOpen] = useState(false);
  const [isShowControlPanel, setIsShowControlPanel] = useState<boolean>(false);
  const socketId = useSelector((state: RootState) => state?.socket?.socket?.id);
  const [error, setError] = useState<Error>();

  const myTweetContents = useSelector(
    (state: RootState) => state.tweets.myTweet
  );

  const setChatHandler = () => {
    setChatOpen(!chatOpen);
    console.log(chatOpen);
  };
  const dispatch = useDispatch();

  const handleJoinRoom = useCallback(
    roomId => {
      // let roomId = uuidV1();

      console.log("uuid", roomId);

      const data: HandlieJoinRoomType = {
        socketId: socketId,
        roomId,
        counselType: "Video",
        userType: "Client"
      };

      console.log("Join room Button activated", roomId);
      dispatch(socketSlice.actions.getRoomHostInfo(data));
      wss.joinRoom({ roomId: roomId });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [socketId]
  );

  const onDelete = async (docId: string, uploadPath: string) => {
    console.log("delete doc id", myTweetContents?.docId);
    await deleteDoc(doc(getFirestore(), "tweets", docId))
      .then(() => {
        console.log("Delete succeeded!");

        if (uploadPath !== "") {
          console.log("image delete progress!");

          const storage = getStorage();

          // Create a reference to the file to delete
          const desertRef = ref(storage, uploadPath);

          // Delete the file
          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log("File deleted successfully");
            })
            .catch(error => {
              // Uh-oh, an error occurred!
              console.log("Uh-oh, an error occurred!");
            });
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        console.log("finally");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  };

  useEffect(() => {
    // window.addEventListener("beforeunload", event => {
    //   // 표준에 따라 기본 동작 방지
    //   event.preventDefault();
    //   // Chrome에서는 returnValue 설정이 필요함
    //   event.returnValue = "ㅎㅎㅎㅎ";
    // });
    // console.log("나기기 확인 이벤트");
    console.log("useEffect 브라우저 종료 확인 동작 콘솔");

    // 웹 브라우저 윈도우 창 종료 이벤트
    window.addEventListener("unload", event => {
      event.preventDefault();
      console.log("브라우저 종료됨");
      if (myTweetContents) {
        onDelete(myTweetContents?.docId, myTweetContents?.uploadPath);
      }
    });
  });
  useEffect(() => {
    console.log("useEffect for location");

    if (selectedRoomId.length === 0) {
      history.push("/");
    }
  }, [history, selectedRoomId]);

  useEffect(() => {
    console.log("useEffect for joinRoom!");
    if (selectedRoomId) {
      console.log("location state 이 존재하니 자동으로 방접속", selectedRoomId);
      handleJoinRoom(selectedRoomId);
    }
  }, [selectedRoomId, handleJoinRoom]);

  useEffect(() => {
    console.log("useEffect for error");
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <MyRoomContainer>
      <CloseBTN
        onClick={() => {
          dispatch(toggleSlice.actions.setDisableMyRoom());
          if (myTweetContents) {
            onDelete(myTweetContents?.docId, myTweetContents?.uploadPath);
          }
        }}
      >
        close
      </CloseBTN>
      <SettingBTN onClick={() => setIsShowControlPanel(prev => !prev)}>
        settings
      </SettingBTN>

      <ControlPanel isShowControlPanel={String(isShowControlPanel)} />
      <MainViewWrapper>
        <ClientMainVideoViewer />
      </MainViewWrapper>

      {/* <Controller /> */}
      <UserListWrapper>
        <UserList />
      </UserListWrapper>
      <MediaControlContainer
        chatOpen={chatOpen}
        setChatHandler={setChatHandler}
      />
    </MyRoomContainer>
  );
};

export default MyRoom;
