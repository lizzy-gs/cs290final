let interval = null;
let pomodoroLength = 1500;
let shortLength = 300;
let longLength = 900;
let total_studied = 0;

(async () => {
  const {
    sec_studied,
    pomodoro_length,
    short_break_length,
    long_break_length,
  } = await fetch("/me").then((res) => res.json());
  shortLength = short_break_length;
  longLength = long_break_length;
  pomodoroLength = pomodoro_length;
  total_studied = sec_studied;
  setTimer(pomodoroLength);
})();

function countdownTimer() {
  if (interval) {
    stopInterval();
  } else {
    document.getElementById("startTimer").innerText = "Pause Timer";
    interval = setInterval(() => {
      timeRemaining--;
      document.getElementById("timer").innerText = formatSeconds(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(interval);
        document.getElementById("startTimer").innerText = "Start Timer";
        console.log(timeRemaining);
        alert("Time's up!");
      }
    }, 1000);
    document.getElementById("timer").innerText = formatSeconds(timeRemaining);
  }
}

function setTimer(x) {
  if (interval) {
    stopInterval();
  }
  timeRemaining = x;
  document.getElementById("timer").innerText = formatSeconds(timeRemaining);
}

function stopInterval() {
  clearInterval(interval);
  interval = null;
  document.getElementById("startTimer").innerText = "Start Timer";
}

function formatSeconds(x) {
  var minutes = Math.floor(x / 60);
  var seconds = x % 60;

  if (minutes < 10) {
    if (seconds == 0) {
      return "0" + minutes + ":00";
    } else if (seconds < 10) {
      return "0" + minutes + ":" + "0" + seconds;
    } else {
      return "0" + minutes + ":" + seconds;
    }
  } else if (minutes >= 10) {
    if (seconds == 0) {
      return minutes + ":00";
    } else if (seconds < 10) {
      return minutes + ":" + "0" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }
}

function saveTimerSettings() {
  if (interval) {
    stopInterval();
  }
  pomodoroLength =
    parseInt(document.getElementById("pomodoroLength").value) * 60 ||
    pomodoroLength;
  shortLength =
    parseInt(document.getElementById("shortBreakLength").value) * 60 ||
    shortLength;
  longLength =
    parseInt(document.getElementById("longBreakLength").value) * 60 ||
    longLength;
  setTimer(pomodoroLength);
  document.getElementById("pomodoroLength").value = pomodoroLength / 60;
  document.getElementById("shortBreakLength").value = shortLength / 60;
  document.getElementById("longBreakLength").value = longLength / 60;
  modal.classList.toggle("hidden");
}

function resetToDefaults() {
  if (interval) {
    stopInterval();
  }
  pomodoroLength = 1500;
  shortLength = 300;
  longLength = 900;
  setTimer(pomodoroLength);
  document.getElementById("pomodoroLength").value = pomodoroLength / 60;
  document.getElementById("shortBreakLength").value = shortLength / 60;
  document.getElementById("longBreakLength").value = longLength / 60;
}

setTimer(pomodoroLength);

let start = document.querySelector("#startTimer");
let pomodoro = document.querySelector("#pomodoro");
let short = document.querySelector("#shortBreak");
let long = document.querySelector("#longBreak");

start.addEventListener("click", countdownTimer);
pomodoro.addEventListener("click", () => {
  setTimer(pomodoroLength);
});
short.addEventListener("click", () => {
  setTimer(shortLength);
});
long.addEventListener("click", () => {
  setTimer(longLength);
});

let settings = document.querySelector("#settingsIcon");
let modal = document.querySelector("#settingsMenu");
let closeSettings = document.querySelector("#closeSettings");

settings.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

closeSettings.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

let save = document.querySelector("#save");
let reset = document.querySelector("#reset");

save.addEventListener("click", saveTimerSettings);
reset.addEventListener("click", resetToDefaults);
