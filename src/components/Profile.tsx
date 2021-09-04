import React from 'react';
import authService, { auth } from 'fbase';
const Profile = () => {
  const onLogOutClick = () => authService.signOut(auth);
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
