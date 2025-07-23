const cards = document.getElementsByClassName('card');
const items = document.querySelectorAll('.item');
const themeBtn = document.querySelector('#changeThemeIcon');
const searchImg = document.getElementById('searchImg');
const info = document.querySelectorAll('.info');

let theme = localStorage.getItem('theme');

function initTheme() {
  if (!theme) {
    localStorage.setItem('theme', 'light');
    theme = 'light';
  }
  if (theme === 'dark') {
    changeToDark();
  } else {
    changeToLight();
  }
}

function changeTheme() {
  if (theme === 'dark') {
    changeToLight();
  } else {
    changeToDark();
  }
}

function changeToDark() {
  items.forEach(item => item.classList.remove('bg-light', 'text-black'));
  items.forEach(item => item.classList.add('bg-dark', 'text-white'));

  info.forEach(i => i.classList.remove('text-black'));
  info.forEach(i => i.classList.add('text-white'));

  document.body.style.backgroundImage = "url('./img/fundo-escuro.jpg')";
  localStorage.setItem('theme', 'dark');
  theme = 'dark';
  themeBtn.src = './img/light.png';
  searchImg.src = './img/barra-de-pesquisa-branca.png';
}

function changeToLight() {
  items.forEach(item => item.classList.remove('bg-dark', 'text-white'));
  items.forEach(item => item.classList.add('bg-light', 'text-black'));

  info.forEach(i => i.classList.remove('text-white'));
  info.forEach(i => i.classList.add('text-black'));

  document.body.style.backgroundImage = "url('./img/fundo-claro.jpg')";
  localStorage.setItem('theme', 'light');
  theme = 'light';
  themeBtn.src = './img/dark.png';
  searchImg.src = './img/barra-de-pesquisa.png';
}

export { changeTheme, initTheme };

document.addEventListener('DOMContentLoaded', initTheme);
