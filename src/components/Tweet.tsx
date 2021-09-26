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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import socketSlice from "store/reducers/socketSlice";
import * as wss from "components/utils/wssConnection/wssConnection";
import { useHistory } from "react-router-dom";
const TweetContainer = styled.div``;

const TweetViewerWrapper = styled.div`
  border: 2px solid blue;
  cursor: pointer;
  transition: 0.5s all;
  &:active {
    transform: scale(0.9);
  }
`;

type HandlieJoinRoomType = {
  socketId: string;
  roomId: string;
  counselType: string;
  userType: string;
};

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
};
const Tweet = ({ tweetObj, isOwner }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState<Error>();
  const [editing, setEditing] = useState<boolean>(false);
  const [newTweet, setNewTweet] = useState<string>("");
  const socketId = useSelector((state: RootState) => state?.socket?.socket?.id);

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

  return (
    <TweetContainer
      style={{ border: "1px solid black", margin: "10px 0", padding: "10px" }}
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
            {tweetObj.attachmentURL && (
              <img
                src={tweetObj.attachmentURL}
                width="50px"
                height="50px"
                alt="tweet"
              />
            )}
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
