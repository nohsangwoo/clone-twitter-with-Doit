import React, { useCallback, useState } from "react";
import {
  deleteDoc,
  getFirestore,
  doc,
  updateDoc
  //   setDoc,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
const TweetContainer = styled.div<{ getHeight: string; bgurl: string }>`
  display: flex;
  justify-content: center;
  width: 238px;
  height: ${props => props.getHeight}px;
  border: 1px solid black;
  padding: 5px;
  background-color: white;
  border-radius: 13px;
  position: relative;

  background-image: url(${props => props.bgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  /* background: black; ; */
`;

const TweetViewerWrapper = styled.div`
  border: 2px solid blue;
  cursor: pointer;
  transition: 0.5s all;
  &:active {
    transform: scale(0.9);
  }
`;

type locationStateType = {
  roomId: string;
};

type tweetObjType = {
  id: string;
  text: string;
  createdAt: string;
  creatorId: string;
  roomId: string;
  attachmentURL: string;
  uploadPath: string;
};
type Props = {
  tweetObj: tweetObjType;
  isOwner: boolean;
  getHeight: string;
};
const Tweet = ({ tweetObj, isOwner, getHeight }: Props) => {
  const history = useHistory();
  const [error, setError] = useState<Error>();
  const [editing, setEditing] = useState<boolean>(false);
  const [newTweet, setNewTweet] = useState<string>("");

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("delete doc id", tweetObj.id);
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      // implement delete function
      //   console.log('tweetObj', tweetObj.id);
      //   doc("컬렉션이름", "문서이름")
      await deleteDoc(doc(getFirestore(), "tweets", tweetObj.id))
        .then(() => {
          console.log("Delete succeeded!");

          if (tweetObj.uploadPath !== "") {
            console.log("image delete progress!");

            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, tweetObj.uploadPath);

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
    }
  };

  const toggleEditing = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditing((prev: any) => !prev);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;

    setNewTweet(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(tweetObj.id, newTweet);
    // Create an initial document to update.
    // getFirestore(), 컬렉션이름, 도큐먼트이름
    const frankDocRef = doc(getFirestore(), "tweets", tweetObj.id);
    await updateDoc(frankDocRef, {
      text: newTweet
    });
    setEditing(false);
  };

  const handleConnectRoom = () => {
    console.log(tweetObj);

    const locationState: locationStateType = { roomId: tweetObj.roomId };
    history.push({
      pathname: "/myRoom",
      // search: '?query=abc',
      state: locationState
    });
  };

  const baseBgImage = "";

  return (
    <TweetContainer
      getHeight={getHeight}
      bgurl={tweetObj.attachmentURL || baseBgImage}
    >
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input value={newTweet} onChange={onChange} required />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <TweetViewerWrapper onClick={handleConnectRoom}>
            <h4>{tweetObj.text}</h4>
          </TweetViewerWrapper>
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </TweetContainer>
  );
};

export default Tweet;
