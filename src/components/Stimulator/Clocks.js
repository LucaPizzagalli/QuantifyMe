import React from 'react';
import Gong1 from '../../audio/gong1.mp3';

class Clocks {
  initializeClocks(clocks){
    this.timeouts = {};
    for (let clock of clocks) {
      if (clock.type === 'alarm') {
        let alarmTime = new Date(clock.time);
        let endTime = new Date(new Date().toDateString());
        endTime.setHours(alarmTime.getHours());
        endTime.setMinutes(alarmTime.getMinutes());
        endTime.setSeconds(alarmTime.getSeconds());
        let duration = endTime.getTime() - new Date().getTime();
        if (duration > 0)
          this.timeouts[clock.id] = {
            timeout: setTimeout(() => this.soundAlarm(clock.id), duration),
          }
      }
    }
  }

  startTimer(clock) {
    let duration = clock.time;
    if (this.timeouts[clock.id] && this.timeouts[clock.id].timeLeft)
      duration = this.timeouts[clock.id].timeLeft;
    this.timeouts[clock.id] = {
      timeout: setTimeout(() => this.soundAlarm(clock), duration),
      endTime: new Date(new Date().getTime() + duration),
    };
    return this.timeouts[clock.id].endTime;
  }

  pauseTimer(clock) {
    clearTimeout(this.timeouts[clock.id].timeout);
    this.timeouts[clock.id] = {
      timeLeft: this.timeouts[clock.id].endTime - new Date(),
    }
  }

  resetTimer(clock) {
    if (this.timeouts[clock.id] && this.timeouts[clock.id].timeout)
      clearInterval(this.timeouts[clock.id].timeout);
    delete this.timeouts[clock.id];
  }

  isClockRunning(clock) {
    return this.timeouts[clock.id] && this.timeouts[clock.id].endTime;
  }

  getTimeLeft(clock) {
    if (this.timeouts[clock.id])
      if (this.timeouts[clock.id].timeLeft)
        return this.timeouts[clock.id].timeLeft;
      else
        return this.timeouts[clock.id].endTime - new Date();
    return null;
  }

  soundAlarm(clock) {
    delete this.timeouts[clock.id];
    (new Audio(Gong1)).play();
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(clock.description);
    }
  }
}


let ClocksContext = React.createContext(null);

export default ClocksContext;
export { Clocks };
