/**
 * Escapes special characters to prevent XSS injection attacks.
 * @param {string} str 
 * @returns {string} Sanitized string
 */
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const container = document.getElementById('submission-details');

if (container) {
  const params = new URLSearchParams(window.location.search);

  if (!params.has('title') || !params.get('title').trim()) {
    container.innerHTML = '<p class="no-submission">No submission data found. Please submit an anime recommendation through our <a href="recommend.html">recommendation form</a>.</p>';
  } else {
    const title = escapeHTML(params.get('title'));
    const genre = escapeHTML(params.get('genre'));
    const episodes = escapeHTML(params.get('episodes'));
    const score = escapeHTML(params.get('score'));
    const studio = escapeHTML(params.get('studio') || 'None provided');
    const userName = escapeHTML(params.get('user_name'));
    const email = escapeHTML(params.get('email'));
    const notes = escapeHTML(params.get('notes') || 'None provided');

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
}