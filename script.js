document.addEventListener('DOMContentLoaded' , () => document.querySelector('#findCity').focus() )
function getData(){
  document.querySelector('#cityName').innerHTML = 'Buscando...'
  const city = document.querySelector('#findCity').value
  if(city == ''){
    document.querySelector('#cityName').innerHTML = 'Insira uma cidade.';
    clearFields();
    return
  }
  searchCity(city)
}

async function searchCity(city) {
  const key = 'aa776d709be6648d781129554c5dedf5'

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`)
  .then( res => res.json())
  .catch(error => {
    console.error(error)
  })

  console.log(data)
  showData(data)
}

function showData(data){
  if(data.cod === '404' || data.cod === 404){
    document.querySelector('#cityName').innerHTML = 'Cidade não encontrada.'
    clearFields()
    return
  }
  const unity = ' m/s'
  document.querySelector('#cityName').innerHTML = 'Clima em: ' + data.name + ', ' + data.sys.country
  document.querySelector('#wind').textContent = 'Vento: ' + data.wind.speed + unity.toLowerCase()
  document.querySelector('#humidity').textContent = 'Umidade: ' + data.main.humidity + '%'
  document.querySelector('#temperature').textContent = 'Temperatura: ' + Math.ceil(data.main.temp) + '°C'
  document.querySelector('#feelsLike').textContent = 'Sensação Térmica: ' + Math.ceil(data.main.feels_like) + '°C'


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
