// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-analytics.js"></script>

import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class User {
  constructor() {
    app.initializeApp(firebaseConfig);
    //   firebase.analytics();
    this.configAuth = app.auth();
    this.auth = 0;
    this.info = null;
    this.db = app.firestore();
    this.authListener = null;
  }

  isLogged() {
    return !!this.auth;
  }

  activateAuthUserListener(HandleUserAuthChange, handleFailedAuth) {
    this.authListener = this.configAuth.onAuthStateChanged(authUser => {
      this.auth = authUser;
      if (authUser) {
        this.getDb().get()
          .then((doc) => {
            if (doc.exists) {
              this.info = doc.data();
            }
            else {
              this.info = { email: authUser.email, metrics: [], level: 1 }
              this.db.doc('users/' + authUser.uid).set(
                { ...this.info, level: 2 },
                { merge: true })
            }
          })
          .then(() =>
            HandleUserAuthChange(true)
          )
          .catch((e) =>
            handleFailedAuth(e)
          )
      }
      else
        HandleUserAuthChange(false);
    });
  }

  deactivateAuthUserListener() {
    this.authListener();
  }

  getDb() {
    return this.db.doc('users/' + this.auth.uid);
  }

  getWelcomeMessage() {
    if (this.info.level === 1)
      return 'Welcome for the first time to QuantifyMe';
    else if (this.info.level === 2)
      return 'Welcome back to QuantifyMe';
  }
}

let UserContext = React.createContext(null);

export default UserContext;
export { User };

