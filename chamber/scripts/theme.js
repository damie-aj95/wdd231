
const themeButton = document.querySelector("#theme-btn");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");

  themeButton.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
  );

  themeButton.innerHTML = isDarkMode ? "&#9788;" : "&#9680;";
});
