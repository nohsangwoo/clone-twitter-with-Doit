import React, { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import Tweet from "./../components/Tweet";
import TweetFactory from "components/TweetFactory";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

type Props = {};
const Home = (props: Props) => {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const [tweets, setTweets] = useState<any>([]);

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
  useEffect(() => {
    // getTweets();
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    // 여기에 각종 조건 넣어두기(정렬, 조건)
    const q = query(
      collection(getFirestore(), "tweets"),
      // where('text', '==', 'hehe')
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
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
  }, []);

  return (
    <>
      <TweetFactory />
      <div>
        {tweets.map((tweetObj: any) => {
          return (
            <Tweet
              key={tweetObj.id}
              tweetObj={tweetObj}
              // 내가 쓴 tweet만 제어하기 위한 조건
              isOwner={tweetObj.creatorId === userInfo.uid}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
