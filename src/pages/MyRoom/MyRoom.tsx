import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyDevices } from "store/actions/devicesActions";
import * as wss from "components/utils/wssConnection/wssConnection";
import streamSlice from "store/reducers/streamSlice";
import styled from "styled-components";
import UserList from "./components/UserList";
import ControlPanel from "components/utils/mediaUtils/ControlPanel";
import MediaControlContainer from "components/containers/MediaControlContainer";
import Controller from "components/utils/controller/Controller";
import { useHistory, useLocation } from "react-router-dom";
import { RootState } from "store/store";
import socketSlice from "store/reducers/socketSlice";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

type locationStateType = {
  roomId: string;
};
const UserListWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 80px;
  border: 1px solid red;
`;

type HandlieJoinRoomType = {
  socketId: string;
  roomId: string;
  counselType: string;
  userType: string;
};

interface Props {}

const MyRoom = (props: Props) => {
  const history = useHistory();
  const location = useLocation<locationStateType>();
  const [chatOpen, setChatOpen] = useState(false);
  const socketId = useSelector((state: RootState) => state?.socket?.socket?.id);
  const [error, setError] = useState<Error>();
  const otherStream = useSelector(
    (state: RootState) => state.streams.otherStream
  );
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

      console.log("Join room Button activated");
      dispatch(socketSlice.actions.getRoomHostInfo(data));
      wss.joinRoom({ roomId: roomId });
    },

    [socketId, dispatch]
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
      .finally(() => console.log("finally"));
  };

  useEffect(() => {
    if (!location?.state?.roomId) {
      history.push("/");
    }
  }, [history, location]);

  useEffect(() => {
    dispatch(streamSlice.actions.getMyStreamSagaTrigger());
    dispatch(getMyDevices());
    wss.connectWithWebSocket();
  }, [dispatch]);

  useEffect(() => {
    if (location?.state?.roomId) {
      console.log(
        "location state 이 존재하니 자동으로 방접속",
        location.state.roomId
      );
      handleJoinRoom(location.state.roomId);
    }
  }, [otherStream, location, handleJoinRoom]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    // window.addEventListener("beforeunload", event => {
    //   // 표준에 따라 기본 동작 방지
    //   event.preventDefault();
    //   // Chrome에서는 returnValue 설정이 필요함
    //   event.returnValue = "ㅎㅎㅎㅎ";
    // });
    // console.log("나기기 확인 이벤트");

    // 웹 브라우저 윈도우 창 종료 이벤트
    window.addEventListener("unload", event => {
      event.preventDefault();
      console.log("브라우저 종료됨");
      if (myTweetContents) {
        onDelete(myTweetContents?.docId, myTweetContents?.uploadPath);
      }
    });
  });
  return (
    <div>
      <ControlPanel />
      <Controller />
      <UserListWrapper>
        <UserList />
      </UserListWrapper>
      <MediaControlContainer
        chatOpen={chatOpen}
        setChatHandler={setChatHandler}
      />
    </div>
  );
};

export default MyRoom;
