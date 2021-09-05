import React from 'react';

type Props = {
  tweetObj: any;
  isOwner: boolean;
};
const Tweet = ({ tweetObj, isOwner }: Props) => {
  return (
    <div
      style={{ border: '1px solid black', margin: '10px 0', padding: '10px' }}
    >
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
