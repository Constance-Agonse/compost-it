export class Chronometer {

  constructor(limit) {
    this.startTime = limit
    this.currentTime = limit;
    this.intervalId = null;
  }

  start(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime--;
      if (callback && typeof callback === 'function') {
        callback();
      };
    }, 1000);
  }

  getMinutes() {
    if (this.currentTime === 0) { return "00" }
    return this.computeTwoDigitNumber(Math.floor(this.currentTime / 60));
  }

  getSeconds() {
    return this.computeTwoDigitNumber(this.currentTime % 60);
  }

  computeTwoDigitNumber(value) {
    let stringValue = value.toString()
    if (stringValue.length === 2) return stringValue;
    else return "0" + stringValue;
  }

  stop() {
    clearInterval(this.intervalId);
    this.currentTime = this.startTime
  }

  reset() {
    return this.currentTime = 0;
  }

  split() {
    let seconds = this.computeTwoDigitNumber(this.getSeconds());
    let minutes = this.computeTwoDigitNumber(this.getMinutes());
    return `${minutes}:${seconds}`;
  }
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = Chronometer;
}
