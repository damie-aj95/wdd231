const STORAGE_KEY = 'chamber-last-visit';
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getMessage(lastVisit, now) {
    if (!lastVisit) {
        return 'Welcome! Let us know if you have any questions.';
    }

    const days = Math.floor((now - lastVisit) / MS_PER_DAY);

    if (days < 1) {
        return 'Back so soon! Awesome!';
    }

    return `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
}

export function showVisitMessage(box) {
    const now = Date.now();
    let lastVisit = null;

    try {
        lastVisit = Number(localStorage.getItem(STORAGE_KEY)) || null;
    } catch (error) {
        console.warn('localStorage unavailable:', error);
    }

    box.querySelector('p').textContent = getMessage(lastVisit, now);
    box.hidden = false;

    box.querySelector('button').addEventListener('click', () => {
        box.hidden = true;
    });

    try {
        localStorage.setItem(STORAGE_KEY, now);
    } catch (error) {
        console.warn('Could not save visit date:', error);
    }
}