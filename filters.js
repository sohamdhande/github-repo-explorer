function oldFilterByLanguage(repos, language) {
  if (!language) return repos;
  return repos.filter(repo => repo.language === language);
}

function oldFilterByStars(repos, minStars) {
  return repos.filter(repo => repo.stargazers_count >= minStars);
}

function oldSortRepos(repos, sortBy, order) {
  return repos.sort((a, b) => {
    let valA, valB;

    if (sortBy === "stars") { valA = a.stargazers_count; valB = b.stargazers_count; }
    if (sortBy === "forks") { valA = a.forks_count; valB = b.forks_count; }
    if (sortBy === "updated") { valA = new Date(a.updated_at); valB = new Date(b.updated_at); }

    return order === "desc" ? valB - valA : valA - valB;
  });
}

function oldSearchLocally(repos, query) {
  const q = query.toLowerCase();
  return repos.filter(repo =>
    repo.name.toLowerCase().includes(q) ||
    repo.description?.toLowerCase().includes(q)
  );
}

console.log("filters.js loaded but mostly unused")