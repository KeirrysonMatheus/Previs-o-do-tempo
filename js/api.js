import {showForecast, showData, clearFields } from './ui.js';

const inputCity = document.querySelector('#findCity');
const cityName = document.getElementById('cityName');
const mapBtn = document.getElementById('map');
const loader = document.querySelector('#loading');
const cards = document.getElementsByClassName('card');
const WeatherAPIKey = 'aa776d709be6648d781129554c5dedf5';

let globalData = null;
let globalForecast = null;

async function getDataByName() {
  loader.classList.remove('d-none');
  const city = inputCity.value.trim();

  if (city === '') {
    loader.classList.add('d-none');
    cityName.innerHTML = 'Insira uma cidade.';
    mapBtn.classList.add('d-none');
    Array.from(cards).forEach(e => e.classList.add('d-none'));
    clearFields();
    return;
  }

  try {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
      .then(res => res.json());
    globalData = data;
    showData(data);
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add('d-none');
  }
}


async function getDataByCoord(pos) {
  loader.classList.remove('d-none');
  try {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
      .then(res => res.json());
    globalData = dados;
    showData(dados);

    // Buscar previsão de 5 dias por coordenadas
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
      .then(res => res.json());
    globalForecast = forecast;
    if (forecast && forecast.cod === "200") {
      showForecast(forecast);
    }
  } catch (e) {
    console.error(e);
  } finally {
    loader.classList.add('d-none');
  }
}
async function getForecastByName() {
  loader.classList.remove('d-none');
  const city = inputCity.value.trim();

  if (city === '') {
    loader.classList.add('d-none');
    return;
  }

  try {
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
      .then(res => res.json());
    globalForecast = forecast;
    return forecast;
  } catch (error) {
    console.error(error);
  } finally {
    loader.classList.add('d-none');
  }
}

export {globalForecast, getDataByName, globalData, getDataByCoord, WeatherAPIKey, getForecastByName };