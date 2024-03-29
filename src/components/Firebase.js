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

// - level 1: this is the first time that a user log in the app
// - level 2: the user has already logged one time


let startInfo = {
  email: null,
  personal: {},
  level: 1,
  groups: [],
  metrics: {},
  clocks: [],
  theme: 'light',
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
  }

  // Authentication
  isLogged() {
    return !!this.auth;
  }

  activateAuthUserListener(HandleUserAuthChange, handleError) {
    this.authListener = this.configAuth.onAuthStateChanged(authUser => {
      this.auth = authUser;
      if (authUser) {
        let newUser = true;
        this.getDb().get()
          .then((doc) => {
            if (doc.exists) {
              this.info = doc.data();
              newUser = false;
            }
          })
          .then(() => {
            if (newUser) {
              this.info = { ...startInfo, email: authUser.email, level: 2 };
              let promises = [
                this.getDb().set(this.info, { merge: true }),
                this.getDb().collection('extra').doc('plots').set({ plots: [] })
              ];
              Promise.all(promises)
                .then(() => HandleUserAuthChange(true))
                .catch((e) => handleError(e))
            }
            else
              HandleUserAuthChange(true)
          })
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
    let promises = [
      this.getDb().collection('days').get(),
      this.getDb().collection('extra').doc('plots').get(),
    ];

    Promise.all(promises)
      .then(docs => {
        docs[0].forEach((doc) => {
          backup['days'].push(doc.data());
        });
        backup['plots'] = docs[1].data().plots;
        backup = new Blob([JSON.stringify(backup)], { type: 'application/json' })
        handleSuccess(backup);
      })
      .catch((e) => handleError(e));
  }

  importData(backup, options, handleSuccess, handleError) {
    let promises = [];
    if (options.days) {
      let stats = {};
      this.getDb().collection('stats').get()
        .then(docs => {
          docs.forEach(doc => {
            stats[doc.id] = doc.data();
          })
        })
        .then(() => {
          for (let day of backup.days) {
            promises.push(this.getDb().collection('days').doc(day.date.toString()).set(day));
            for (let metricId of Object.keys(day)) {
              if (metricId !== 'date') {
                if (!(metricId in stats))
                  stats[metricId] = { times: [], values: [] };
                stats[metricId].times.push(day.date);
                stats[metricId].values.push(day[metricId]);
              }
            }
          }
          for (let [metricId, stat] of Object.entries(stats)) {
            stat = stat.times.map((time, index) => [time, stat.values[index]]);
            stat.sort();
            let times = stat.map(couple => couple[0]);
            let values = stat.map(couple => couple[1]);
            promises.push(
              this.getDb().collection('stats').doc(metricId).set({ times: times, values: values })
            );
          }
          this._importDataBis(backup, options, handleSuccess, handleError, promises);
        });
    }
    else
      this._importDataBis(backup, options, handleSuccess, handleError, promises);

  }
  _importDataBis(backup, options, handleSuccess, handleError, promises) {
    if (options.plots)
      promises.push(this.getDb().collection('extra').doc('plots').set({ plots: backup.plots }));
    if (options.metrics)
      promises.push(this.getDb().update({ metrics: backup.info.metrics, groups: backup.info.groups }));
    if (options.clocks)
      promises.push(this.getDb().update({ clocks: backup.info.clocks }));
    if (options.extra) {
      promises.push(this.getDb().update({
        email: backup.info.email,
        personal: backup.info.personal,
        level: backup.info.level,
        theme: backup.info.theme,
      }));
    }
    Promise.all(promises)
      .then(() => this.getDb().get())
      .then((doc) => {
        this.info = doc.data();
        handleSuccess();
      })
      .catch((e) => handleError(e));
  }

  eraseData(options, handleSuccess, handleError) {
    let promises = [];
    if (options.days) {
      this.getDb().collection('days').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            promises.push(this.getDb().collection('days').doc(doc.id).delete());
          })
          this.getDb().collection('stats').get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                promises.push(this.getDb().collection('stats').doc(doc.id).delete());
              })
              this._eraseDataBis(options, handleSuccess, handleError, promises);
            })
            .catch((e) => handleError(e));
        })
        .catch((e) => handleError(e));
    }
    else
      this._eraseDataBis(options, handleSuccess, handleError, promises);
  }
  _eraseDataBis(options, handleSuccess, handleError, promises) {
    if (options.metrics)
      promises.push(this.getDb().update({ metrics: {}, groups: [] }));
    if (options.clocks)
      promises.push(this.getDb().update({ clocks: [] }));
    if (options.plots)
      promises.push(this.getDb().collection('extra').doc('plots').set({ plots: [] }));
    if (options.extra) {
      promises.push(this.getDb().update({
        email: null,
        personal: {},
        level: 1,
        theme: 'light',
      }));
    }
    Promise.all(promises)
      .then(() => this.getDb().get())
      .then((doc) => {
        this.info = doc.data();
        handleSuccess();
      })
      .catch((e) => handleError(e));
  }

  // Metrics operations
  getGroup(id) {
    for (let group of this.info.groups)
      if (group.id === id)
        return group;
    return null;
  }

  getGroups() {
    return this.info.groups;
  }

  getMetric(id) {
    return this.info.metrics[id];
  }

  getMetrics() {
    return this.info.metrics;
  }

  updateGroup(newGroup, newMetrics, handleSuccess, handleError) {
    let newGroups = this.info.groups;
    let isNew = true;
    for (let i = 0; i < newGroups.length; i++)
      if (newGroups[i].id === newGroup.id) {
        if (newGroup.metrics.length === 0)
          newGroups.splice(i, 1);
        else
          newGroups[i] = newGroup;
        isNew = false;
        break;
      }
    if (isNew && newGroup.metrics.length > 0)
      newGroups.push(newGroup);

    let promises = [this.getDb().update({ metrics: newMetrics, groups: newGroups })];
    for (let id of Object.keys(newMetrics))
      if (!(id in this.info.metrics))
        promises.push(
          this.getDb().collection('stats').doc(id).set({ times: [], values: [] })
        );
    for (let id of Object.keys(this.info.metrics))
      if (!(id in newMetrics))
        promises.push(
          this.getDb().collection('stats').doc(id).delete()
        );

    Promise.all(promises)
      .then(() => {
        this.info.metrics = newMetrics;
        this.info.groups = newGroups;
        handleSuccess();
      })
      .catch((e) => handleError(e));
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
      .then((docs) => {
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

  // Plots operations
  updatePlots(plots, handleSuccess, handleError) {
    this.getDb().collection('extra').doc('plots').set({ plots: plots })
      .then(() => handleSuccess())
      .catch((e) => handleError(e));
  }

  getPlots(handleSuccess, handleError) {
    this.getDb().collection('extra').doc('plots').get()
      .then((doc) => handleSuccess(doc.data().plots))
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

  getTheme() {
    return this.info.theme;
  }

  setTheme(theme, handleSuccess, handleError) {
    this.getDb().update({ theme: theme })
      .then(() => handleSuccess())
      .catch((e) => handleError(e));
  }

  updatePassword(newPassword, handleSuccess, handleError) {
    this.auth.updatePassword(newPassword)
      .then(() => handleSuccess('Password Updated'))
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
  getDashboardCards() {
    let cards = [];
    if (this.info.level === 1)
      cards.push({
        title: 'Such an Achievement!',
        message: 'The first step to leave back procrastination is the most important. Welcome to QuantifyMe.',
      });
    else if (this.info.level === 2)
      cards.push({
        title: 'Go to log Today',
        message: 'You have not logged this day, yet. Click here to quantify today',
        to: '/quantify-day',
      });
    return cards;
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

