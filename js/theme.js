const cards = document.getElementsByClassName('card');
const items = document.querySelectorAll('.item');
const themeBtn = document.querySelector('#changeThemeIcon');
const searchImg = document.getElementById('searchImg');

let theme = localStorage.getItem('theme');

function initTheme() {
  if (theme == 'undefined') {
    localStorage.setItem('theme', theme);
    theme = localStorage.getItem('theme');
  }
  if (theme == 'dark') {
    changeToDark();
  }
}

function changeTheme() {
  if (theme == 'dark') {
    changeToLight();
  } else {
    changeToDark();
  }
}

function changeToDark() {
  items.forEach(item => item.classList.remove('bg-light', 'text-black'));
  Array.from(cards).forEach(card => card.classList.remove('bg-light', 'text-black'));

  items.forEach(item => item.classList.add('bg-dark', 'text-white'));
  Array.from(cards).forEach(card => card.classList.add('bg-dark'));

  document.body.style.backgroundImage = "url('./img/fundo-escuro.jpg')";
  localStorage.setItem('theme', 'dark');
  theme = localStorage.getItem('theme');
  themeBtn.src = './img/light.png';
  searchImg.src = './img/barra-de-pesquisa-branca.png';
}

function changeToLight() {
  items.forEach(item => item.classList.remove('bg-dark', 'text-white'));
  Array.from(cards).forEach(card => card.classList.remove('bg-dark'));

  items.forEach(item => item.classList.add('bg-light', 'text-black'));
  Array.from(cards).forEach(card => card.classList.add('bg-light'));

  document.body.style.backgroundImage = "url('./img/fundo-claro.jpg')";
  localStorage.setItem('theme', 'light');
  theme = localStorage.getItem('theme');
  themeBtn.src = './img/dark.png';
  searchImg.src = './img/barra-de-pesquisa.png';
}

export { changeTheme, initTheme };
