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
  let [themeType, setThemeType] = useState(userRef.current.getTheme());
  let [themeSpacing, setThemeSpacing] = useState(3);

  let handleThemeChange = useCallback((newThemeType) => {
    setThemeType(newThemeType);
  }, []);

  let handleAuthChange = useCallback((isLogged) => {
    if (isLogged) {
      clocksRef.current.initializeClocks(userRef.current.getClocks());
      handleThemeChange(userRef.current.getTheme());
    }
    setIsAuth(isLogged);
  }, [handleThemeChange]);

  let handleFailedAuth = useCallback((e) => {
    console.log('Mio Alert: ' + e);
  }, []);

  let handleResize = useCallback(() => {
    setThemeSpacing(window.innerWidth < 650 ? 3 : 8);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    let user = userRef.current;
    user.activateAuthUserListener(handleAuthChange, handleFailedAuth);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      user.deactivateAuthUserListener();
    }
  }, [handleAuthChange, handleResize, handleFailedAuth]);

  return (
    <ThemeProvider theme={responsiveFontSizes(createMuiTheme(
      {
        palette: { ...basePalette, type: themeType },
        spacing: themeSpacing,
      }
    ))}>
      <CssBaseline />
      <UrlNavigation changeTheme={handleThemeChange}/>
    </ThemeProvider>
  );
}

export default App;
