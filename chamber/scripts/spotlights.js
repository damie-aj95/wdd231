const spotlightContainer = document.querySelector("#spotlight-cards");
const membersURL = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const members = await response.json();

    // Gold and silver only, shuffled, then take 3
    const eligible = members.filter((member) => {
      const level = getLevelName(member.membershipLevel);
      return level === "Gold" || level === "Silver";
    });

    const spotlights = shuffle(eligible).slice(0, 3);
    displaySpotlights(spotlights);
  } catch (error) {
    console.error("Unable to load spotlights:", error);
    spotlightContainer.textContent = "Spotlights are unavailable right now.";
  }
}

// Works if the JSON uses numbers (3, 2, 1) or words ("Gold", "Silver")
function getLevelName(level) {
  const value = String(level).toLowerCase();
  if (value === "3" || value === "gold") return "Gold";
  if (value === "2" || value === "silver") return "Silver";
  return "Member";
}

// Fisher-Yates shuffle so each page load picks differently
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(members) {
  spotlightContainer.replaceChildren();

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = "lazy";
    image.width = 200;
    image.height = 150;

    const name = document.createElement("h3");
    name.textContent = member.name;

    const tagline = document.createElement("p");
    tagline.classList.add("tagline");
    tagline.textContent = member.tagline;

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    const membership = document.createElement("p");
    membership.textContent = `Membership Level: ${getLevelName(member.membershipLevel)}`;

    const details = document.createElement("div");
    details.classList.add("member-details");

    details.append(address, phone, website, membership);
    card.append(image, name, tagline, details);

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();