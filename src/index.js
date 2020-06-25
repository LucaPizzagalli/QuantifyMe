import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserContext, { User } from './components/Firebase';

ReactDOM.render(
  // <React.StrictMode>
  <React.Fragment>
    <UserContext.Provider value={new User()}>
      <App />
    </UserContext.Provider>
    {/* </React.StrictMode>, */}
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.register();
