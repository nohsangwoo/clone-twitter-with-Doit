import React, { useEffect, useState } from "react";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const TweetContainer = styled.div`
  width: 238px;
`;
const TweetBGContainer = styled.div<{ getHeight: string; bgurl: string }>`
  display: flex;
  justify-content: center;
  width: 238px;
  height: ${props => props.getHeight}px;
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const TweetBGHolder = styled.div<{ getHeight: string; bgurl: string }>`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 0.5s;
  border-radius: 13px;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
`;
const ActiveButton = styled.button`
  margin-left: 3px;
  background: white;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 5px;
  transition: all 0.5s;

  &:active {
    transform: scale(0.95);
  }
`;
const TweetContents = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
  padding: 5px 0;
  position: relative;
  width: 100%;
  height: auto;
  background: white;
  color: #000;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
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
  useEffect(() => {
    console.log("use Effect error in Tweet");
    if (error) {
      alert(error);
    }
  }, [error]);
  const baseBgImage =
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d67d7.appspot.com/o/p-image%2Fp1.jpg?alt=media&token=e9193e29-7521-41c1-bc2a-a633fd546417";
  return (
    <TweetContainer>
      <TweetBGContainer
        getHeight={getHeight}
        bgurl={
          tweetObj.attachmentURL.length === 0
            ? baseBgImage
            : tweetObj.attachmentURL
        }
        onClick={handleConnectRoom}
      >
        <TweetBGHolder
          getHeight={getHeight}
          bgurl={tweetObj.attachmentURL || baseBgImage}
        ></TweetBGHolder>
      </TweetBGContainer>
      {/* 하단메뉴 */}
      <TweetContents>
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
            <div>{tweetObj.text}</div>
            {isOwner && (
              <ButtonWrapper>
                <ActiveButton onClick={toggleEditing}>Edit</ActiveButton>
                <ActiveButton onClick={onDelete}>Delete</ActiveButton>
              </ButtonWrapper>
            )}
          </>
        )}
      </TweetContents>
    </TweetContainer>
  );
};

export default Tweet;
