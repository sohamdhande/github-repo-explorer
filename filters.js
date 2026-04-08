let filterByLanguage = (repos, language) => {
  if (!language) return repos;
  return repos.filter(repo=>repo.language === language);
};
const filterByStars = (repos, minStars) => {
    return repos.filter(repo => repo.stargazers_count >= minStars);
}

let sortRepos = (repos, sortBy, order) => {
  return repos.sort((a,b) => {
    let valA, valB;
    if (sortBy === "stars") {
      valA = a.stargazers_count;
      valB = b.stargazers_count;
    } else if (sortBy === "forks") {
      valA = a.forks_count;
      valB = b.forks_count;
    } else if (sortBy === "updated") {
      valA = new Date(a.updated_at).getTime();
      valB = new Date(b.updated_at).getTime();
    }
    return order === "desc" ? valB - valA : valA - valB;
  });
};
const searchLocally = (repos, query) => {
    console.log("checking search for " + query);
    const q = query.toLowerCase();
    let filteredResults = repos.filter((repo) => 
        repo.name.toLowerCase().includes(q) || 
        repo.description?.toLowerCase().includes(q)
    );
    return filteredResults;
}