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
  clocks: [],
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
          .then(() => HandleUserAuthChange(true))
          .catch((e) => handleError(e))
      }
      else
        HandleUserAuthChange(false);
    });
  }

  deactivateAuthUserListener() {
    this.authListener();
  }

  signOut(handleSuccess, handleError) {
    this.configAuth.signOut()
      .then(() => handleSuccess())
      .catch((e) => handleError(e));
  }

  // Database operations
  getDb() {
    return this.db.doc('users/' + this.auth.uid);
  }

  exportData(handleSuccess, handleError) {
    let backup = { info: this.info, days: [] };
    this.getDb().collection('days').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          backup['days'].push(doc.data());
        });
        backup = new Blob([JSON.stringify(backup)], { type: 'application/json' })
        handleSuccess(backup);
      })
      .catch((e) => handleError(e));
  }

  importData(backup, options, handleSuccess, handleError) { // TODO: add other options
    let promises = [];
    if (options['days']) {
      let stats = {};
      this.getDb().collection('stats').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            stats[doc.id] = doc.data();
          })
        })
        .then(() => {
          for (let day of backup['days']) {
            promises.push(this.getDb().collection('days').doc(day['date'].toString()).set(day));
            for (let metricId of Object.keys(day)) {
              if (metricId !== 'date' && !(metricId in stats))
                stats[metricId] = { 'times': [], 'values': [] }
              if (metricId !== 'date') {
                stats[metricId]['times'].push(day['date']);
                stats[metricId]['values'].push(day[metricId]);
              }
            }
          }
          for (let [metricId, stat] of Object.entries(stats)) {
            stat = stat['times'].map((time, index) => [time, stat['values'][index]]);
            stat.sort();
            let times = stat.map(couple => couple[0]);
            let values = stat.map(couple => couple[1]);
            promises.push(
              this.getDb().collection('stats').doc(metricId).set({ 'times': times, 'values': values })
            );
          }
        });
    }
    Promise.all(promises)
      .then(() => {
        handleSuccess();
      })
      .catch((e) => handleError(e));
  }

  eraseData(options, handleSuccess, handleError) { // TODO: add other options
    let promises = [];
    if (options['days']) {
      this.getDb().collection('days').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            promises.push(this.getDb().collection('days').doc(doc.id).delete());
          })
        });
      this.getDb().collection('stats').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            promises.push(this.getDb().collection('stats').doc(doc.id).delete());
          })
        });
    }
    Promise.all(promises)
      .then(() => {
        handleSuccess();
      })
      .catch((e) => handleError(e));
  }

  // Metrics operations
  getMetrics() {
    return this.info.metrics;
  }

  updateMetrics(newMetrics, addedMetric, deletedMetric, handleSuccess, handleError) {
    let promises = [this.getDb().update({ metrics: newMetrics })];
    if (addedMetric)
      promises.push(
        this.getDb().collection('stats').doc(addedMetric).set({ times: [], values: [] })
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
    let promises = [];
    let metricIds = [];
    for (let metricId of Object.keys(newDay)) {
      metricIds.push(metricId);
      promises.push(this.getDb().collection('stats').doc(metricId).get());
    }

    Promise.all(promises)
      .then(docs => {
        let promises2 = [this.getDb().collection('days').doc(date.toString()).set({ date: date, ...newDay })];
        for (let [index, doc] of Object.entries(docs)) {
          let times = doc.data().times;
          let values = doc.data().values;
          let newIndex = sortedIndex(times, date);
          times.splice(newIndex, 0, date);
          values.splice(newIndex, 0, newDay[metricIds[index]]);
          promises2.push(
            this.getDb().collection('stats').doc(metricIds[index]).update({ times, values })
          );
        }
        Promise.all(promises2)
          .then(() => handleSuccess())
          .catch((e) => handleError(e));
      })
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
        let cursor2 = querySnapshot.docs[querySnapshot.docs.length - 1];
        handleSuccess(days, cursor1, cursor2);
      })
      .catch((e) => handleError(e));
  }

  getTimeSeries(metrics, handleSuccess, handleError) {
    let promises = metrics.map(metric => {
      return this.getDb().collection('stats').doc(metric.id).get();
    });

    Promise.all(promises)
      .then(docs => {
        let timeSeries = docs.map((doc, index) => {
          let times = doc.data().times;
          let values = doc.data().values;
          if (metrics[index].type === 'text')
            values = values.map(text => text ? 1 : 0);
          let data = times.map((time, index) => [time, values[index]]);
          return { name: metrics[index].name, data };
        });
        handleSuccess(timeSeries);
      })
      .catch((e) => handleError(e));
  }

  // Clocks operations
  getClocks() {
    return this.info.clocks;
  }

  updateClocks(newClocks, handleSuccess, handleError) {
    console.log('PRIMA') //TODO doesn't enter in catch
    this.getDb().update({ clocks: newClocks })
      .then(() => {
        this.info.clocks = newClocks;
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

  updatePassword(newPassword, handleSuccess, handleError) {
    this.auth.updatePassword(newPassword)
      .then(() => {
        handleSuccess('Password Updated');
      })
      .catch((e) => handleError(e));
  }

  deleteAccount(handleSuccess, handleError) {
    this.auth.delete()
      // TODO sign out
      // TODO delete all collections
      // this.getDb().delete()
      .then(() => {
        this.info = {};
        handleSuccess('Account Deleted');
      })
      .catch((e) => handleError(e));
  }

  // Smaller Stuff
  getWelcomeMessage() {
    if (this.info.level === 1)
      return 'Welcome for the first time to QuantifyMe';
    else if (this.info.level === 2)
      return 'Welcome back to QuantifyMe';
  }

}

function sortedIndex(array, value) {
  let low = 0;
  let high = array.length;

  while (low < high) {
    let mid = (low + high) >>> 1;
    if (array[mid] < value)
      low = mid + 1;
    else
      high = mid;
  }
  return low;
}

let UserContext = React.createContext(null);

export default UserContext;
export { User };

