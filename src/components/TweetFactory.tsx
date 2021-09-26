import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { useHistory } from "react-router-dom";
import * as wss from "components/utils/wssConnection/wssConnection";
import socketSlice from "store/reducers/socketSlice";
import tweetSlice from "store/reducers/tweetSlice";

export type locationStateType = {
  roomId: string;
};
type Props = {};

const TweetFactory = (props: Props) => {
  const history = useHistory();
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
        // 이 onloadened함수는 일종의 useEffect처럼 작동한다
        // readAsDataURL에 전달할 인자(사진파일)이 함수로 들어간 이후 결괏값이 나온 다음 상황을 감지하고
        // 이때 생긴 여러가지 이벤트값을 사용할수 있게 한다.
        // 이 이벤트중 그림파일을 표시할수있는 URL도 제공한다
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
      alert("이미 만들어진 방이 있습니다.");
      return;
    }
    let uuid = uuidv4();
    // tweet upload용 함수
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
        // firestore에 업로드 하는 방법(with javascript 9 version)
        const docRef = await addDoc(
          collection(getFirestore(), "tweets"),
          tweetContents
        );
        console.log("Document written with ID: ", docRef.id);

        dispatch(
          tweetSlice.actions.setMyTweet({ docId: docRef.id, ...tweetContents })
        );

        // 트윗이 만들어졌아면 myRoom으로 history.push 한다음
        // 내 고유 roomId로 joinroom 실행 하도록 바꿔야함
        // history.push("/myRoom");
        const locationState: locationStateType = { roomId: uuid };
        history.push({
          pathname: "/myRoom",
          // search: '?query=abc',
          state: locationState
        });
        // handleJoinRoom(uuid);
      } catch (err) {}
      clearAfterUpload();
    };

    // 업로드 경로 지정
    const storageRef = ref(storage, `${userInfo.uid}/${uuid}`);
    // console.log('outsid attachment?: ', attachment);
    const uploadPath = storageRef.fullPath;
    // console.log('storageRef.fullPath: ', storageRef.fullPath);
    // console.log('storageRef: ', storageRef);

    // 이미지가 없다면 그냥 트윗만 한다
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

  // 정리하는 부분
  const onClearAttachment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAttachment("");
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
  );
};

export default TweetFactory;
