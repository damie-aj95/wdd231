const API_KEY = "e5bd76dd0c27b9d4f063dd732145348a";
const LAT = 6.5244;
const LON = 3.3792;
const base = "https://api.openweathermap.org/data/2.5";

const tempEl = document.querySelector("#current-temp");
const descEl = document.querySelector("#current-desc");
const forecastEl = document.querySelector("#forecast");

async function getWeather() {
  try {
    const [curRes, foreRes] = await Promise.all([
      fetch(`${base}/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`),
      fetch(`${base}/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`)
    ]);
    if (!curRes.ok || !foreRes.ok) throw new Error("Weather request failed");

    const current = await curRes.json();
    const forecast = await foreRes.json();
    showCurrent(current);
    showForecast(forecast);
  } catch (error) {
    console.error(error);
    tempEl.textContent = "Weather is unavailable right now.";
  }
}

function showCurrent(data) {
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  const desc = data.weather[0].description;
  descEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

function showForecast(data) {
  const today = new Date().toISOString().slice(0, 10);
  const days = data.list
    .filter((item) => item.dt_txt.includes("12:00:00") && !item.dt_txt.startsWith(today))
    .slice(0, 3);

  forecastEl.innerHTML = days
    .map((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString("en-NG", { weekday: "long" });
      return `<li><strong>${day}:</strong> ${Math.round(item.main.temp)}°C</li>`;
    })
    .join("");
}

getWeather();