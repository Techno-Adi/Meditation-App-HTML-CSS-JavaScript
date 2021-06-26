const seasonsEl = document.querySelector(".seasons");
const toggleBtn = document.querySelector(".arrow");

toggleBtn.addEventListener("click", () => {
  seasonsEl.classList.toggle("seasons-menu-open");
  toggleBtn.classList.toggle("arrow-rotate");
});
