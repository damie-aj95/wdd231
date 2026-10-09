import { isFavorite, toggleFavorite } from './storage.js';
import { openAnimeModal } from './modal.js';

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function createAnimeCardHTML(anime) {
  const favState = isFavorite(anime.mal_id);
  const favIcon = favState ? '❤️' : '🤍';
  const ariaPressed = favState ? 'true' : 'false';
  
  const displayTitle = anime.title_english || anime.title || 'Anime Title';
  const safeTitle = escapeAttr(displayTitle);
  
  const genres = anime.genres && anime.genres.length > 0 
    ? anime.genres.map(g => g.name).slice(0, 2).join(', ') 
    : 'N/A';
    
  const studio = anime.studios && anime.studios.length > 0 
    ? anime.studios[0].name 
    : 'N/A';
  
  const imageUrl = anime.images?.webp?.small_image_url || anime.images?.jpg?.small_image_url;

  return `
    <article class="anime-card" data-id="${anime.mal_id}">
      <div class="card-image-wrap">
        <img src="${imageUrl}" alt="${safeTitle}" loading="lazy" width="225" height="320" class="anime-poster">
        <button class="fav-btn" data-id="${anime.mal_id}" aria-pressed="${ariaPressed}" aria-label="${favState ? 'Remove ' + safeTitle + ' from favorites' : 'Save ' + safeTitle + ' to favorites'}">
          ${favIcon}
        </button>
      </div>
      <div class="card-content">
        <h3>${safeTitle}</h3>
        <ul class="card-meta">
          <li><strong>Score:</strong> ⭐ ${anime.score || 'N/A'}</li>
          <li><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</li>
          <li><strong>Genre:</strong> ${genres}</li>
          <li><strong>Studio:</strong> ${studio}</li>
        </ul>
        <button class="details-btn" data-id="${anime.mal_id}">View Details</button>
      </div>
    </article>
  `;
}

export function renderAnimeCards(animeList, container) {
  if (!container) return;

  if (!animeList || !Array.isArray(animeList) || animeList.length === 0) {
    container.innerHTML = `<p class="no-results">No anime available to display.</p>`;
    return;
  }

  container.innerHTML = animeList.map(anime => createAnimeCardHTML(anime)).join('');

  // Attach Image Error Fallback Event Listener (prevents broken layout/CORB visual bugs)
  container.querySelectorAll('.anime-poster').forEach(img => {
    img.addEventListener('error', () => {
      // Fallback SVG data URI placeholder
      img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="225" height="320" viewBox="0 0 225 320"><rect width="100%" height="100%" fill="%231e1b4b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="16">Poster Unavailable</text></svg>';
    });
  });

  // Attach favorite event listeners
  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id, 10);
      const isSaved = toggleFavorite(id);
      
      const card = btn.closest('.anime-card');
      const title = card ? card.querySelector('h3').textContent : 'anime';

      btn.textContent = isSaved ? '❤️' : '🤍';
      btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      btn.setAttribute('aria-label', isSaved ? `Remove ${title} from favorites` : `Save ${title} to favorites`);
    });
  });

  // Attach modal detail view listeners
  container.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const selected = animeList.find(item => item.mal_id === id);
      if (selected) openAnimeModal(selected);
    });
  });
}