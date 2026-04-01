function getTheme() {
  return localStorage.getItem("theme") || "light";
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

console.log("storage.js has very little now")