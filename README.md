# 🔭 GitHub Repository Explorer
A sleek, developer-focused web app to search, filter, and explore GitHub repositories in real time — powered by the GitHub REST API.

![Project Status](https://img.shields.io/badge/status-in--progress-yellow)
![Milestone](https://img.shields.io/badge/milestone-1%20%E2%80%94%20Planning-blue)
![API](https://img.shields.io/badge/API-GitHub%20REST%20v3-181717?logo=github)

---

## 📌 Project Overview

**GitHub Repository Explorer** is a web application that lets developers search and explore GitHub repositories with powerful filtering and sorting capabilities. Instead of navigating GitHub's native search, users get a clean, fast, and customizable dashboard to discover repositories by language, stars, forks, and more.

This project was built as part of a graded JavaScript + API integration assignment, with a focus on real-world API consumption, array higher-order functions, and responsive UI design.

---

## 🌐 API Used

**[GitHub REST API v3](https://docs.github.com/en/rest)**

- **Base URL:** `https://api.github.com`
- **Key Endpoint:** `GET /search/repositories?q={query}&sort={sort}&order={order}`
- **Authentication:** Not required for public read-only access (rate limit: 10 requests/min unauthenticated)
- **Why this API?** Free, no API key needed, rich structured data (stars, forks, language, topics, last updated), and developer-relevant content

---

## ✨ Planned Features

### Core Features (Required)
| Feature | Description | HOF Used |
|---|---|---|
| 🔍 **Search** | Search repos by keyword, topic, or author | `filter()`, `map()` |
| 🏷️ **Filter by Language** | Filter results by programming language | `filter()` |
| ⭐ **Filter by Stars** | Filter repos above a minimum star count | `filter()` |
| 🔃 **Sort** | Sort by stars, forks, or last updated (asc/desc) | `sort()` |
| ❤️ **Favorites** | Save/unsave repos to a personal favorites list | `find()`, `filter()` |
| 🌙 **Dark / Light Mode** | Toggle between dark and light themes | — |

### Bonus Features (Planned)
| Feature | Description |
|---|---|
| ⏱️ **Debouncing** | Prevents excessive API calls on each search keystroke |
| 📄 **Pagination** | Navigate through large result sets page by page |
| 💾 **Local Storage** | Persist favorites and theme preference across sessions |
| 🔢 **Result Count Badge** | Shows total number of repos matching the current query |
| 📊 **Language Badge** | Color-coded language labels on each repo card |

---

## 🛠️ Technologies

- **HTML5** — Semantic structure
- **CSS3** — Custom styling, responsive layout, CSS variables for theming
- **Vanilla JavaScript (ES6+)** — API calls, DOM manipulation, HOFs
- **GitHub REST API** — Data source
- **`fetch` API** — For asynchronous HTTP requests
- **localStorage** — For persisting favorites and preferences

> 💡 No frameworks required. Tailwind CSS may be optionally used for utility styling.

---

## 📁 Project Structure (Planned)
```
github-repo-explorer/
├── index.html          # Main HTML structure
├── style.css           # Stylesheet (themes, layout, cards)
├── app.js              # Main JS entry point
├── api.js              # GitHub API fetch logic
├── ui.js               # DOM rendering functions
├── filters.js          # Search, filter, sort logic using HOFs
├── storage.js          # localStorage utilities (favorites, theme)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No build tools or installations required

### Running Locally
```bash
# 1. Clone the repository
git clone https://github.com/sohamdhande/github-repo-explorer.git

# 2. Navigate into the project folder
cd github-repo-explorer

# 3. Open index.html in your browser
# Option A: Double-click index.html
# Option B: Use a local server (recommended)
npx serve .
```

> **Note:** GitHub API allows 10 unauthenticated requests/minute. For higher limits, you can add a Personal Access Token (PAT) in `api.js`.

---

## 📅 Milestones

| Milestone | Description | Deadline | Status |
|---|---|---|---|
| 1 | Project setup, idea finalization, README | 23rd March | ✅ Done |
| 2 | API integration, dynamic data display, responsiveness | 1st April | 🔲 Pending |
| 3 | Search, filter, sort, dark mode, favorites | 8th April | 🔲 Pending |
| 4 | Final cleanup, documentation, deployment | 10th April | 🔲 Pending |

---

## 🎯 How HOFs Are Used

This project strictly avoids traditional `for`/`while` loops for data operations. All searching, filtering, and sorting use JavaScript Array Higher-Order Functions:
```js
// Example: Filter repos by language
const filtered = repos.filter(repo => repo.language === selectedLanguage);

// Example: Sort by stars (descending)
const sorted = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

// Example: Search by keyword in name or description
const results = repos.filter(repo =>
  repo.name.toLowerCase().includes(query) ||
  repo.description?.toLowerCase().includes(query)
);
```

---

## 🌍 Deployment

The project will be deployed using **GitHub Pages** or **Vercel** before the final submission on 10th April.

Live link will be added here once deployed.

---

## 👤 Author

**Soham Dhande**  
B.Tech Computer Science (AI/ML) — Ajeenkya DY Patil University, Pune

---

## 📄 License

This project is for academic purposes.