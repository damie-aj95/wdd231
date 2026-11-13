
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

const membersURL = "data/members.json";

// Load business members from the JSON file
async function getMembers() {
  try {
    const response = await fetch(membersURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Unable to load business members:", error);
    membersContainer.textContent =
      "Sorry, the business directory could not be loaded.";
  }
}

// Create and display each business card
function displayMembers(members) {
  membersContainer.replaceChildren();

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = "lazy";
    image.width = 200;
    image.height = 150;

    const name = document.createElement("h2");
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
    membership.textContent = `Membership Level: ${member.membershipLevel}`;

    const details = document.createElement("div");
    details.classList.add("member-details");

    details.append(address, phone, website, membership);
    card.append(image, name, tagline, details);

    membersContainer.appendChild(card);
  });
}

// Switch to Grid view
gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");

  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

// Switch to List view
listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");

  listButton.classList.add("active");
  gridButton.classList.remove("active");
});

// Load the members when the page opens
getMembers();
