async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error("Error fetching spotlight data:", error);
    }
}

function displaySpotlights(members) {
    // Only gold (3) and silver (2) members qualify for spotlights
    const eligible = members.filter(member => member.membership === 3 || member.membership === 2);

    // Shuffle the eligible array randomly
    const shuffled = eligible.sort(() => Math.random() - 0.5);

    // Pick 2 or 3 at random each time
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, count);

    const container = document.querySelector('#spotlight-cards');
    container.innerHTML = '';

    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        const tierLabel = member.membership === 3 ? 'Gold Member' : 'Silver Member';
        card.classList.add(member.membership === 3 ? 'gold' : 'silver');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" width="150" height="100">
            <h3>${member.name}</h3>
            <p class="tier">${tierLabel}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
        `;

        container.appendChild(card);
    });
}

getSpotlights();