// Display the current year in the footer copyright
document.querySelector('#year').textContent = new Date().getFullYear();

// Display the date this document was last modified
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

