import { convertUnity } from './conversion.js';
import { getDataByName, getForecastByName } from './api.js';
import { changeTheme, initTheme } from './theme.js';
import { getPos } from './currentPosition.js';
import { showForecast } from './ui.js';
const inputCity = document.querySelector('#findCity');
const searchBtn = document.getElementById('searchBtn');
// const themeBtn = document.querySelector('#changeThemeIcon'); // REMOVA ESTA LINHA

document.addEventListener('DOMContentLoaded', () => {
  inputCity.focus();
  initTheme();
  getPos()
});

async function handleSearch() {
  await getDataByName();
  const forecast = await getForecastByName();
  if (forecast && forecast.cod === "200") {
    showForecast(forecast);
  }
}

searchBtn.addEventListener('click', handleSearch);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// themeBtn.addEventListener('click', changeTheme); // REMOVA ESTA LINHA