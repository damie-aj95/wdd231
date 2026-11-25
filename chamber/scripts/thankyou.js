const params = new URLSearchParams(window.location.search);
const fields = ["fname", "lname", "email", "phone", "business", "timestamp"];

fields.forEach((id) => {
  const element = document.getElementById(id);
  let value = params.get(id) || "Not provided";

  if (id === "timestamp" && params.get(id)) {
    value = new Date(value).toLocaleString("en-NG", {
      dateStyle: "long",
      timeStyle: "short"
    });
  }

  element.textContent = value;
});