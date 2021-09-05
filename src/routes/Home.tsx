import React, { useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
const Home = () => {
  const [tweet, setTweet] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
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
