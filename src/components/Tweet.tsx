import React from 'react';

type Props = {
  tweetObj: any;
};
const Tweet = ({ tweetObj }: Props) => {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      <button>Delete Tweet</button>
      <button>Edit Tweet</button>
    </div>
  );
};

export default Tweet;
