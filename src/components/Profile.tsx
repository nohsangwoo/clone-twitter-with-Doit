import React, { useState } from "react";
import authService, { auth } from "fbase";
import { useHistory } from "react-router";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy
// } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styled from "styled-components";

const ProfileContainer = styled.div`
  position: relative;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const UpdateProfileText = styled.input`
  background: white;
  border: none;
  &:focus {
    outline: none;
  }
  border-bottom: 1px solid gray;
`;

const UpdateProfileBTN = styled.button`
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const LogoutBTN = styled.button`
  margin-top: 200px;
  background: white;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
  width: 100px;
  height: 100px;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.12);
  }
  &:active {
    transform: scale(0.98);
  }
`;
interface Props {
  refreshUser: () => void;
}
const Profile = ({ refreshUser }: Props) => {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userInfo.displayName || ""
  );

  const onLogOutClick = () => {
    authService.signOut(auth);
    history.push("/");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit activated");

    // 무분별한 업데이트를 막기위한 안전장치
    if (userInfo.displayName !== newDisplayName) {
      console.log("submit activated firt condition", auth.currentUser);

      if (auth.currentUser !== null) {
        console.log("submit activated firt second condition");
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName
          // photo url업데이트는 optional
          // photoURL: 'https://example.com/jane-q-user/profile.jpg',
        })
          .then(() => {
            // Profile updated!
            console.log("Profile updated!");
            // redux를 사용하여 userInfo를 캐싱하고 캐싱된 내용중 displayName을 업데이트 해준다
            // or 다른 방법을 강구
            refreshUser();
          })
          .catch(error => {
            // An error occurred
            console.log("An error occurred");
          });
      }
    }
  };

  // 실시간 아닌방식으로 DB가져오기
  // const getMyTweet = async () => {
  //   // 각종 조건을 걸어서 데이터 가져오기(실시간이 아님)
  //   // 조건을 만들때마다 firebase 색인 추가 작업을 진행해줘야한다.
  //   const q = query(
  //     collection(getFirestore(), "tweets"),
  //     where("creatorId", "==", userInfo.uid),
  //     orderBy("createdAt", "asc")
  //     // limit(25)
  //   );

  //   const documentSnapshots = await getDocs(q);

  //   const value = documentSnapshots.docs.map((doc, index) => {
  //     // console.log(index, 'doc: ', doc);
  //     return doc.data();
  //   });

  //   console.log("value: ", value);
  // };

  return (
    <ProfileContainer>
      <form onSubmit={onSubmit}>
        <UpdateProfileText
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <UpdateProfileBTN>Update Profile</UpdateProfileBTN>
      </form>

      <LogoutBTN onClick={onLogOutClick}>Log Out</LogoutBTN>
      {/* <button onClick={getMyTweet}>get query</button> */}
    </ProfileContainer>
  );
};

export default Profile;
