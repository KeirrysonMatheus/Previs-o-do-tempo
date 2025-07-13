
import { convertToF } from './conversion.js';
import { getDataByName, getDataByCoord , globalData } from './api.js';
import { changeTheme, initTheme } from './theme.js';
import { getPos }  from './currentPosition.js';


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
tempConvert.addEventListener('click', () => {
  convertToF(Math.ceil(globalData.main.temp), 'temp');
});

feelsLikeConvert.addEventListener('click', () => {
  convertToF(Math.ceil(globalData.main.feels_like), 'feelsLike', );
});
