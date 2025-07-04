function getData(){
  const city = document.querySelector('#findCity').value
  if(city == ''){
    document.querySelector('#cityName').innerHTML = 'Cidade não encontrada.'
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
  if(data.cod === '404'){
    const items = document.querySelectorAll('.info')
     document.querySelector('#cityName').innerHTML = 'Cidade não encontrada.'

   for (let i of items) {
  i.textContent = ''
}
  return
}
  document.querySelector('#cityName').innerHTML = 'Clima em: ' +    document.querySelector('#findCity').value + ', ' +  data.sys.country
  document.querySelector('#clouds').innerHTML = "Clima: <br>" + data.weather[0].description
  document.querySelector('#wind').innerHTML = "Vento: " +data.wind.speed  +  'm/s'
  document.querySelector('#humidity').innerHTML = 'Umidade: ' + data.main.humidity + '%'
  document.querySelector('#temperature').innerHTML = 'Temperatura: ' + Math.ceil(data.main.temp) + '°C'
  document.querySelector('#feelsLike').innerHTML = 'Sensação Térmica: ' + Math.ceil(data.main.feels_like) + '°C'

}


