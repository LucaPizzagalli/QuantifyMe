// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-analytics.js"></script>

import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

let startInfo = {
  email: null,
  personal: {},
  level: 1,
  metrics: [],
  timers: [],
  theme: 'light'
};

class User {
  constructor() {
    app.initializeApp(firebaseConfig);
    //   firebase.analytics();
    this.configAuth = app.auth();
    this.auth = 0;
    this.db = app.firestore();
    this.authListener = null;
    this.info = { theme: 'light' };
    this.handleThemeChange = null;
  }

  // Authentication
  isLogged() {
    return !!this.auth;
  }

  activateAuthUserListener(HandleUserAuthChange, handleError) {
    this.authListener = this.configAuth.onAuthStateChanged(authUser => {
      this.auth = authUser;
      if (authUser) {
        this.getDb().get()
          .then((doc) => {
            if (doc.exists) {
              this.info = doc.data();
            }
            else {
              this.info = startInfo;
              this.info.email = authUser.email;
              this.db.doc('users/' + authUser.uid).set(
                { ...this.info, level: 2 },
                { merge: true })
            }
          })
          .then(() => HandleUserAuthChange(true) )
          .catch((e) => handleError(e) )
      }
      else
        HandleUserAuthChange(false);
    });
  }

  deactivateAuthUserListener() {
    this.authListener();
  }

  // Database operations
  getDb() {
    return this.db.doc('users/' + this.auth.uid);
  }

  // Metrics operations
  getMetrics() {
    return this.info.metrics;
  }

  updateMetrics(newMetrics, addedMetric, deletedMetric, handleSuccess, handleError) {
    let promises = [this.getDb().update({ metrics: newMetrics })];
    if (addedMetric)
      promises.push(
        this.getDb().collection('stats').doc(addedMetric).set({ data: {} })
      );
    if (deletedMetric)
      promises.push(
        this.getDb().collection('stats').doc(deletedMetric).delete()
      );

    Promise.all(promises)
      .then(() => {
        this.info.metrics = newMetrics;
        handleSuccess();
      })
      .catch((e) => handleError(e));
  }

  // Days operations
  saveDay(date, newDay, handleSuccess, handleError) {
    let promises = [this.getDb().collection('days').doc(date).set({date: date, ...newDay})];
    for (let [metricId, value] of Object.entries(newDay))
      promises.push(
        this.getDb().collection('stats').doc(metricId).update(
          { ['data.' + date]: value }
        )
      );

    Promise.all(promises)
      .then(() => handleSuccess())
      .catch((e) => handleError(e));
  }

  getDaysPage(refDate, order, cursor, isNextPage, handleSuccess, handleError) {
    let limit = 10;
    let query = this.getDb().collection('days')
    if (refDate && order === 'asc')
      query = query.where('date', '>=', refDate)
    else if (refDate && order === 'asc')
      query = query.where('date', '<=', refDate)
    query = query.orderBy('date', order);
    if (isNextPage) {
      if (cursor)
        query = query.startAfter(cursor);
      query = query.limit(limit);
    }
    else {
      if (cursor)
        query = query.endBefore(cursor);
      query = query.limitToLast(limit);
    }

    query.get()
      .then((querySnapshot) => {
        let days = [];
        querySnapshot.forEach((doc) => {
          days.push({ date: doc.id, ...(doc.data()) });
        });
        let cursor1 = querySnapshot.docs[0];
        let cursor2 = querySnapshot.docs[querySnapshot.docs.length-1];
        handleSuccess(days, cursor1, cursor2);
      })
      .catch((e) => handleError(e));
  }

  // Timers operations
  getTimers() {
    return this.info.timers;
  }

  updateTimers(newTimers, handleSuccess, handleError) {
    console.log('PRIMA') //TODO doesn't enter in catch
    this.getDb().update({ timers: newTimers })
      .then(() => {
        this.info.timers = newTimers;
        handleSuccess();
      })
      .catch((e) => handleError(e));
    console.log('DOPO')
  }

  // Account Operations
  getLifespan() {
    return [this.info.personal.birthday, this.info.personal.deathAge];
  }

  setLifespan(birthday, deathAge, handleSuccess, handleError) {
    this.getDb().update({ 'personal.birthday': birthday, 'personal.deathAge': deathAge })
      .then(() => {
        this.info.personal.birthday = birthday;
        this.info.personal.deathAge = deathAge;
        handleSuccess();
      })
      .catch((e) => handleError(e));
  }

  changeTheme(type) {
    this.handleThemeChange(type)
  }

  // Smaller Stuff
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

