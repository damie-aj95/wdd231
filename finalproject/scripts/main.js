import { fetchTopAnime } from './api.js';
import { renderAnimeCards } from './cards.js';

let animeCache = [];

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Navigation Toggle Logic & Dynamic aria-expanded State
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('nav-open');
    });
  }

  // 2. Index Page Search & Pill Filtering
  const animeContainer = document.getElementById('anime-container');
  if (animeContainer) {
    animeCache = await fetchTopAnime();
    renderAnimeCards(animeCache, animeContainer);

    // Search Input Listener
    const searchInput = document.getElementById('anime-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        const searchResults = animeCache.filter(item => 
          item.title.toLowerCase().includes(query) || 
          (item.title_english && item.title_english.toLowerCase().includes(query))
        );
        renderAnimeCards(searchResults, animeContainer);
      });
    }

    // Genre Pill Buttons Listener (Case-Insensitive Match)
    const pillContainer = document.getElementById('filter-pills');
    if (pillContainer) {
      pillContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pill')) return;

        pillContainer.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const selectedGenre = e.target.dataset.genre.toLowerCase();

        if (selectedGenre === 'all') {
          renderAnimeCards(animeCache, animeContainer);
        } else {
          // Case-insensitive comparison between pill data attribute and Jikan genres array
          const filtered = animeCache.filter(item => 
            item.genres && item.genres.some(g => g.name.toLowerCase() === selectedGenre)
          );
          renderAnimeCards(filtered, animeContainer);
        }
      });
    }
  }

  // 3. Thanks Action Page Parameter Parsing
  const submissionDetails = document.getElementById('submission-details');
  if (submissionDetails) {
    initThanksPage(submissionDetails);
  }
});

function initThanksPage(container) {
  const params = new URLSearchParams(window.location.search);

  if (!params.has('title')) {
    container.innerHTML = '<p>No submission data found. Please submit the recommendation form first.</p>';
    return;
  }

  const title = params.get('title') || 'N/A';
  const genre = params.get('genre') || 'N/A';
  const episodes = params.get('episodes') || 'N/A';
  const score = params.get('score') || 'N/A';
  const studio = params.get('studio') || 'N/A';
  const userName = params.get('user_name') || 'N/A';
  const email = params.get('email') || 'N/A';
  const notes = params.get('notes') || 'None provided';

  container.innerHTML = `
    <dl class="summary-list">
      <dt>Anime Title:</dt>
      <dd><strong>${title}</strong></dd>

      <dt>Primary Genre:</dt>
      <dd>${genre}</dd>

      <dt>Total Episodes:</dt>
      <dd>${episodes}</dd>

      <dt>Suggested Score:</dt>
      <dd>⭐ ${score} / 10</dd>

      <dt>Animation Studio:</dt>
      <dd>${studio}</dd>

      <dt>Submitted By:</dt>
      <dd>${userName} (${email})</dd>

      <dt>Rationale / Notes:</dt>
      <dd>${notes}</dd>
    </dl>
  `;
}