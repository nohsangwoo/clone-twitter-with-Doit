import React, { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  limit,
  deleteDoc,
  doc,
  Unsubscribe
  // startAt,
  // startAfter
} from "firebase/firestore";
import Tweet from "../../components/Tweet";
import TweetFactory from "components/TweetFactory";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import firebaseSlice from "store/reducers/firebaseSlice";
import { deleteObject, getStorage, ref } from "firebase/storage";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import "./masornyLayout.css";
// import GET_HEIGHT from "components/utils/getRandomHeigth";
import streamSlice from "store/reducers/streamSlice";
import { getMyDevices } from "store/actions/devicesActions";
import * as wss from "components/utils/wssConnection/wssConnection";
import MyRoom from "pages/MyRoom";
const HomeContainer = styled.div`
  width: 100%;
`;
const MarsonryWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const LoadMoreBTN = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  height: auto;
  min-width: 130px;
  padding: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
`;

type tweetObjType = {
  id: string;
  text: string;
  createdAt: string;
  creatorId: string;
  roomId: string;
  attachmentURL: string;
  uploadPath: string;
};

const MyRoomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: white;
  z-index: 10;
`;
type Props = {};

const Home = (props: Props) => {
  const limitIndex = useSelector(
    (state: RootState) => state.firebase.limitIndex
  );
  const selectedRoomId = useSelector(
    (state: RootState) => state.tweets.selectedRoomId
  );
  const isShowMyroom = useSelector(
    (state: RootState) => state.toggles.isShowMyroom
  );
  const [tweets, setTweets] = useState<any>([]);
  const [error, setError] = useState<Error>();
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const dispatch = useDispatch();
  const myTweetContents = useSelector(
    (state: RootState) => state.tweets.myTweet
  );

  useEffect(() => {
    console.log("useEffect for first connect");
    dispatch(streamSlice.actions.getMyStreamSagaTrigger());
    dispatch(getMyDevices());
    wss.connectWithWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
    console.log("useEffect for getquery");
    // getTweets();
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    // 여기에 각종 조건 넣어두기(정렬, 조건)
    const q = query(
      collection(getFirestore(), "tweets"),
      // where("creatorId", "!=", userInfo.uid),
      // orderBy("creatorId", "desc"),
      // 다음페이지 기준
      // where("createdAt", ">=", 0),
      orderBy("createdAt", "desc"),
      // startAfter(1632049101858),
      limit(limitIndex)
    );
    // docRef.id
    const unsubscribe: Unsubscribe = onSnapshot(q, querySnapshot => {
      const newArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setTweets(newArray);
    });

    return () => {
      unsubscribe();
    };
  }, [limitIndex]);

  useEffect(() => {
    console.log("useEffect for error");

    if (error) {
      alert(error);
    }
  }, [error]);

  const breakpointColumnsObj = {
    default: 5,
    1200: 4,
    1080: 3,
    815: 2,
    550: 1
  };

  // const dummyTweetsObj: tweetObjType[] = [
  //   {
  //     id: "0",
  //     text: "test0",
  //     createdAt: "03019293",
  //     creatorId: "0",
  //     roomId: "room0",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp1.jpg?alt=media&token=e9193e29-7521-41c1-bc2a-a633fd546417",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "1",
  //     text: "test1",
  //     createdAt: "03019293",
  //     creatorId: "1",
  //     roomId: "room1",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp2.jpg?alt=media&token=9f222b46-faf8-42b8-8e53-0bff44721d4a",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "2",
  //     text: "test2",
  //     createdAt: "03019293",
  //     creatorId: "2",
  //     roomId: "room2",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp3.jpg?alt=media&token=a1e3a287-2c0d-4bb3-9440-801136f7b370",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "3",
  //     text: "test3",
  //     createdAt: "03019293",
  //     creatorId: "3",
  //     roomId: "room3",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp4.jpg?alt=media&token=610cf30d-4464-4565-abdf-af6beab79f96",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "4",
  //     text: "test4",
  //     createdAt: "03019293",
  //     creatorId: "4",
  //     roomId: "room4",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp5.jpg?alt=media&token=b47bf9cc-5fa6-4644-8a04-033eded2329b",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "5",
  //     text: "test5",
  //     createdAt: "03019293",
  //     creatorId: "5",
  //     roomId: "room5",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp6.jpg?alt=media&token=4e9ebbc7-eb03-42df-bcf1-53cf2839ce01",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "6",
  //     text: "test6",
  //     createdAt: "03019293",
  //     creatorId: "6",
  //     roomId: "room6",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp7.jpg?alt=media&token=bc3d5644-5d1b-4376-b182-1167e74aa75e",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "7",
  //     text: "test7",
  //     createdAt: "03019293",
  //     creatorId: "7",
  //     roomId: "room7",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp8.jpg?alt=media&token=4a6be246-2fba-43fa-8d48-176bb4874f39",
  //     uploadPath: ""
  //   },
  //   {
  //     id: "8",
  //     text: "test8",
  //     createdAt: "03019293",
  //     creatorId: "8",
  //     roomId: "room8",
  //     attachmentURL:
  //       "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp9.jpg?alt=media&token=68a5f820-591b-49b7-9234-98ecc79dfdf4",
  //     uploadPath: ""
  //   }
  // ];
  useEffect(() => {
    console.log("isShowMyroom in home", isShowMyroom);
  }, [isShowMyroom]);

  // Convert array to JSX items

  // const tweetsPresent = tweets.map((tweetObj: tweetObjType) => {
  const tweetsPresent = tweets.map((tweetObj: tweetObjType) => {
    const GET_HEIGHT = () => {
      const heights = [
        130, 175, 238, 236, 296, 316, 325, 335, 354, 369, 374, 420, 467, 497
      ];
      const getHeight = (heights: Number[]) => {
        return heights[Math.floor(Math.random() * heights.length)];
      };
      const result = getHeight(heights);
      return result;
    };

    return (
      <Tweet
        key={tweetObj.id}
        tweetObj={tweetObj}
        // 내가 쓴 tweet만 제어하기 위한 조건
        isOwner={tweetObj.creatorId === userInfo.uid}
        // isOwner={true}
        getHeight={String(GET_HEIGHT())}
      />
    );
  });

  return (
    <HomeContainer>
      <TweetFactory />
      <MarsonryWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {tweetsPresent}
        </Masonry>
      </MarsonryWrapper>
      <LoadMoreWrapper>
        <LoadMoreBTN
          onClick={() => dispatch(firebaseSlice.actions.increaseLimitIndex(5))}
        >
          more ...
        </LoadMoreBTN>
      </LoadMoreWrapper>
      {isShowMyroom && (
        <MyRoomContainer>
          <MyRoom selectedRoomId={selectedRoomId} />
        </MyRoomContainer>
      )}
    </HomeContainer>
  );
};

export default Home;
