export function convertToF(temp , element){
  if(element == 'temp'){
  let Fahrenheit = temp * 1.8 + 32
  temperature.textContent = Fahrenheit + 'F°'
}
if(element == 'feelsLike'){
  let Fahrenheit = temp * 1.8 + 32
  feelsLike.textContent = Fahrenheit + 'F°'
}
}