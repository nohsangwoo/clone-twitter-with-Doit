import React, { useState, useEffect } from "react";
import AppRouter from "../routes/Router";
import authService, { auth } from "fbase";
import { useDispatch } from "react-redux";
import userSlice from "store/reducers/userSlice";

function App(): JSX.Element {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인된 정보가 저장된다면 로그인 이후의 처리를 위한 작업
    authService.onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          userSlice.actions.setUserInfo({
            uid: user.uid || "",
            displayName: user.displayName || ""
          })
        );
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
      {/* <footer>&copy;{new Date().getFullYear()} Twitter clone</footer> */}
    </>
  );
}

export default App;
