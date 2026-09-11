const courses = [
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 3, completed: false },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 3, completed: false },
    { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];

const cardContainer = document.querySelector('#course-cards');
const creditTotal = document.querySelector('#credit-total');

function displayCourses(courseList) {
    cardContainer.innerHTML = '';

    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;
        cardContainer.appendChild(card);
    });

    const total = courseList.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `Total credits: ${total}`;
}

// Initial view — show all courses
displayCourses(courses);

// Filter button listeners
document.querySelector('#btn-all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector('#btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});