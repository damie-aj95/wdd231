/**
 * Opens modal dialog showing detailed anime info with accessible aria-labelledby.
 * @param {Object} anime 
 */
export function openAnimeModal(anime) {
  const dialog = document.querySelector('#anime-modal');
  if (!dialog) return;

  const titleId = `modal-title-${anime.mal_id}`;
  dialog.setAttribute('aria-labelledby', titleId);

  const genres = anime.genres ? anime.genres.map(g => g.name).join(', ') : 'N/A';
  const studios = anime.studios ? anime.studios.map(s => s.name).join(', ') : 'N/A';
  const posterUrl = anime.images?.webp?.image_url || anime.images?.jpg?.image_url;

  dialog.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" id="close-modal" aria-label="Close dialog">&times;</button>
      <div class="modal-body">
        <img src="${posterUrl}" alt="${anime.title_english || anime.title}" loading="lazy" width="200" height="290">
        <div class="modal-info">
          <h3 id="${titleId}">${anime.title_english || anime.title}</h3>
          <p><strong>Japanese Title:</strong> ${anime.title_japanese || 'N/A'}</p>
          <p><strong>Community Score:</strong> ⭐ ${anime.score || 'N/A'} / 10</p>
          <p><strong>Episodes:</strong> ${anime.episodes || 'Unknown'}</p>
          <p><strong>Genres:</strong> ${genres}</p>
          <p><strong>Studio:</strong> ${studios}</p>
          <p style="margin-top: 0.5rem;"><strong>Synopsis:</strong> ${anime.synopsis || 'No synopsis available.'}</p>
        </div>
      </div>
    </div>
  `;

  dialog.showModal();

  document.querySelector('#close-modal').addEventListener('click', () => {
    dialog.close();
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}