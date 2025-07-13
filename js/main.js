
import { convertToF } from './conversion.js';
import { getData , globalData} from './api.js';
import { changeTheme, initTheme } from './theme.js';

const feelsLikeConvert = document.querySelector('#feelsLikeConvert')
const tempConvert = document.querySelector('#tempToFah')
const inputCity = document.querySelector('#findCity');
const searchBtn = document.getElementById('searchBtn');
const themeBtn = document.querySelector('#changeThemeIcon');

document.addEventListener('DOMContentLoaded', () => {
  inputCity.focus();
  initTheme();
});

searchBtn.addEventListener('click', getData);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getData();
  }
});

themeBtn.addEventListener('click', changeTheme);
tempConvert.addEventListener('click', () => {
  convertToF(Math.ceil(globalData.main.temp), 'temp');
});

feelsLikeConvert.addEventListener('click', () => {
  convertToF(Math.ceil(globalData.main.feels_like), 'feelsLike', );
});
