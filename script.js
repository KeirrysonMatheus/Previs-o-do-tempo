const inputCity = document.querySelector('#findCity');
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
const cards = document.getElementsByClassName('card');
const items = document.querySelectorAll('.item')
const cloudsIcon = document.querySelector('#cloudsIcon');
const searchBtn = document.getElementById('searchBtn')
const searchImg = document.getElementById('searchImg')
const themeBtn = document.querySelector('#changeThemeIcon')
const loader = document.querySelector('#loading')
document.addEventListener('DOMContentLoaded', () => {
  inputCity.focus();
});

let globalData = null
let theme = localStorage.getItem('theme')
if(theme == 'undefined'){
  localStorage.setItem('theme' , theme)
  theme = localStorage.getItem('theme')
}
if(theme == 'dark'){
    changeToDark()
  }   
document.addEventListener('keydown' , (event) => {
  if(event.key == 'Enter'){ 
    getData() }
})

function getData() {
  loader.classList.remove('d-none')
  let city = inputCity.value.trim();

  if (city === '') {
    loader.classList.add('d-none')
    cityName.innerHTML = 'Insira uma cidade.';
    mapBtn.classList.add('d-none');
    Array.from(cards).forEach(e => e.classList.add('d-none'));
    clearFields();
    return;
  }

  console.log(city);
  searchCity(city);
}

async function searchCity(city) {
  const WeatherAPIKey = 'aa776d709be6648d781129554c5dedf5';

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
    .then(res => res.json())
    .catch(error => {
      console.error(error);
    });
  globalData = data
  showData(data);
}

function showData(data) {
  if (data.cod === '404' || data.cod === 404) {
    loader.classList.add('d-none')
    Array.from(cards).forEach(e => e.classList.add('d-none'));
    mapBtn.classList.add('d-none');
    loader.classList.add('d-none')
    cityName.innerHTML = 'Cidade não encontrada.';
    clearFields();
    return;
  }
  let popupInitialized = false;
  mapBtn.addEventListener('click', () => {
    popup.classList.remove('d-none');
     if (!popupInitialized) {
    document.addEventListener('keydown' , (event) => {
      if(event.key == 'Escape'){
          popup.classList.add('d-none');
      }
    })
    closeBtn.addEventListener('click', () => {
      popup.classList.add('d-none');
      container.classList.remove('opacity-50');
      document.body.classList.add('');
    });
    popupInitialized = true
  }
    iframe.src = ` https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d400934.92240465875!2d${data.coord.lon}!3d${data.coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1751926749344!5m2!1spt-BR!2sbr `;
  });

  const unity = ' m/s';
  loader.classList.add('d-none')
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
  return data
}

function changeTheme(){
  if(theme == 'dark'){
    changeToLight()
  } else{
    changeToDark()
  }
}

function changeToDark () {
  items.forEach(item => item.classList.remove('bg-light','text-black'))
  Array.from(cards).forEach( card => card.classList.remove('bg-light' ,'text-black'))

  items.forEach(item => item.classList.add('bg-dark','text-white'))
  Array.from(cards).forEach( card => card.classList.add('bg-dark'))
  document.body.style.backgroundImage = "url('./img/fundo-escuro.jpg')"
  localStorage.setItem('theme' , 'dark')
  theme = localStorage.getItem('theme')
  themeBtn.src ='./img/light.png'
  searchImg.src = './img/barra-de-pesquisa-branca.png'

  } 

  function changeToLight(){
  items.forEach(item => item.classList.remove('bg-dark','text-white'))
  Array.from(cards).forEach( card => card.classList.remove('bg-dark'))
  items.forEach(item => item.classList.add('bg-light' , 'text-black'))
  Array.from(cards).forEach( card => card.classList.add('bg-light'))
  document.body.style.backgroundImage = "url('./img/fundo-claro.jpg')"
  localStorage.setItem('theme' , 'light')
  theme = localStorage.getItem('theme')
  themeBtn.src ='./img/dark.png'
  searchImg.src = './img/barra-de-pesquisa.png'

}

function convertToF(temp , element){
  if(element == 'temp'){
  let Fahrenheit = temp * 1.8 + 32
  temperature.textContent = Fahrenheit + 'F°'
}
if(element == 'feelsLike'){
  let Fahrenheit = temp * 1.8 + 32
  feelsLike.textContent = Fahrenheit + 'F°'
}
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