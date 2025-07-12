import { getData , searchCity } from "./api";
import { clearFields , showData } from "./ui";
import { changeTheme, changeToDark , changeToLight } from "./theme";
import { convertToF } from "./conversion";

const inputCity = document.querySelector('#findCity');
const cityName = document.getElementById('cityName');
const mapBtn = document.getElementById('map');
const container = document.getElementById('container');
const popup = document.getElementById('PopupIframe');
const closeBtn = document.getElementById('closebtn');
const iframe = document.getElementById('iframe');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const temperature = document.querySelector('#temperature');
const feelsLike = document.querySelector('#feelsLike');
const clouds = document.querySelector('#clouds');
const cards = document.getElementsByClassName('card');
const items = document.querySelectorAll('.item')
const cloudsIcon = document.querySelector('#cloudsIcon');
const searchBtn = document.getElementById('searchBtn')
const searchImg = document.getElementById('searchImg')
const themeBtn = document.querySelector('#changeThemeIcon')
const loader = document.querySelector('#loading')
document.addEventListener('DOMContentLoaded', () => {
  inputCity.focus();
});
let globalData = null
let theme = localStorage.getItem('theme')
if(theme == 'undefined'){
  localStorage.setItem('theme' , theme)
  theme = localStorage.getItem('theme')
}
if(theme == 'dark'){
    changeToDark()
  }   
document.addEventListener('keydown' , (event) => {
  if(event.key == 'Enter'){ 
    getData() }
})


