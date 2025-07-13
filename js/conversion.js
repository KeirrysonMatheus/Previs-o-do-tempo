import { temperature , feelsLike } from "./ui.js";
function convertToF(temp, element) {
  let Fahrenheit = temp * 1.8 + 32;
  if (element == 'temp') {
    temperature.textContent = Fahrenheit + 'F°';
  }
  if (element == 'feelsLike') {
    feelsLike.textContent = Fahrenheit + 'F°';
  }
}

export { convertToF };
