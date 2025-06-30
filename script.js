let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapCounter = 1;

function updateDisplay(time) {
  const display = document.getElementById('display');

  let hours = Math.floor(time / (60 * 60 * 1000));
  let minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
  let seconds = Math.floor((time % (60 * 1000)) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10); // show 2-digit ms

  display.textContent =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(2, '0');
}

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(function () {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 50); // update every 50ms
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  lapCounter = 1;
  updateDisplay(0);
  document.getElementById('laps').innerHTML = '';
}

function recordLap() {
  if (!difference) return;
  const lapTime = document.createElement('li');
  lapTime.textContent = `Lap ${lapCounter++}: ${document.getElementById('display').textContent}`;
  document.getElementById('laps').appendChild(lapTime);
}
