// Select elements
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const audio = document.querySelector("audio");
const path = document.querySelector(".rect");
const video = document.querySelector("video");
const seasons = document.querySelectorAll(".season");
const durations = document.querySelectorAll(".duration");
const remainigTimeEl = document.querySelector(".audio-remaining-time");

// default duration : 2min => 2 * 60s => 120s
let audioDuration = 120;

// Play Audio
playBtn.addEventListener("click", () => {
  audio.play();
  update();
});

// Pause audio
pauseBtn.addEventListener("click", () => {
  audio.pause();
});

// Change video on season click
seasons.forEach((season) => {
  season.addEventListener("click", () => {
    video.src = season.getAttribute("video-src");
  });
});

// Change duration
durations.forEach((duration) => {
  duration.addEventListener("click", () => {
    audioDuration = duration.getAttribute("audio-duration");
    update();
  });
});

// Total length of the path (perimeter of the rectangle)
const pathLength = path.getTotalLength();
// The stroke-dasharray attribute is a presentation attribute defining the pattern of dashes and gaps used to paint the outline of the shape;
path.style.strokeDasharray = pathLength;

function update() {
  // Stop audio when reach audio duration set by user
  if (audio.currentTime >= audioDuration) {
    audio.pause(); // pause audio
    audio.currentTime = 0; // set current time to 0 (== stop video)
  }

  // Portion played
  let portionPlayed = audio.currentTime / audioDuration;

  console.log(-pathLength * portionPlayed);

  // animate path ( - sign is for going clockwise direction)
  path.style.strokeDashoffset = -pathLength * portionPlayed;

  // Calculate Remaining Time To Play
  let remainingTime = audioDuration - audio.currentTime;
  renderRemainingTime(remainingTime);

  // Stop calling update function when audio is paused.
  if (!audio.paused) {
    requestAnimationFrame(update);
  }
}
update(); // init

// Render Remaining Time
function renderRemainingTime(timeInSec) {
  // get minutes
  let min = Math.floor(timeInSec / 60);
  // get secondes
  let sec = Math.floor(timeInSec % 60);

  // if min/sec is a single digit (ex: 9) we add a zero at the beginning. (ex: 9 becomes 09)
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  remainigTimeEl.innerHTML = `${min}:${sec}`;
}
