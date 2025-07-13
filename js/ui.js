const cityName = document.getElementById('cityName');
const mapBtn = document.getElementById('map');
const container = document.getElementById('container');
const popup = document.getElementById('PopupIframe');
const closeBtn = document.getElementById('closebtn');
const iframe = document.getElementById('iframe');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const temperature = document.querySelector('#temperature');
const feelsLike = document.querySelector('#feelsLike');
const clouds = document.querySelector('#clouds');
const cloudsIcon = document.querySelector('#cloudsIcon');
const cards = document.getElementsByClassName('card');
const loader = document.querySelector('#loading');

function showData(data) {
  if (data.cod === '404' || data.cod === 404) {
    loader.classList.add('d-none');
    Array.from(cards).forEach(e => e.classList.add('d-none'));
    mapBtn.classList.add('d-none');
    cityName.innerHTML = 'Cidade não encontrada.';
    clearFields();
    return;
  }

  let popupInitialized = false;
  mapBtn.addEventListener('click', () => {
    popup.classList.remove('d-none');
    if (!popupInitialized) {
      document.addEventListener('keydown', (event) => {
        if (event.key == 'Escape') {
          popup.classList.add('d-none');
        }
      });
      closeBtn.addEventListener('click', () => {
        popup.classList.add('d-none');
        container.classList.remove('opacity-50');
      });
      popupInitialized = true;
    }
    iframe.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d400934.92240465875!2d${data.coord.lon}!3d${data.coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1751926749344!5m2!1spt-BR!2sbr`;
  });

  const unity = ' m/s';
  loader.classList.add('d-none');
  Array.from(cards).forEach(e => e.classList.remove('d-none'));
  cityName.innerHTML = 'Clima em: ' + data.name + ', ' + data.sys.country;
  wind.innerHTML = data.wind.speed + unity.toLowerCase();
  humidity.innerHTML = data.main.humidity + '%';
  temperature.innerHTML = Math.ceil(data.main.temp) + '°C';
  feelsLike.innerHTML = Math.ceil(data.main.feels_like) + '°C';

  if (mapBtn.classList.contains('d-none')) {
    mapBtn.classList.remove('d-none');
    mapBtn.classList.add('d-block');
  }

  clouds.innerHTML = '';
  const icon = document.createElement('img');
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;
  icon.classList.add('me-2');
  clouds.appendChild(icon);
  clouds.innerHTML += data.weather[0].description;
}

function clearFields() {
  temperature.textContent = '';
  feelsLike.textContent = '';
  humidity.textContent = '';
  wind.textContent = '';
  clouds.innerHTML = '';
  if (cloudsIcon && cloudsIcon.src) {
    cloudsIcon.src = '';
  }
}
export { showData, clearFields , temperature , feelsLike};