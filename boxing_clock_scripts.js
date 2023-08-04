const timer = document.getElementById('timer');
const sbutton = document.getElementById('start_button');
const rbutton = document.getElementById('reset_button');
const isrest = document.getElementById('isrest')
const round_elem = document.getElementById('roundcounter')
const roundbtn = document.getElementById('round_button')
const roundin = document.getElementById('round_input')
const number_of_rounds_label = document.getElementById('number_of_rounds_label')

var round_start_audio = new Audio('sounds/round_start_sound.mp3')
var round_end_audio = new Audio('sounds/round_end_sound.mp3') // Import the audio files

sbutton.style.backgroundColor = "green";
rbutton.style.backgroundColor = "red";

let secondsLeft = 10;
let number_of_rounds = 1;
let countdownTimeout;
let isCountdownRunning = false; // Variable to track the countdown status
let nround = 1;

function set_rounds() {
  number_of_rounds = roundin.value;
  number_of_rounds_label.innerHTML = number_of_rounds;
}

function check_rounds() {
  if (nround == number_of_rounds) {
    alert("Fight finished")
    reset_counter();
  }
  else {
    rest_countdown()
  }
}

function countdown(seclef=10) {
  if (seclef > 0) {
    seclef--;
    minl = Math.floor(seclef / 60);
    lsec = seclef % 60;
    timer.innerHTML = (`${minl}min ${lsec}s`);
    countdownTimeout = setTimeout(() => countdown(seclef), 1000);
  } else {
    isrest.innerHTML = "RESTING"
    check_rounds()
    round_end_audio.play()
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
    countdown()
  }
}


function reset_counter() {
  clearTimeout(countdownTimeout);

  secondsLeft = 180;
  minl = Math.floor(secondsLeft / 60);
  lsec = secondsLeft % 60;
  timer.innerHTML = (`${minl}min ${lsec}s`);

  isCountdownRunning = false;
  nround = 1;
  round_elem.innerHTML = nround;
}

function start_counter() {
  if (!isCountdownRunning) {
    isCountdownRunning = true; // Set countdown status
    round_start_audio.play();
    countdown(secondsLeft); // Start the countdown process
  }
}

sbutton.addEventListener("click", start_counter);
rbutton.addEventListener("click", reset_counter);
roundbtn.addEventListener("click", set_rounds);
