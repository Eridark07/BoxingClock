const timer = document.getElementById('timer');
const sbutton = document.getElementById('start_button');
const rbutton = document.getElementById('reset_button');
const isrest = document.getElementById('isrest')
const round_elem = document.getElementById('roundcounter')
const number_of_rounds_label = document.getElementById('number_of_rounds_label')

// Control panel elements
const roundbtn = document.getElementById('round_button')
const roundin = document.getElementById('round_input') // Round elements

const minutesinput = document.getElementById('minutes_input')
const secondsinput = document.getElementById('seconds_input')
const timebtn = document.getElementById('time_button') // Round time elements

const restminutesinput = document.getElementById('rest_minutes_input');
const restsecondsinput = document.getElementById('rest_seconds_input');
const resttimebtn = document.getElementById('rest_time_button'); // Rest time elements

// Audio
var round_start_audio = new Audio('sounds/round_start_sound.mp3')
var round_end_audio = new Audio('sounds/round_end_sound.mp3')
var fight_end_audio = new Audio('sounds/end_fight_sound.mp3') // Import the audio files

// Basic styling for the start and reset button
sbutton.style.backgroundColor = "green";
rbutton.style.backgroundColor = "red";

let round_time = 180;
let rest_time = 60;
let number_of_rounds = 12;
let countdownTimeout;
let isCountdownRunning = false; // Variable to track the countdown status
let nround = 1;

// Functions
function set_rounds() {
  number_of_rounds = Math.floor(roundin.value);
  number_of_rounds_label.innerHTML = number_of_rounds;
}

function set_round_time() {
  round_time = ((Math.floor(parseInt(minutesinput.value)) * 60) + parseInt(secondsinput.value));
  timer.innerHTML = (`${minutesinput.value}min ${secondsinput.value}s`);
}

function set_rest_time() {
  rest_time = ((Math.floor(parseInt(restminutesinput.value)) * 60) + parseInt(restsecondsinput.value));
}

function countdown(seclef=10) {
  if (seclef > 0) {
    seclef--;
    minl = Math.floor(seclef / 60);
    lsec = seclef % 60;
    timer.innerHTML = (`${minl}min ${lsec}s`);
    countdownTimeout = setTimeout(() => countdown(seclef), 1000);
  } else if (nround == number_of_rounds) {
    fight_end_audio.play()
    alert("Fight finished")
    reset_counter();
  } else {
    isrest.innerHTML = "RESTING"
    round_end_audio.play()
    rest_countdown(rest_time)
  }
}

function rest_countdown(seclef=5) {
  if (seclef > 0) {
    seclef--;
    minl = Math.floor(seclef / 60);
    lsec = seclef % 60;
    timer.innerHTML = (`${minl}min ${lsec}s`);
    countdownTimeout = setTimeout(() => rest_countdown(seclef), 1000);
  } else {
    isrest.innerHTML = "NOT RESTING";
    nround = nround + 1;
    round_elem.innerHTML = nround;
    round_start_audio.play();
    countdown(round_time)
  }
}


function reset_counter() {
  clearTimeout(countdownTimeout);
  isrest.innerHTML = "NOT RESTING";
  round_time = Math.floor(minutesinput.value) * 60;
  minl = Math.floor(round_time / 60);
  lsec = round_time % 60;
  timer.innerHTML = (`${minl}min ${lsec}s`);

  isCountdownRunning = false;
  nround = 1;
  round_elem.innerHTML = nround;
}

function start_counter() {
  if (!isCountdownRunning) {
    // Check the user filled the values and fill them if necessary
    if (roundin.value == "") {
      roundin.value = 12;
    }
    if (minutesinput.value == "") {
      minutesinput.value = 3;
    }
    if (secondsinput.value == "") {
      secondsinput.value = 0;
    }
    if (restminutesinput.value == "") {
      restminutesinput.value = 1;
    }
    if (restsecondsinput.value == "") {
      restsecondsinput.value = 0;
    }
    isCountdownRunning = true; // Set countdown status
    round_start_audio.play();
    countdown(round_time); // Start the countdown process
  }
}


// Event listeners for the buttons
sbutton.addEventListener("click", start_counter);
rbutton.addEventListener("click", reset_counter);
roundbtn.addEventListener("click", set_rounds);
timebtn.addEventListener("click", set_round_time);
resttimebtn.addEventListener("click", set_rest_time);
