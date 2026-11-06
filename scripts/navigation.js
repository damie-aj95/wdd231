const btn = document.querySelector("#menu-btn");
const menu = document.querySelector("#nav-menu");
btn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
  btn.innerHTML = open ? "&times;" : "&#9776;";
});