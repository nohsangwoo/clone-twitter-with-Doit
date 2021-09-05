import React, { useState } from 'react';
import { deleteDoc, getFirestore, doc, updateDoc } from 'firebase/firestore';
type Props = {
  tweetObj: any;
  isOwner: boolean;
};
const Tweet = ({ tweetObj, isOwner }: Props) => {
  const [error, setError] = useState<Error>();
  const [editing, setEditing] = useState<boolean>(false);
  const [newTweet, setNewTweet] = useState();
  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const ok = window.confirm('삭제 하시겠습니까?');
    if (ok) {
      // implement delete function
      //   console.log('tweetObj', tweetObj.id);
      //   doc("컬렉션이름", "문서이름")
      await deleteDoc(doc(getFirestore(), 'tweets', tweetObj.id))
        .then(() => console.log('Delete succeeded!'))
        .catch(error => {
          setError(error.message);
        })
        .finally(() => console.log('finally'));
    }
  };

  const toggleEditing = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditing((prev: any) => !prev);
  };
  return (
    <div
      style={{ border: '1px solid black', margin: '10px 0', padding: '10px' }}
    >
      {editing ? (
        <>
          <form>
            <input value={newTweet} required />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
