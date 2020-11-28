import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import basePalette from './theme';
import UserContext from './components/Firebase';
import UrlNavigation from './components/UrlNavigation';


let typographyTheme = responsiveFontSizes(createMuiTheme());


function App() {
  let userRef = useRef(useContext(UserContext));
  let [, setIsAuth] = useState(0);
  let [theme, setTheme] = useState({ palette: { ...basePalette, type: userRef.current.info.theme } });

  let handleThemeChange = useCallback((newTheme) => {
    setTheme({ palette: { ...basePalette, type: newTheme } });
  }, []);

  let handleFailedAuth = useCallback((e) => {
    console.log('Mio Alert:' + e);
  }, []);

  let handleAuthChange = useCallback((isLogged) => {
    setIsAuth(isLogged);
    handleThemeChange(userRef.current.info.theme)
  }, [handleThemeChange]);

  useEffect(() => {
    let user = userRef.current;
    user.activateAuthUserListener(handleAuthChange, handleFailedAuth);
    user.handleThemeChange = handleThemeChange;
    return () => user.deactivateAuthUserListener()
  }, [handleAuthChange, handleThemeChange, handleFailedAuth]);


  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <ThemeProvider theme={typographyTheme}>
        <CssBaseline />
        <UrlNavigation />
      </ThemeProvider>
    </ThemeProvider>
  );
}

export default App;
