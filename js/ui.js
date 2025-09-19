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
const weatherInfo = document.getElementById('weatherInfo')
const loader = document.querySelector('#loading');
const tempImg = document.querySelector('#tempImg')
const description = document.querySelector('p#description')
function showData(data) {
  if (data.cod === '404' || data.cod === 404) {
    loader.classList.add('d-none');
    weatherInfo.classList.add('d-none')
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
        
      });
      popupInitialized = true;
    }
    iframe.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d400934.92240465875!2d${data.coord.lon}!3d${data.coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1751926749344!5m2!1spt-BR!2sbr`;
  });

  const unity = ' Km/s';
  loader.classList.add('d-none');
  weatherInfo.classList.remove('d-none')
  cityName.innerHTML = 'Clima em: ' + data.name + ', ' + data.sys.country;
  wind.innerHTML = data.wind.speed + unity.toLowerCase();
  humidity.innerHTML = data.main.humidity + '%';
  temperature.innerHTML = Math.ceil(data.main.temp) + '°C';
  feelsLike.innerHTML = Math.ceil(data.main.feels_like) + '°C';

  if (mapBtn.classList.contains('d-none')) {
    mapBtn.classList.remove('d-none');
    mapBtn.classList.add('d-block');
  }

  
  tempImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  description.textContent = data.weather[0].description
}

/**
 * Clears the weather data fields in the UI.
 */
function clearFields() {
  temperature.textContent = '';
  feelsLike.textContent = '';
  humidity.textContent = '';
  wind.textContent = '';
  clouds.textContent = '';
  if (cloudsIcon && cloudsIcon.src) {
    cloudsIcon.src = '';
  }
}
function showForecast(forecast) {
  const forecastContainerId = 'forecastContainer';
  let forecastContainer = document.getElementById(forecastContainerId);
  if (!forecastContainer) {
    forecastContainer = document.createElement('div');
    forecastContainer.id = forecastContainerId;
    forecastContainer.className = 'row mt-3 g-2 justify-content-center';
    weatherInfo.appendChild(forecastContainer);
  }
  forecastContainer.innerHTML = '';

  // Detecta o tema atual
  const isDark = document.body.classList.contains('dark-theme');
  const cardThemeClass = isDark ? 'bg-dark text-light' : 'bg-light text-dark';

  // Agrupa por dia
  const days = {};
  forecast.list.forEach(item => {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
    if (!days[day]) days[day] = [];
    days[day].push(item);
  });

  Object.keys(days).slice(0, 5).forEach(day => {
    const item = days[day].find(i => new Date(i.dt_txt).getHours() === 12) || days[day][0];
    forecastContainer.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center mb-2">
        <div class="card shadow-sm border-0 p-2 w-100 ${cardThemeClass}">
          <div class="fw-bold">${day}</div>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="" width="50">
          <div class="fs-5">${Math.round(item.main.temp)}°C</div>
          <div style="font-size: 0.9em;">${item.weather[0].description}</div>
        </div>
      </div>
    `;
  });
}
export { showData, clearFields , temperature , feelsLike, showForecast };