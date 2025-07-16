import { temperature , feelsLike } from "./ui.js";


function convertUnity(temp, element , btn  , unity) {
  let Fahrenheit = Math.ceil(temp * 1.8 + 32)
   let Celsius = Math.ceil((temp - 32) / 1.8)
  
   if (element == 'temp' ) {
    if( unity == 'Celsius'){
    temperature.textContent = Fahrenheit + 'F°';
    btn.textContent = 'Converter para Celsius'
    tempUnity = 'Fahrenheit'
    }
    else{
    temperature.textContent = Celsius + 'C°';
    btn.textContent = 'Converter para Fahrenheit'
    unity = 'Celsius'
    }
  }
  if (element == 'feelsLike') {
      if( feelsLikeUnity === 'Celsius'){
    feelsLike.textContent = Fahrenheit + 'F°';
    btn.textContent = 'Converter para Celsius'
    unity = 'Fahrenheit'
      }
      else{
    feelsLike.textContent = Celsius + 'C°';
    btn.textContent = 'Converter para Fahrenheit'
    unity = 'Fahrenheit'
      }
  }
}

// function convertToC (temp , element , btn){
//   let Celsius = Math.ceil((temp - 32) / 1.8)
//     if (element == 'temp') {
//     temperature.textContent = Celsius + 'C°';
//     btn.textContent = 'Converter para Fahrenheit'
//     btn.onclick = convertToF( Fahrenheit , 'temp' , tempConvert )
//   }
//   if (element == 'feelsLike') {
//     feelsLike.textContent = Celsius + 'C°';
//     btn.textContent = 'Converter para Celsius'
//     btn.onclick = convertToF( Fahrenheit , 'feelsLike' ,  feelsLikeConvert)
//   }
// }


export { convertUnity };

