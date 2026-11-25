// Timestamp for when the form loaded
document.querySelector("#timestamp").value = new Date().toISOString();

// Open modals
document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.modal).showModal();
  });
});

// Close buttons
document.querySelectorAll("dialog .close").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Click on the backdrop closes the modal too
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});