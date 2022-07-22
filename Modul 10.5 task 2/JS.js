const btn = document.querySelector(".button");

btn.addEventListener("click", () => {
  alert(document.documentElement.clientWidth);
  alert(document.documentElement.clientHeight);
});