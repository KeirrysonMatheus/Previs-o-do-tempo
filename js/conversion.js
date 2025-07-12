
function convertToF(temp, element) {
  let Fahrenheit = temp * 1.8 + 32;
  if (element == 'temp') {
    document.querySelector('#temperature').textContent = Fahrenheit + 'F°';
  }
  if (element == 'feelsLike') {
    document.querySelector('#feelsLike').textContent = Fahrenheit + 'F°';
  }
}

export { convertToF };
