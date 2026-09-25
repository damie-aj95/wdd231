const apiKey = "e5bd76dd0c27b9d4f063dd732145348a";
const lat = 6.5244;
const lon = 3.3792;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
}

function displayCurrentWeather(data) {
    const currentDiv = document.querySelector('#current-weather');
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    currentDiv.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" width="60" height="60">
        <p class="temp">${temp}&deg;C</p>
        <p class="description">${description}</p>
    `;
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayForecast(data) {
    const forecastDiv = document.querySelector('#forecast');
    forecastDiv.innerHTML = '<h3>3-Day Forecast</h3>';

    // The forecast API returns data every 3 hours - grab one entry per day around midday
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);

        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <p class="day-name">${dayName}</p>
                <p class="day-temp">${temp}&deg;C</p>
            </div>
        `;
    });
}

getCurrentWeather();
getForecast();