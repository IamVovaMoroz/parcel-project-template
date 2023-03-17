import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataHours = document.querySelector('span[data-hours]');
const dataDays = document.querySelector('span[data-days]');

startBtn.setAttribute(`disabled`, true);
startBtn.addEventListener('click', onStartTimer);
let choosingDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose (selectedDates) {
    console.log(selectedDates[0]);
    onChoiceValidDate(selectedDates[0]);
  },
};

function onChoiceValidDate (selectedDates) {
  choosingDate = selectedDates.getTime();
  if (selectedDates < Date.now()) {
    Notify.failure('Please choose a date in the future');
  }

  if (selectedDates >= Date.now()) {
    startBtn.removeAttribute('disabled');
  }
}

function onStartTimer () {
  timerId = setInterval(startTimer, 1000);
  startBtn.setAttribute(`disabled`, true);
  dataInput.setAttribute(`disabled`, true);
}

function startTimer () {
  const differentDate = choosingDate - Date.now();
  const formatDate = convertMs(differentDate);
  renderDate(formatDate);
  if (dataSeconds.textContent === '00' && dataMinutes.textContent === '00') {
    Notify.success('Time end');
    clearInterval(timerId);
  }
}

function renderDate ({ days, hours, minutes, seconds }) {
  dataSeconds.textContent = addLeadingZero(seconds);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataHours.textContent = addLeadingZero(hours);
  dataDays.textContent = addLeadingZero(days);
}

flatpickr(dataInput, options);

function convertMs (ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero (value) {
  return String(value).padStart(2, '0');
}

// // import flatpickr from 'flatpickr';
// // // Додатковий імпорт стилів
// // import 'flatpickr/dist/flatpickr.min.css';

// const startBtn = document.querySelector('button[data-start]');
// console.log(startBtn);

// const dataDays = document.querySelector('span[data-days]');

// console.log(dataDays.textContent);
// const dataHours = document.querySelector('span[data-hours]');
// console.log(dataHours.textContent);
// const dataMinutes = document.querySelector('span[data-minutes]');
// console.log(dataMinutes.textContent);
// const dataSeconds = document.querySelector('span[data-seconds]');
// console.log(dataMinutes.textContent);
// const dataInput = document.querySelector('#datetime-picker');
// console.log(dataInput);

// let timeId = null;

// const timer = {
//   start () {
//     const startTime = Date.now();

//     timeId = setInterval(() => {
//       // всегда одинаковый startTime в интервале 1 сек всегда одинаковый

//       const currentTime = Date.now();

//       const deltaTime = currentTime - startTime;
//       //   Тут мы преобразовываем разницу между текущим и стартовым временем в новом формате convertMs
//       const { days, hours, minutes, seconds } = convertMs(deltaTime);
//       console.log(`${days}: ${hours} : ${minutes} : ${seconds}`);
//       console.log();

//       //   console.log(days);
//       console.log(pad(new Date(deltaTime).getMinutes()));
//       console.log(pad(new Date(deltaTime).getSeconds()));
//       console.log(pad(new Date(deltaTime).getUTCHours()));
//       console.log(pad(new Date(deltaTime).getUTCDay()));
//       //   console.log('текущее время', currentTime);
//       //   console.log(
//       //     'разницу между начальным и текущим минусом',
//       //     startTime - currentTime
//       //   );
//     }, 1000);
//   },
// };
// // Функция добавляет нолик для времени. Переводит в строку и добавляет слева нолик до 2. если 2 числа то ничего
// function pad (value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs (ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = pad(Math.floor(ms / day));
//   // Remaining hours
//   const hours = pad(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// // Кнопка по клику пока отключает таймер
// startBtn.addEventListener('click', () => {
//   timer.start();
// });

// // flatpickr(inputDate, options);
// // startBtn.disabled = true;

// // // flatpickr
// // const options = {
// //   enableTime: true,
// //   time_24hr: true,
// //   defaultDate: new Date(),
// //   minuteIncrement: 1,
// //   onClose (selectedDates) {
// //     console.log(selectedDates[0]);
// //   },
// // };

// // let counter = 0;
// // startBtn.addEventListener('click', () => {
// //   if (counter === 10) {
// //     console.log('все надоел, больше не буду считать!');
// //     return;
// //   }

// //   console.log('нажал кнопку. нажми ещё раз, посчитаю');
// //   counter += 1;
// //   console.log(counter);
// // });
