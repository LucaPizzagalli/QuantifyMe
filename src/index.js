import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserContext, { User } from './components/Firebase';
import ClocksContext, { Clocks } from './components/Stimulator/Clocks';

ReactDOM.render(
  // <React.StrictMode>
  <React.Fragment>
    <UserContext.Provider value={new User()}>
      <ClocksContext.Provider value={new Clocks()}>
        <App />
      </ClocksContext.Provider>
    </UserContext.Provider>
    {/* </React.StrictMode>, */}
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.register();
