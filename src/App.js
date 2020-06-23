import React, { useState, useEffect, useContext, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import basePalette from './theme';
import UserContext from './components/Firebase';
import UrlNavigation from './components/UrlNavigation';

export default function App() {
  let userRef = useRef(useContext(UserContext));
  let [, setIsAuth] = useState(0);
  let [theme, setTheme] = useState({ palette: { ...basePalette, type: userRef.current.info.theme } });

  useEffect(() => {
    let user = userRef.current;
    user.activateAuthUserListener(handleAuthChange, handleFailedAuth);
    user.handleThemeChange = handleThemeChange;
    return () => user.deactivateAuthUserListener()
  }, []);

  function handleAuthChange(isLogged) {
    setIsAuth(isLogged);
    handleThemeChange(userRef.current.info.theme)
  }

  function handleThemeChange(newTheme) {
    setTheme({ palette: { ...basePalette, type: newTheme } });
  }

  function handleFailedAuth(e) {
    alert(e);
  }

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      {/* <UserContext.Provider value={userRef.current}> */}
      <UrlNavigation />
      {/* </UserContext.Provider> */}
    </ThemeProvider>
  );
}
