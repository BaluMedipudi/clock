// Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        stopwatchTime += 10;
        document.getElementById('stopwatch-time').textContent = new Date(stopwatchTime).toISOString().substr(11, 12);
    }, 10);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById('stopwatch-time').textContent = '00:00:00.000';
}

// Timer
let timerInterval;
let timerTime = 0;

function startTimer() {
    const minutes = parseInt(document.getElementById('timer-minutes').value, 10) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value, 10) || 0;
    timerTime = (minutes * 60 + seconds) * 1000;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timerTime <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
        } else {
            timerTime -= 1000;
            const min = String(Math.floor(timerTime / 60000)).padStart(2, '0');
            const sec = String(Math.floor((timerTime % 60000) / 1000)).padStart(2, '0');
            document.getElementById('timer-time').textContent = `${min}:${sec}`;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerTime = 0;
    document.getElementById('timer-time').textContent = '00:00';
}

// Alarm
let alarmTimeout;

function setAlarm() {
    const alarmTime = document.getElementById('alarm-time').value;
    if (!alarmTime) return;

    const [hours, minutes] = alarmTime.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeToAlarm = alarmDate - now;
    alarmTimeout = setTimeout(() => {
        alert('Alarm ringing!');
    }, timeToAlarm);
}

function stopAlarm() {
    clearTimeout(alarmTimeout);
}
