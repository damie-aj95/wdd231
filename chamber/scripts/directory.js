const cardContainer = document.querySelector('#directory-cards');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

async function getMemberData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    cardContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        // Add a class based on membership level for styling
        if (member.membership === 3) card.classList.add('gold');
        if (member.membership === 2) card.classList.add('silver');
        if (member.membership === 1) card.classList.add('member');

        card.innerHTML = `
            <h2>${member.name}</h2>
            <p class="tagline">${member.tagline}</p>
            <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="200" height="150">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
        `;

        cardContainer.appendChild(card);
    });
}

// Grid / List view toggle
gridBtn.addEventListener('click', () => {
    cardContainer.classList.remove('list-view');
    cardContainer.classList.add('grid-view');
});

listBtn.addEventListener('click', () => {
    cardContainer.classList.remove('grid-view');
    cardContainer.classList.add('list-view');
});

// Initial load
getMemberData();