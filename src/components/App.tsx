import React, { useState } from 'react';
import AppRouter from './Router';
import { auth } from 'fbase';
console.log(auth);

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
