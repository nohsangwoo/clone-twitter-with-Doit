import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

// import {} from "firebase/firebase/store"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import tweetSlice from "store/reducers/tweetSlice";
import styled from "styled-components";
import toggleSlice from "store/reducers/toggleSlice";

const TweetFactoryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const TweetForm = styled.form``;

const MainActiveWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const TweetText = styled.input`
  width: 100%;
  padding: 5px;
  border: 0.1px solid gray;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ClearButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const FileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const FileInputBox = styled.input`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid gray;
  background: white;
  border-radius: 5px;
  height: 100%;
  cursor: pointer;
`;

// type locationStateType = {
//   roomId: string;
// };

type Props = {};

const TweetFactory = (props: Props) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const [attachmentFB, setAttachmentFB] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const myTweetContents = useSelector(
    (state: RootState) => state?.tweets.myTweet
  );

  // Create a root reference
  const storage = getStorage();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let theFile;
    const {
      currentTarget: { files }
    } = event;
    console.log(files);

    if (files) {
      theFile = files[0];
    }

    // for image rendering
    (function () {
      const reader = new FileReader();
      if (theFile) {
        reader.readAsDataURL(theFile);
        // ??? onloadened????????? ????????? useEffect?????? ????????????
        // readAsDataURL??? ????????? ??????(????????????)??? ????????? ????????? ?????? ???????????? ?????? ?????? ????????? ????????????
        // ?????? ?????? ???????????? ??????????????? ???????????? ?????? ??????.
        // ??? ???????????? ??????????????? ?????????????????? URL??? ????????????
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
          // const base64 = reader.result;
          // console.log('base64', typeof base64);
          const result = finishedEvent.target?.result;
          console.log("result", result);
          setAttachment(result);
        };
      }
    })();

    // for firebase upload
    (function () {
      const reader = new FileReader();
      if (theFile) {
        reader.readAsArrayBuffer(theFile);
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
          const result = finishedEvent.target?.result;
          console.log("result", result);
          setAttachmentFB(result);
        };
      }
    })();
  };

  const clearAfterUpload = () => {
    setTweet("");
    setAttachment("");
    setAttachmentFB(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (myTweetContents) {
      alert("?????? ???????????? ?????? ????????????.");
      return;
    }
    let uuid = uuidv4();
    // tweet upload??? ??????
    type data = {
      downloadURL?: string;
      uploadPath?: string;
    };
    const uploadTweet = async (data?: data) => {
      // tweet upload with downloadURL(images)
      try {
        const tweetContents = {
          text: tweet,
          createdAt: Date.now(),
          creatorId: userInfo.uid,
          roomId: uuid,
          attachmentURL: data?.downloadURL || "",
          uploadPath: data?.uploadPath || ""
        };
        // firestore??? ????????? ?????? ??????(with javascript 9 version)
        const docRef = await addDoc(
          collection(getFirestore(), "tweets"),
          tweetContents
        );
        console.log("Document written with ID: ", docRef.id);

        dispatch(
          tweetSlice.actions.setMyTweet({ docId: docRef.id, ...tweetContents })
        );

        dispatch(tweetSlice.actions.setSelectedRoomId(uuid));

        // ????????? ?????????????????? myRoom?????? history.push ?????????
        // ??? ?????? roomId??? joinroom ?????? ????????? ????????????
        // history.push("/myRoom");
        // const locationState: locationStateType = { roomId: uuid };
        // history.push({
        //   pathname: "/myRoom",
        //   // search: '?query=abc',
        //   state: locationState
        // });

        dispatch(toggleSlice.actions.setShowMyRoom());

        // <MyRoom selectedRoomId={selectedRoomId} />;
      } catch (err) {}
      clearAfterUpload();
    };

    // ????????? ?????? ??????
    const storageRef = ref(storage, `${userInfo.uid}/${uuid}`);
    // console.log('outsid attachment?: ', attachment);
    const uploadPath = storageRef.fullPath;
    // console.log('storageRef.fullPath: ', storageRef.fullPath);
    // console.log('storageRef: ', storageRef);

    // ???????????? ????????? ?????? ????????? ??????
    console.log("storageRef", storageRef);

    if (!attachmentFB) {
      console.log("just tweet upload");
      uploadTweet();
      return;
    }

    if (attachmentFB instanceof ArrayBuffer) {
      console.log("tweet upload with image");

      console.log("attachmentFB", attachmentFB);

      const uploadTask = uploadBytesResumable(storageRef, attachmentFB);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            console.log("File available at", downloadURL, uploadPath);
            const data = {
              downloadURL,
              uploadPath
            };
            uploadTweet(data);
          });
        }
      );
    }

    // upload with Data URL string
    // if (typeof attachment === 'string') {
    //   uploadString(storageRef, attachment, 'data_url').then(snapshot => {
    //     console.log('Uploaded a data_url string!', snapshot);
    //   });
    // }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {
      currentTarget: { value }
    } = event;
    setTweet(value);
  };

  // ???????????? ??????
  const onClearAttachment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAttachment("");
  };

  return (
    <TweetFactoryContainer>
      <TweetForm onSubmit={onSubmit}>
        <MainActiveWrapper>
          <TweetText
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <SubmitButton type="submit" value="tweet" />
          <ClearButton onClick={onClearAttachment}>Clear</ClearButton>
        </MainActiveWrapper>
        <FileBox>
          <FileInputBox type="file" accept="image/*" onChange={onFileChange} />
          {attachment && (
            <img
              src={String(attachment)}
              width="50px"
              height="100%"
              alt="selected_picture"
            />
          )}
        </FileBox>
      </TweetForm>
    </TweetFactoryContainer>
  );
};

export default TweetFactory;
