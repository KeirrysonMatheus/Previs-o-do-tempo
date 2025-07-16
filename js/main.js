
import { convertUnity } from './conversion.js';
import { getDataByName, getDataByCoord , globalData } from './api.js';
import { changeTheme, initTheme } from './theme.js';
import { getPos }  from './currentPosition.js';

let feelsLikeUnity = 'Celsius'
let tempUnity = 'Celsius'
const feelsLikeConvert = document.querySelector('#feelsLikeConvert')
const tempConvert = document.querySelector('#tempToFah')
const inputCity = document.querySelector('#findCity');
const searchBtn = document.getElementById('searchBtn');
const themeBtn = document.querySelector('#changeThemeIcon');

document.addEventListener('DOMContentLoaded', () => {
  inputCity.focus();
  initTheme();
  getPos()
});

searchBtn.addEventListener('click', getDataByName);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getDataByName();
  }
});

themeBtn.addEventListener('click', changeTheme);

tempConvert.addEventListener("click", () => {
  const currentValue = parseFloat(temperature.textContent); 
  tempUnity = convertUnity(currentValue, "temp", tempConvert, tempUnity)
});

feelsLikeConvert.addEventListener("click", () => {
  const currentValue = parseFloat(feelsLike.textContent);
  feelsLikeUnity = convertUnity(currentValue, "feelsLike", feelsLikeConvert, feelsLikeUnity);
});
