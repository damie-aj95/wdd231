
// Display the current year
const currentYear = new Date().getFullYear();
document.querySelector("#year").textContent = currentYear;

// Display the last modified date
const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;
