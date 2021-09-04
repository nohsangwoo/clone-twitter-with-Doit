import React from 'react';
import authService, { auth } from 'fbase';
import { useHistory } from 'react-router';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut(auth);
    history.push('/');
  };
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
