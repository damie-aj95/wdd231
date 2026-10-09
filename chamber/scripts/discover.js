const gridElement = document.querySelector('#discover-grid');
const messageElement = document.querySelector('#visit-message');

// --- 1. Fetch & Display Discover Cards ---
async function fetchDiscoverData() {
  try {
    const response = await fetch('data/discover.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const places = await response.json();
    displayPlaces(places);
  } catch (error) {
    console.error('Error fetching discover data:', error);
  }
}

function displayPlaces(places) {
  gridElement.innerHTML = ''; // Clear existing content

  places.forEach((place) => {
    const card = document.createElement('section');
    card.classList.add('discover-card');

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    
    // Ensure relative path matches folder layout
    img.src = place.image;
    img.alt = place.name;
    img.loading = 'lazy'; // Native lazy loading
    img.width = 300;
    img.height = 200;

    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = place.address;

    const description = document.createElement('p');
    description.textContent = place.description;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Learn More';

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    gridElement.appendChild(card);
  });
}

// --- 2. LocalStorage Visit Message Handler ---
function handleVisitMessage() {
  if (!messageElement) return;

  const textParagraph = messageElement.querySelector('p');
  const closeBtn = messageElement.querySelector('button');
  const lastVisit = localStorage.getItem('lastVisitTimestamp');
  const now = Date.now();
  const msInDay = 86400000;

  if (!lastVisit) {
    textParagraph.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const daysBetween = Math.floor((now - parseInt(lastVisit, 10)) / msInDay);

    if (daysBetween < 1) {
      textParagraph.textContent = 'Back so soon! Awesome!';
    } else {
      const dayWord = daysBetween === 1 ? 'day' : 'days';
      textParagraph.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
    }
  }

  // Display message and update stored timestamp
  messageElement.removeAttribute('hidden');
  localStorage.setItem('lastVisitTimestamp', now.toString());

  // Close message listener
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      messageElement.setAttribute('hidden', '');
    });
  }
}

// Initialize on script load
fetchDiscoverData();
handleVisitMessage();