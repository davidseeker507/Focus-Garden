document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

const topBar = document.querySelector(".top-bar");
let lastScrollY = window.scrollY;

if (topBar) {
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    const isScrollingDown = current > lastScrollY && current > 80;

    topBar.classList.toggle("top-bar--hidden", isScrollingDown);

    lastScrollY = current;
  });
}