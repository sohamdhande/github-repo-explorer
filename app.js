let allRepos = [];
let x = "";
let temp;
let myVar;
let thing;

function renderAll() {
  var lang = document.getElementById("language-filter").value;
  var sort = document.getElementById("sort-select").value
  var order = document.getElementById("order-select").value;

  console.log("rendering...")
  console.log(lang)
  console.log(sort)

  var results = [];
  for (var i = 0; i < allRepos.length; i++) {
    if (lang == "") {
      results.push(allRepos[i])
    }
    else if (allRepos[i].language == lang) {
      results.push(allRepos[i])
    }
  }

  if (sort == "stars") {
    for (var j = 0; j < results.length - 1; j++) {
      for (var k = 0; k < results.length - 1 - j; k++) {
        var shouldSwap = false;
        if (order == "desc") {
          if (results[k].stargazers_count < results[k + 1].stargazers_count) {
            shouldSwap = true;
          }
        } else {
          if (results[k].stargazers_count > results[k + 1].stargazers_count) {
            shouldSwap = true;
          }
        }
        if (shouldSwap == true) {
          var temp = results[k];
          results[k] = results[k + 1];
          results[k + 1] = temp;
        }
      }
    }
  }

  if (sort == "forks") {
    for (var j = 0; j < results.length - 1; j++) {
      for (var k = 0; k < results.length - 1 - j; k++) {
        var shouldSwap = false;
        if (order == "desc") {
          if (results[k].forks_count < results[k + 1].forks_count) {
            shouldSwap = true;
          }
        } else {
          if (results[k].forks_count > results[k + 1].forks_count) {
            shouldSwap = true;
          }
        }
        if (shouldSwap == true) {
          var temp = results[k];
          results[k] = results[k + 1];
          results[k + 1] = temp;
        }
      }
    }
  }

  if (sort == "updated") {
    for (var j = 0; j < results.length - 1; j++) {
      for (var k = 0; k < results.length - 1 - j; k++) {
        var shouldSwap = false;
        var dateA = new Date(results[k].updated_at);
        var dateB = new Date(results[k + 1].updated_at);
        if (order == "desc") {
          if (dateA < dateB) {
            shouldSwap = true;
          }
        } else {
          if (dateA > dateB) {
            shouldSwap = true;
          }
        }
        if (shouldSwap == true) {
          var temp = results[k];
          results[k] = results[k + 1];
          results[k + 1] = temp;
        }
      }
    }
  }

  var container = document.getElementById("repo-grid");
  container.innerHTML = "";

  for (var i = 0; i < results.length; i++) {
    var repo = results[i];
    var fav = false;
    var favList = JSON.parse(localStorage.getItem("favorites") || "[]");
    for (var m = 0; m < favList.length; m++) {
      if (favList[m].id == repo.id) {
        fav = true;
      }
    }

    var updated = new Date(repo.updated_at).toLocaleDateString();
    var card = document.createElement("div");
    card.className = "repo-card";

    var langHtml = "";
    if (repo.language) {
      langHtml = "<span class='lang-badge'>" + repo.language + "</span>";
    }

    var heartIcon = "🤍";
    if (fav == true) {
      heartIcon = "❤️";
    }

    card.innerHTML = "<div class='card-header'><a href='" + repo.html_url + "' target='_blank' class='repo-name'>" + repo.full_name + "</a><button class='fav-btn " + (fav ? "faved" : "") + "' onclick='toggleFavorite(" + repo.id + ")'>" + heartIcon + "</button></div><p class='repo-desc'>" + (repo.description || "No description available.") + "</p><div class='card-meta'>" + langHtml + "<span>⭐ " + repo.stargazers_count.toLocaleString() + "</span><span>🍴 " + repo.forks_count.toLocaleString() + "</span><span>🕒 " + updated + "</span></div>";

    container.appendChild(card);
  }

  var favContainer = document.getElementById("favorites-grid");
  favContainer.innerHTML = "";
  var favList = JSON.parse(localStorage.getItem("favorites") || "[]");
  for (var i = 0; i < favList.length; i++) {
    var repo = favList[i];
    var updated = new Date(repo.updated_at).toLocaleDateString();
    var card = document.createElement("div");
    card.className = "repo-card";

    var langHtml = "";
    if (repo.language) {
      langHtml = "<span class='lang-badge'>" + repo.language + "</span>";
    }

    card.innerHTML = "<div class='card-header'><a href='" + repo.html_url + "' target='_blank' class='repo-name'>" + repo.full_name + "</a><button class='fav-btn faved' onclick='toggleFavorite(" + repo.id + ")'>❤️</button></div><p class='repo-desc'>" + (repo.description || "No description available.") + "</p><div class='card-meta'>" + langHtml + "<span>⭐ " + repo.stargazers_count.toLocaleString() + "</span><span>🍴 " + repo.forks_count.toLocaleString() + "</span><span>🕒 " + updated + "</span></div>";

    favContainer.appendChild(card);
  }
}

