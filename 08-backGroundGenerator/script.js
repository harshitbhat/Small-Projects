const currentColor = document.querySelector('h3');
const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const body = document.querySelector('body');

const changeBackgroundColor = () => {
  const color = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
  body.style.background = color;
  currentColor.innerText = color;
};

color1.addEventListener('input', changeBackgroundColor);

color2.addEventListener('input', changeBackgroundColor);
