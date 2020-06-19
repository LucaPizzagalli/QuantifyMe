import React, { useState, useEffect, useContext, useRef } from 'react';
import UserContext from './components/Firebase';
import UrlNavigation from './components/UrlNavigation';

export default function App() {
  let userRef = useRef(useContext(UserContext));
  let [, setIsAuth] = useState(0)

  useEffect(() => {
    let user = userRef.current;
    user.activateAuthUserListener(handleAuthChange, handleFailedAuth);
    return () => user.deactivateAuthUserListener()
  }, []);

  function handleAuthChange(isLogged) {
    setIsAuth(isLogged);
  }

  function handleFailedAuth(e) {
    alert(e);
  }

  return (
    <UserContext.Provider value={userRef.current}>
      <UrlNavigation />
    </UserContext.Provider>
  );
}
