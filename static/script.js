let interval = null;
let pomodoroLength = 1500;
let shortLength = 300;
let longLength = 900;
let totalStudied = 0;
let creditsSpent = 0;
let loggedIn = false;
let availableThemes = [];

fetch("/me").then((res) => {
  if (!res.ok) throw new Error(`Response status: ${response.status}`);
  return res;
}).then((res) => res.json()).then((data) => {
  const {
    sec_studied,
    pomodoro_length,
    short_break_length,
    long_break_length,
    credits_spent,
	purchases
  } = data;
  loggedIn = true;
  shortLength = short_break_length;
  longLength = long_break_length;
  pomodoroLength = pomodoro_length;
  totalStudied = sec_studied;
  creditsSpent = credits_spent;
  availableThemes = purchases;
  setTimer(pomodoroLength);
}).catch(() => {
  loginWarning.style.display = "block";
  loggedIn = false;
});

function syncWithServer() {
  fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pomodoroLength: pomodoroLength,
      shortLength: shortLength,
      longLength: longLength,
      totalStudied: totalStudied,
      creditsSpent: creditsSpent,
    }),
  });
}

function countdownTimer() {
  if (interval) {
    stopInterval();
    syncWithServer();
  } else {
    document.getElementById("startTimer").innerText = "Pause Timer";
    interval = setInterval(() => {
      timeRemaining--;
      document.getElementById("timer").innerText = formatSeconds(timeRemaining);
      totalStudied++;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        document.getElementById("startTimer").innerText = "Start Timer";
        syncWithServer();
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
  syncWithServer();
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

  syncWithServer();
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

function setCredits() {
  var credits = totalStudied / 60;
  credits = credits - creditsSpent;
  document.getElementById("credits").innerText = "$" + credits;
}

setTimer(pomodoroLength);
setCredits();

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

let shopIcon = document.querySelector("#shopIcon")
let shopModal = document.querySelector("#shop")
let closeShop = document.querySelector("#closeShop")

shopIcon.addEventListener("click", () => {
  shopModal.classList.toggle("hidden")
})

closeShop.addEventListener("click", () => {
  shopModal.classList.toggle("hidden")
})

function buyTheme(e) {
  e.stopPropagation();
  e.preventDefault();
  const target = e.currentTarget;
  const themeName = e.currentTarget.dataset.name;
  const theme = availableThemes.find((el) => el.name == themeName)
  if (theme != undefined) {
		changeTheme(themeName);
		return;
  }

  fetch("/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
		theme: themeName,
    }),
  }).then(res => {
    if (!res.ok) {
        throw new Error('Not enough credits to purchase theme');
    }
    return res.json();
  }).then(theme => {
	availableThemes.push(theme);
	changeTheme(themeName);
	target.removeChild(target.children[2])
	target.removeChild(target.children[1])
  }).catch((err)=>{
	alert(err);
  })
}

document.querySelectorAll(".colorOption").forEach((el)=>{
	el.addEventListener("click", buyTheme)
})

function changeTheme(name) {
	const theme = availableThemes.find((el) => el.name == name)
	if (theme == undefined) {return}

	console.log(theme)

	const root = document.documentElement;
	root.style.setProperty("--bg-color", theme.styles.bgColor)
	root.style.setProperty("--primary-color", theme.styles.buttonColor)
	root.style.setProperty("--accent-color", theme.styles.accentColor)
	root.style.setProperty("--text-color", theme.styles.textColor)
	root.style.setProperty("--hover-shadow", theme.styles.hoverShadow)
}

