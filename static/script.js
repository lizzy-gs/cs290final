let interval = null;
let pomodoroLength = 1500;
let shortLength = 300;
let longLength = 900;
let totalStudied = 0;
let creditsSpent = 0;
let loggedIn = false;

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
  } = data;
  loggedIn = true;
  shortLength = short_break_length;
  longLength = long_break_length;
  pomodoroLength = pomodoro_length;
  totalStudied = sec_studied;
  creditsSpent = credits_spent;
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
  document.getElementById("credits").innerText = credits;
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

let shopIcon = document.querySelector("#shopIcon")
let shopModal = document.querySelector("#shop")
let closeShop = document.querySelector("#closeShop")

shopIcon.addEventListener("click", () => {
  shopModal.classList.toggle("hidden")
})

closeShop.addEventListener("click", () => {
  shopModal.classList.toggle("hidden")
})

function changeTheme() {}



/**************************************************
 *                 pls don't break
**************************************************/


//reverses a string
//i made it bc for some reason the one that already exists wasn't working
function my_reverse(str){
  var temp = "";
  for(let i = str.length - 1; i>-1; i--){
      temp += str[i]
  }
  return temp
}
function get_base_name(old_name){
  var baseName = ""
  for (let i = old_name.length - 5; old_name[i] !== '/'; i--) {
      baseName += old_name[i];
  }
  baseName = my_reverse(baseName)
  return baseName
}


//dynamically changes the CSS
function changeCSS(cssFilePath) {

  //gets current theme
  var old_style = document.getElementById('my_current_theme');
  let old_name = old_style.href;

  //gets the name of the file withot the extension
  var baseName = get_base_name(old_name)

  // grabs new theme
  var new_style = document.getElementById(cssFilePath);
 
  //turns off old one and turns on new one
  old_style.media = 'none';
  new_style.media = ' ';

  //sets the old id as the name of the css file and the new one as my_current_theme
  old_style.id = baseName;
  new_style.id = 'my_current_theme'
}

//if the apply button on the theme menu get's cicked then
function handleModalAcceptClick() {

  //get the themed the users wants
  var idk_what_yet = document.querySelector('#theme-condition-fieldset input:checked').value;
  var my_current_theme = document.getElementById('my_current_theme')
  my_current_theme = get_base_name(my_current_theme.href)
  console.log(my_current_theme)

  //if it's one created by the user then use the color as base
  if(idk_what_yet == "mychoice"){

      
      var new_name = document.getElementById("name_new").value;
      var new_hex = document.getElementById("hex_value_new").value;
      if(!new_name || !new_hex){
          alert("You must fill in all of the fields for this section")
      }else{
          console.log("The value of what's supposed to be the name", new_name)
          console.log("The value of what's supposed to be the hex", new_hex)

          console.log("=========")
          console.log("create new css file and apply it")
          changeCSS("new_name")
      }
  }else if(idk_what_yet !== my_current_theme){
      //otherwise just use one of the ones that are already made
      changeCSS(idk_what_yet);
  }

  hide_theme_menu();
}

//show the theme menu
function display_theme_menu() {

  var theme_menu = document.getElementById('change-theme-modal')

  theme_menu.classList.remove('hidden')

  var my_current_theme = document.getElementById('my_current_theme')
  var baseName = get_base_name(my_current_theme.href)
  console.log(baseName)

  var current_theme_button = document.querySelector(`#theme-condition-fieldset input[value="${baseName}"]`)
  current_theme_button.checked = true
}

//hide theme menu
function hide_theme_menu() {
  var theme_menu = document.getElementById('change-theme-modal')

  theme_menu.classList.add('hidden')

  clear_inputs_theme()
}

function clear_inputs_theme(){
  var new_name =  document.getElementById('name_new')
  var new_hex = document.getElementById('hex_value_new')

  new_name.value = ""
  new_hex.value = ""

  var current_theme_button = document.querySelector('#theme-condition-fieldset input[checked]')
  //current_theme_button.checked = true
}

console.log("made it here?")


//listen for clicks
let theme_button = document.getElementById("change-theme-button")
let modalAcceptButton = document.getElementById('modal-apply')
let modalCloseButton = document.getElementById('modal-close')
let modalCanceltButton = document.getElementById('modal-cancel')

//apply the clicsk
theme_button.addEventListener('click', display_theme_menu)
modalAcceptButton.addEventListener('click', handleModalAcceptClick)
modalCloseButton.addEventListener('click', hide_theme_menu)
modalCanceltButton.addEventListener('click', hide_theme_menu)



/**************************************************
*                end pls don't break
**************************************************/