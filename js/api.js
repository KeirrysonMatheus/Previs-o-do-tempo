import { showData } from './ui.js';

const inputCity = document.querySelector('#findCity');
const cityName = document.getElementById('cityName');
const mapBtn = document.getElementById('map');
const loader = document.querySelector('#loading');
const cards = document.getElementsByClassName('card');

let globalData = null;

async function searchCity(city) {
  const WeatherAPIKey = 'aa776d709be6648d781129554c5dedf5';
  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
    .then(res => res.json())
    .catch(error => {
      console.error(error);
    });
  globalData = data;
  showData(data);
}

function getData() {
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

  searchCity(city);
}

export { searchCity, getData , globalData};
