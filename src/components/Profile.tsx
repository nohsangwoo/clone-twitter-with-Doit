import React, { useEffect } from 'react';
import authService, { auth } from 'fbase';
import { useHistory } from 'react-router';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  limit,
  where,
  orderBy,
} from 'firebase/firestore';
interface Props {
  userObj: any;
}
const Profile = ({ userObj }: Props) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut(auth);
    history.push('/');
  };

  // 실시간 아닌방식으로 DB가져오기
  const getMyTweet = async () => {
    // 각종 조건을 걸어서 데이터 가져오기(실시간이 아님)
    // 조건을 만들때마다 firebase 색인 추가 작업을 진행해줘야한다.
    const q = query(
      collection(getFirestore(), 'tweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'asc')
      // limit(25)
    );

    const documentSnapshots = await getDocs(q);

    const value = documentSnapshots.docs.map((doc, index) => {
      // console.log(index, 'doc: ', doc);
      return doc.data();
    });

    console.log('value: ', value);
  };

  useEffect(() => {
    getMyTweet();
  }, []);
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
      <button onClick={getMyTweet}>get query</button>
    </div>
  );
};

export default Profile;
