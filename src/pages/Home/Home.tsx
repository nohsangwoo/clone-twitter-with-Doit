import React, { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  limit,
  where,
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
const MarsonryWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const ItemWrapper = styled.div<{ GHEIGHT: string }>`
  height: ${props => {
    console.log("inside props.GHEIGHT", props.GHEIGHT);
    return props.GHEIGHT;
  }}px;
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
type Props = {};

const Home = (props: Props) => {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const limitIndex = useSelector(
    (state: RootState) => state.firebase.limitIndex
  );
  const [tweets, setTweets] = useState<any>([]);
  const [error, setError] = useState<Error>();

  const dispatch = useDispatch();
  const myTweetContents = useSelector(
    (state: RootState) => state.tweets.myTweet
  );

  useEffect(() => {
    console.log("myTweetContents", myTweetContents);
  }, [myTweetContents]);

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

  // const [limitIndex, setLimitIndex] = useState<number>(5);
  // 일반적인 데이터를 데이터베이스에서 가져오기
  // const getTweets = async () => {
  //   // 모든 트윗을 가져오게 하는 조건
  //   // 실시간은 아님
  //   const dbTweets = await (
  //     await getDocs(collection(getFirestore(), 'tweets'))
  //   ).docs;
  //   dbTweets.forEach(document => {
  //     // 데이터 삭제 등의 제어를 위해 각 데이터의 유니크 아이디를 추가 저장한다.
  //     const tweetObj = { ...document.data(), id: document.id };
  //     return setTweets((prev: any) => {
  //       // 불변성 지키면서 push 기능 수행
  //       return [tweetObj, ...prev];
  //     });
  //   });
  // };
  // useEffect(() => {
  //   console.log("myTweetContents,", myTweetContents);
  // }, [myTweetContents]);

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

  useEffect(() => {
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

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 2
  };

  const dummyTweetsObj: tweetObjType[] = [
    {
      id: "0",
      text: "test0",
      createdAt: "03019293",
      creatorId: "0",
      roomId: "room0",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "1",
      text: "test1",
      createdAt: "03019293",
      creatorId: "1",
      roomId: "room1",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "2",
      text: "test2",
      createdAt: "03019293",
      creatorId: "2",
      roomId: "room2",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "3",
      text: "test3",
      createdAt: "03019293",
      creatorId: "3",
      roomId: "room3",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "4",
      text: "test4",
      createdAt: "03019293",
      creatorId: "4",
      roomId: "room4",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "5",
      text: "test5",
      createdAt: "03019293",
      creatorId: "5",
      roomId: "room5",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "6",
      text: "test6",
      createdAt: "03019293",
      creatorId: "6",
      roomId: "room6",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "7",
      text: "test7",
      createdAt: "03019293",
      creatorId: "7",
      roomId: "room7",
      attachmentURL: "",
      uploadPath: ""
    },
    {
      id: "8",
      text: "test8",
      createdAt: "03019293",
      creatorId: "8",
      roomId: "room8",
      attachmentURL: "",
      uploadPath: ""
    }
  ];

  // Convert array to JSX items

  // const tweetsPresent = tweets.map((tweetObj: tweetObjType) => {
  const tweetsPresent = dummyTweetsObj.map((tweetObj: tweetObjType) => {
    const GET_HEIGHT = () => {
      const heights = [137, 194, 215, 222, 255, 264, 263, 314];
      const getHeight = (heights: Number[]) => {
        return heights[Math.floor(Math.random() * heights.length)];
      };
      const result = getHeight(heights);
      return result;
    };
    return (
      <>
        <Tweet
          key={tweetObj.id}
          tweetObj={tweetObj}
          // 내가 쓴 tweet만 제어하기 위한 조건
          isOwner={tweetObj.creatorId === userInfo.uid}
          getHeight={String(GET_HEIGHT())}
        />
      </>
    );
  });

  return (
    <>
      <TweetFactory />
      {/* <div>
        {tweets.map((tweetObj: tweetObjType) => {
          return (
            <Tweet
              key={tweetObj.id}
              tweetObj={tweetObj}
              // 내가 쓴 tweet만 제어하기 위한 조건
              isOwner={tweetObj.creatorId === userInfo.uid}
            />
          );
        })}
      </div> */}
      <button
        onClick={() => dispatch(firebaseSlice.actions.increaseLimitIndex(5))}
      >
        load more ...
      </button>
      <MarsonryWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {tweetsPresent}
        </Masonry>
      </MarsonryWrapper>
    </>
  );
};

export default Home;
