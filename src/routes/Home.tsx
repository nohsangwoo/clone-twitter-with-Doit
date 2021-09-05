import React, { useState, useEffect } from 'react';
import { addDoc, collection, getFirestore, getDocs } from 'firebase/firestore';
const Home = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<any>([]);
  const getTweets = async () => {
    // 모든 트윗을 가져오게 하는 조건
    // 실시간은 아님
    const dbTweets = await (
      await getDocs(collection(getFirestore(), 'tweets'))
    ).docs;
    dbTweets.forEach(document =>
      setTweets((prev: any) => {
        // 불변성 지키면서 push 기능 수행
        return [document.data(), ...prev];
      })
    );
  };
  useEffect(() => {
    getTweets();
  }, []);

  console.log('tweets?: ', tweets);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // firestore에 업로드 하는 방법(with javascript 9 version)
      const docRef = await addDoc(collection(getFirestore(), 'tweets'), {
        text: tweet,
        createdAt: Date.now(),
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
  );
};

export default Home;
