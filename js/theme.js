import { globalForecast } from './api.js';
import { showForecast } from './ui.js';

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
  document.querySelectorAll('.item').forEach(item => {
    item.classList.remove('bg-light', 'text-black');
    item.classList.add('bg-dark', 'text-white');
  });

  document.querySelectorAll('.info').forEach(i => {
    i.classList.remove('text-black');
    i.classList.add('text-white');
  });

  document.body.style.backgroundImage = "url('./img/fundo-escuro.jpg')";
  localStorage.setItem('theme', 'dark');
  theme = 'dark';

  const themeBtn = document.querySelector('#changeThemeIcon');
  if (themeBtn) themeBtn.src = './img/light.png';

  const searchImg = document.getElementById('searchImg');
  if (searchImg) searchImg.src = './img/barra-de-pesquisa-branca.png';
}

function changeToLight() {
  document.querySelectorAll('.item').forEach(item => {
    item.classList.remove('bg-dark', 'text-white');
    item.classList.add('bg-light', 'text-black');
  });

  document.querySelectorAll('.info').forEach(i => {
    i.classList.remove('text-white');
    i.classList.add('text-black');
  });

  document.body.style.backgroundImage = "url('./img/fundo-claro.jpg')";
  localStorage.setItem('theme', 'light');
  theme = 'light';

  const themeBtn = document.querySelector('#changeThemeIcon');
  if (themeBtn) themeBtn.src = './img/dark.png';

  const searchImg = document.getElementById('searchImg');
  if (searchImg) searchImg.src = './img/barra-de-pesquisa.png';
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const themeBtn = document.querySelector('#changeThemeIcon');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      changeTheme();
      // Atualiza o forecast para seguir o novo tema
      if (globalForecast && globalForecast.cod === "200") {
        showForecast(globalForecast);
      }
    });
  }
});

export { changeTheme, initTheme };