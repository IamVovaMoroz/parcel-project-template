import Notiflix from 'notiflix';
// Создаём переменные с первоначальным значением null. Будет задаваться позже
const form = document.querySelector('.form');
let delayInput = null;
let stepInput = null;
let amountInput = null;

// Функция создаем Promise
function createPromise (position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = false;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
      console.log(position);
    }, delay);
  });
}
form.addEventListener('submit', formSubmit);
function formSubmit (event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let delayInput = Number(delay.value);
  let stepInput = Number(step.value);
  let amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayInput += stepInput;
  }
  event.currentTarget.reset();
}
