import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import basePalette from './theme';
import UserContext from './components/Firebase';
import ClocksContext from './components/Stimulator/Clocks';
import UrlNavigation from './components/UrlNavigation';


function App() {
  let userRef = useRef(useContext(UserContext));
  let clocksRef = useRef(useContext(ClocksContext));
  let [, setIsAuth] = useState(0);
  let [theme, setTheme] = useState({ palette: { ...basePalette, type: userRef.current.getTheme() } });

  let handleThemeChange = useCallback((newTheme) => {
    setTheme({ palette: { ...basePalette, type: newTheme } });
  }, []);

  let handleFailedAuth = useCallback((e) => {
    console.log('Mio Alert: ' + e);
  }, []);

  let handleAuthChange = useCallback((isLogged) => {
    if (isLogged) {
      clocksRef.current.initializeClocks(userRef.current.getClocks());
      handleThemeChange(userRef.current.getTheme());
    }
    setIsAuth(isLogged);
  }, [handleThemeChange]);

  useEffect(() => {
    let user = userRef.current;
    user.activateAuthUserListener(handleAuthChange, handleFailedAuth);
    user.handleThemeChange = handleThemeChange;
    return () => user.deactivateAuthUserListener()
  }, [handleAuthChange, handleThemeChange, handleFailedAuth]);


  return (
    <ThemeProvider theme={responsiveFontSizes(createMuiTheme(theme))}>
      <CssBaseline />
      <UrlNavigation />
    </ThemeProvider>
  );
}

export default App;
