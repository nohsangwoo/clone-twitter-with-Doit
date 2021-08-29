import React, { useState } from 'react';
import AppRouter from './Router';

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
