
class DigitalClock {
  constructor() {
    // DOM Elementleri
    this.hoursEl = document.getElementById('hours');
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.ampmEl = document.getElementById('ampm');
    this.ampmContainer = document.getElementById('ampmContainer');
    this.dateDisplay = document.getElementById('dateDisplay');
    this.dayDisplay = document.getElementById('dayDisplay');
    this.progressBar = document.getElementById('progressBar');
    this.formatToggleBtn = document.getElementById('formatToggleBtn');
    this.formatLabel = document.getElementById('formatLabel');

    this.is24HourFormat = true;

    this.init();
  }

  init() {

    this.formatToggleBtn.addEventListener('click', () => this.toggleFormat());

    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  toggleFormat() {
    this.is24HourFormat = !this.is24HourFormat;
    this.formatLabel.textContent = this.is24HourFormat ? '24H' : '12H';
    this.ampmContainer.classList.toggle('hidden', this.is24HourFormat);
    this.updateClock();
  }

  padZero(number) {
    return number.toString().padStart(2, '0');
  }

  updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (!this.is24HourFormat) {
      const ampmValue = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // 0 durumunu 12 yap
      this.ampmEl.textContent = ampmValue;
    }

    this.hoursEl.textContent = this.padZero(hours);
    this.minutesEl.textContent = this.padZero(minutes);
    this.secondsEl.textContent = this.padZero(seconds);

    const progressPercent = (seconds / 60) * 100;
    this.progressBar.style.width = `${progressPercent}%`;

    this.updateDate(now);
  }

  updateDate(date) {
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dayOptions = { weekday: 'long' };

    this.dateDisplay.textContent = new Intl.DateTimeFormat('tr-TR', dateOptions).format(date);
    this.dayDisplay.textContent = new Intl.DateTimeFormat('tr-TR', dayOptions).format(date);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DigitalClock();
});