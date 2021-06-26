let app = document.querySelector(".app");

// time to consider user inactive
const inactiveTime = 3000; // 3sec

// Initialize mouse last mouvement time
let mouseLastMoveTime = new Date();

document.addEventListener("mousemove", () => {
  // reset last time the mouse moved
  mouseLastMoveTime = new Date();

  // show app
  app.classList.remove("inactive");

  // show cursor
  document.body.style.cursor = "auto";
});

function hideButtons() {
  // Get now time
  let now = new Date();

  // Calculate time difference
  const deltaTime = now - mouseLastMoveTime;

  // IF delta tile is >= inactiveTime, means the use was inactive.
  if (deltaTime >= inactiveTime) {
    // hide app
    app.classList.add("inactive");

    // hide cursor
    document.body.style.cursor = "none";
  }
}
setInterval(hideButtons, inactiveTime);
