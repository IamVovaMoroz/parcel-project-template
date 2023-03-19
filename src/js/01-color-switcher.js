const buttonStart = document.querySelector('button[data-start]');

const buttonStop = document.querySelector('button[data-stop]');

const bodyRef = document.querySelector('body');
// Создаём timerId в глобальной области видимости, чтобы можно было использовать
let timerId = null;
// Можно создать переменную с временем и вставлять её в интервале
// const PROMPT_INTERVAL = 1000;
// Функция передачи цветов на Body
const bodyChangeColor = () => {
  bodyRef.style.background = getRandomHexColor();
};

// Функция рандомных цветов на body
function getRandomHexColor () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// При клике запускаем функцию переключения цветов.
// timerId по клику присваеваем setInterval.
// disabled - отключение активности кнопки
buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyRef.style.background = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
});

// При клике убираем интервал setInterval
buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStart.disabled = false;
});
