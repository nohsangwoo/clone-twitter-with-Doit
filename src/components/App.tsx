import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import authService, { auth } from 'fbase';
// console.log(auth);

function App(): JSX.Element {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<authService.User | null>(
    auth.currentUser
  );
  const [userObj, setUserObj] = useState<any>(null);

  useEffect(() => {
    // 로그인된 정보가 저장된다면 로그인 이후의 처리를 위한 작업
    authService.onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'initializing...'
      )}
      <footer>&copy;{new Date().getFullYear()} Twitter clone</footer>
    </>
  );
}

export default App;
