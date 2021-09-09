import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import Tweet from './../components/Tweet';
type Props = {
  userObj: any;
};
const Home = ({ userObj }: Props) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<any>([]);
  const [attachment, setAttachment] = useState<
    string | ArrayBuffer | null | undefined
  >('');
  const [selectedFile, setSelectedFile] = useState();
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

    const q = query(
      collection(getFirestore(), 'tweets'),
      // where('text', '==', 'hehe')
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const newArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTweets(newArray);
    });

    return () => {
      unsubscribe();
    };
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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let theFile;
    const {
      currentTarget: { files },
    } = event;
    console.log(files);

    if (files) {
      theFile = files[0];
    }
    const reader = new FileReader();

    if (theFile) {
      reader.readAsDataURL(theFile);
    }

    // 이 onloadened함수는 일종의 useEffect처럼 작동한다
    // readAsDataURL에 전달할 인자(사진파일)이 함수로 들어간 이후 결괏값이 나온 다음 상황을 감지하고
    // 이때 생긴 여러가지 이벤트값을 사용할수 있게 한다.
    // 이 이벤트중 그림파일을 표시할수있는 URL도 제공한다
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const result = finishedEvent.target?.result;
      setAttachment(result);
    };
  };

  const onClearAttachment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAttachment('');
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <img
            src={String(attachment)}
            width="50px"
            height="50px"
            alt="selected_picture"
          />
        )}
        <button onClick={onClearAttachment}>Clear</button>
      </form>
      <div>
        {tweets.map((tweetObj: any) => {
          return (
            <Tweet
              key={tweetObj.id}
              tweetObj={tweetObj}
              // 내가 쓴 tweet만 제어하기 위한 조건
              isOwner={tweetObj.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
