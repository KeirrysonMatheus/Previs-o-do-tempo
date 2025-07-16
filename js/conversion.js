import { temperature, feelsLike } from "./ui.js";

function convertUnity(temp, element, btn, unity) {
  let Fahrenheit = Math.round(temp * 1.8 + 32);
  let Celsius = Math.round((temp - 32) / 1.8);

  if (element === 'temp') {
    if (unity === 'Celsius') {
      temperature.textContent = Fahrenheit + '°F';
      btn.textContent = 'Converter para Celsius';
      unity = 'Fahrenheit';
    } else {
      temperature.textContent = Celsius + '°C';
      btn.textContent = 'Converter para Fahrenheit';
      unity = 'Celsius';
    }
    return unity;
  }

  if (element === 'feelsLike') {
    if (unity === 'Celsius') {
      feelsLike.textContent = Fahrenheit + '°F';
      btn.textContent = 'Converter para Celsius';
      unity = 'Fahrenheit';
    } else {
      feelsLike.textContent = Celsius + '°C';
      btn.textContent = 'Converter para Fahrenheit';
      unity = 'Celsius';
    }
    return unity;
  }
}

export { convertUnity };
