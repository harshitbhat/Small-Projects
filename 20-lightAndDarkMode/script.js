const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector('#nav');
const toggleIcon = document.querySelector('#toggle-icon');
const image1 = document.querySelector('#image1');
const image2 = document.querySelector('#image2');
const image3 = document.querySelector('#image3');
const textBox = document.querySelector('#text-box');

function darkMode() {
  toggleSwitch.checked = true;
  nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
  toggleIcon.children[0].textContent = 'Dark Mode';
  toggleIcon.children[1].classList.remove('fa-sun');
  toggleIcon.children[1].classList.add('fa-moon');
  image1.src = 'img/undraw_developer_activity_dark.svg';
  image2.src = 'img/undraw_static_assets_dark.svg';
  image3.src = 'img/undraw_react_dark.svg';
}

function lightMode() {
  nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
  textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  toggleIcon.children[0].textContent = 'Light Mode';
  toggleIcon.children[1].classList.remove('fa-moon');
  toggleIcon.children[1].classList.add('fa-sun');
  image1.src = 'img/undraw_developer_activity_light.svg';
  image2.src = 'img/undraw_static_assets_light.svg';
  image3.src = 'img/undraw_react_light.svg';
}

function switchTheme(evt) {
  if (evt.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkMode();
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    lightMode();
    localStorage.setItem('theme', 'light');
  }
}

// Event Lisitener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage for theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  currentTheme === 'dark' ? darkMode() : lightMode();
}
