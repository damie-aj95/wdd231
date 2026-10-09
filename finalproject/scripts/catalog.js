import { fetchTopAnime } from './api.js';
import { renderAnimeCards } from './cards.js';

let animeCache = [];

// Unified state tracker
const state = {
  query: '',
  genre: 'all',
  sort: 'score-desc',
  favoritesOnly: false
};

const animeContainer = document.getElementById('anime-container');

if (animeContainer) {
  initCatalog();
}

async function initCatalog() {
  const data = await fetchTopAnime();

  if (data === null) {
    animeContainer.innerHTML = `<p class="error-msg">⚠️ Couldn't load anime titles. Please check your internet connection and try again later.</p>`;
    return;
  }

  animeCache = data;
  applyFilters();

  // 1. Text Search Input Listener
  const searchInput = document.getElementById('anime-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // 2. Genre Filter Pills Listener
  const pillContainer = document.getElementById('filter-pills');
  if (pillContainer) {
    pillContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('pill')) return;

      pillContainer.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      state.genre = e.target.dataset.genre.toLowerCase();
      applyFilters();
    });
  }

  // 3. Select Dropdown Listeners (browse.html)
  const genreFilter = document.getElementById('genre-filter');
  if (genreFilter) {
    genreFilter.addEventListener('change', (e) => {
      state.genre = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      applyFilters();
    });
  }

  // 4. Favorites Only Checkbox
  const favCheckbox = document.getElementById('favorites-only');
  if (favCheckbox) {
    favCheckbox.addEventListener('change', (e) => {
      state.favoritesOnly = e.target.checked;
      applyFilters();
    });
  }
}

/**
 * Filters and sorts anime array based on single state source without mutating cache.
 */
function applyFilters() {
  let result = [...animeCache];

  // Text query filter
  if (state.query) {
    result = result.filter(item => 
      item.title.toLowerCase().includes(state.query) || 
      (item.title_english && item.title_english.toLowerCase().includes(state.query))
    );
  }

  // Genre filter
  if (state.genre !== 'all') {
    result = result.filter(item => 
      item.genres && item.genres.some(g => g.name.toLowerCase() === state.genre)
    );
  }

  // Favorites filter
  if (state.favoritesOnly) {
    const favorites = JSON.parse(localStorage.getItem('anime_explorer_favorites') || '[]');
    result = result.filter(item => favorites.includes(item.mal_id));
  }

  // Immutable sorting using array clone
  if (state.sort === 'score-desc') {
    result.sort((a, b) => (b.score || 0) - (a.score || 0));
  } else if (state.sort === 'episodes-asc') {
    result.sort((a, b) => (a.episodes || 0) - (b.episodes || 0));
  }

  renderAnimeCards(result, animeContainer);
}