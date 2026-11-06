// Replace with the official array from Canvas, then set completed: true on yours.
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: false },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false }
];

const list = document.querySelector("#course-list");
const creditsEl = document.querySelector("#credits");
const buttons = document.querySelectorAll(".filters button");

function render(items) {
  list.innerHTML = "";
  items.forEach(c => {
    const div = document.createElement("div");
    div.className = "course" + (c.completed ? " completed" : "");
    div.textContent = `${c.subject} ${c.number}`;
    div.title = c.title;
    list.appendChild(div);
  });
  const total = items.reduce((sum, c) => sum + c.credits, 0);
  creditsEl.textContent = `The total credits for courses listed above is ${total}`;
}

buttons.forEach(b => b.addEventListener("click", () => {
  buttons.forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  const f = b.dataset.filter;
  render(f === "all" ? courses : courses.filter(c => c.subject === f));
}));

render(courses);