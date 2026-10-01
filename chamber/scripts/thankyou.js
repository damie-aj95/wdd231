const params = new URLSearchParams(window.location.search);

document.querySelector('#out-first-name').textContent = params.get('firstName') || '';
document.querySelector('#out-last-name').textContent = params.get('lastName') || '';
document.querySelector('#out-email').textContent = params.get('email') || '';
document.querySelector('#out-phone').textContent = params.get('phone') || '';
document.querySelector('#out-business-name').textContent = params.get('businessName') || '';

const rawTimestamp = params.get('timestamp');
if (rawTimestamp) {
    const date = new Date(rawTimestamp);
    document.querySelector('#out-timestamp').textContent = date.toLocaleString();
} else {
    document.querySelector('#out-timestamp').textContent = '';
}