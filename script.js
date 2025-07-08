document.addEventListener('DOMContentLoaded' , () =>{
  document.querySelector('#findCity').focus() 
})
function getData(){
  document.querySelector('#cityName').innerHTML = 'Buscando...'
  let city = document.querySelector('#findCity').value.trimEnd().trimStart()
  if(city == ''){
    document.querySelector('#cityName').innerHTML = 'Insira uma cidade.';
    document.getElementById('map').classList.add('d-none')
    const cards = document.getElementsByClassName('card')
     Array.from(cards).forEach(e => e.classList.add('d-none'));
    clearFields();
    return
  }
  console.log(city)
  searchCity(city)
}

async function searchCity(city) {
  const WeatherAPIKey = 'aa776d709be6648d781129554c5dedf5'

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherAPIKey}&lang=pt_br&units=metric`)
  .then( res => res.json())
  .catch(error => {
    console.error(error)
  })

  console.log(data)
  showData(data)
}

function showData(data){
const cards = document.getElementsByClassName('card');
  if(data.cod === '404' || data.cod === 404){
     Array.from(cards).forEach(e => e.classList.add('d-none'));
  document.getElementById('map').classList.add('d-none')
    document.querySelector('#cityName').innerHTML = 'Cidade não encontrada.'
    clearFields()
    return
  }

  document.getElementById('map').addEventListener('click' , () => {
    document.getElementById('container').classList.add('opacity-50')
    document.getElementById('PopupIframe').classList.remove('d-none')
    document.getElementById('closebtn').addEventListener('click' , () => {
      document.getElementById('PopupIframe').classList.add('d-none')
      document.getElementById('container').classList.remove('opacity-50')
      document.body.classList.add('')
    })
    document.getElementById('iframe').src = ` https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d400934.92240465875!2d${data.coord.lon}!3d${data.coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1751926749344!5m2!1spt-BR!2sbr `
  })

  const unity = ' m/s'

  Array.from(cards).forEach(e => e.classList.remove('d-none'));
  document.querySelector('#cityName').innerHTML = 'Clima em: ' + data.name + ', ' + data.sys.country
  document.querySelector('#wind').innerHTML = data.wind.speed + unity.toLowerCase()
  document.querySelector('#humidity').innerHTML =  data.main.humidity + '%'
  document.querySelector('#temperature').innerHTML = Math.ceil(data.main.temp) + '°C'
  document.querySelector('#feelsLike').innerHTML = Math.ceil(data.main.feels_like) + '°C'
  if(document.getElementById('map').classList.contains('d-none')){
    document.getElementById('map').classList.remove('d-none');
    document.getElementById('map').classList.add('d-block')
  }

  const clouds = document.querySelector('#clouds')
  clouds.innerHTML = ''

  const icon = document.createElement('img')
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  icon.alt = data.weather[0].description
  icon.classList.add('me-2')

  clouds.appendChild(icon)
  clouds.innerHTML += data.weather[0].description
}


function clearFields() {
  document.querySelector('#temperature').textContent = ''
  document.querySelector('#feelsLike').textContent = ''
  document.querySelector('#humidity').textContent = ''
  document.querySelector('#wind').textContent = ''
  document.querySelector('#clouds').innerHTML = ''
  if(document.querySelector('#cloudsIcon').src){
    document.querySelector('#cloudsIcon').src= ''
    return
  }
}
