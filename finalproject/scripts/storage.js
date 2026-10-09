const STORAGE_KEY = 'anime_explorer_favorites';

export function getFavorites() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function toggleFavorite(animeId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(animeId);
  let isSaved = false;

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(animeId);
    isSaved = true;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return isSaved;
}

export function isFavorite(animeId) {
  return getFavorites().includes(animeId);
}