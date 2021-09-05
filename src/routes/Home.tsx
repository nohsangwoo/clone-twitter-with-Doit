import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

type Props = {
  userObj: any;
};
const Home = ({ userObj }: Props) => {
  const [tweet, setTweet] = useState('');
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

    // orderBy('tweets');
    // query()
    onSnapshot(collection(getFirestore(), 'tweets'), snapShot => {
      console.log(snapShot.docs);
      orderBy('desc');

      const newArray = snapShot.docs.map((document: any) => {
        return {
          id: document.id,
          ...document.data(),
        };
      });

      setTweets(newArray);
    });

    return () => {};
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // firestore에 업로드 하는 방법(with javascript 9 version)
      const docRef = await addDoc(collection(getFirestore(), 'tweets'), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (err) {}
    setTweet('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {
      currentTarget: { value },
    } = event;
    setTweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet: any, index: number) => {
          return (
            <div key={tweet.id}>
              <h4>{tweet.text}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