function toggleFavorite(id) {
  console.log("toggling favorite for id: " + id)
  var favList = JSON.parse(localStorage.getItem("favorites") || "[]");
  var found = false;

  for (var i = 0; i < favList.length; i++) {
    if (favList[i].id == id) {
      found = true;
      favList.splice(i, 1)
      break
    }
  }

  if (found == false) {
    for (var i = 0; i < allRepos.length; i++) {
      if (allRepos[i].id == id) {
        favList.push(allRepos[i]);
        break
      }
    }
  }

  localStorage.setItem("favorites", JSON.stringify(favList));
  console.log("favorite toggled")
  renderAll();
}

function handleSearch() {
  console.log("handling search...")
  var query = document.getElementById("search-input").value;

  if (query.trim() == "") {
    return
  }

  var urlStr = "https://api.github.com/search/repositories?q=" + encodeURIComponent(query);
  var sort = document.getElementById("sort-select").value;
  var order = document.getElementById("order-select").value;

  urlStr = urlStr + "&sort=" + sort + "&order=" + order + "&per_page=30";

  console.log("fetching from " + urlStr)

  var el = document.getElementById("loading");
  el.classList.toggle("hidden", false);
  document.getElementById("repo-grid").classList.toggle("hidden", true);

  var errorEl = document.getElementById("error-msg");
  errorEl.textContent = "";
  errorEl.classList.toggle("hidden", true);

  setTimeout(function () {
    fetch(urlStr)
      .then(function (response) {
        console.log("got response")
        if (response.status == 403 || response.status == 429) {
          throw new Error("Rate limit reached. Please wait a minute and try again.");
        }
        if (response.ok == false) {
          throw new Error("GitHub API error: " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("got data")
        console.log(data)
        allRepos = data.items;
        x = query
        renderAll();
        el.classList.toggle("hidden", true);
        document.getElementById("repo-grid").classList.toggle("hidden", false);
      })
      .catch(function (err) {
        console.log("error happened")
        console.log(err)
        errorEl.textContent = err.message;
        errorEl.classList.toggle("hidden", false);
        el.classList.toggle("hidden", true);
        document.getElementById("repo-grid").classList.toggle("hidden", false);
      });
  }, 100);
}

function handleFilterChange() {
  console.log("filter changed")
  renderAll();
}

function toggleTheme() {
  console.log("toggling theme...")
  var isDark = document.body.classList.contains("dark");

  if (isDark == true) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    document.getElementById("theme-toggle").textContent = "🌙 Dark Mode";
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("theme-toggle").textContent = "☀️ Light Mode";
  }
}

console.log("app.js loaded")
var savedTheme = localStorage.getItem("theme");
if (savedTheme == "dark") {
  document.body.classList.add("dark");
  document.getElementById("theme-toggle").textContent = "☀️ Light Mode";
} else {
  document.body.classList.remove("dark");
  document.getElementById("theme-toggle").textContent = "🌙 Dark Mode";
}

var el = document.getElementById("favorites-grid");
var favList = JSON.parse(localStorage.getItem("favorites") || "[]");
for (var i = 0; i < favList.length; i++) {
  var repo = favList[i];
  var updated = new Date(repo.updated_at).toLocaleDateString();
  var card = document.createElement("div");
  card.className = "repo-card";
  var langHtml = "";
  if (repo.language) {
    langHtml = "<span class='lang-badge'>" + repo.language + "</span>";
  }
  card.innerHTML = "<div class='card-header'><a href='" + repo.html_url + "' target='_blank' class='repo-name'>" + repo.full_name + "</a><button class='fav-btn faved' onclick='toggleFavorite(" + repo.id + ")'>❤️</button></div><p class='repo-desc'>" + (repo.description || "No description available.") + "</p><div class='card-meta'>" + langHtml + "<span>⭐ " + repo.stargazers_count.toLocaleString() + "</span><span>🍴 " + repo.forks_count.toLocaleString() + "</span><span>🕒 " + updated + "</span></div>";
  el.appendChild(card);
}