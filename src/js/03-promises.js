import Notiflix from 'notiflix';
// Создаём переменные с первоначальным значением null. Будет задаваться позже
const form = document.querySelector('.form');
let delayInput = null;
let stepInput = null;
let amountInput = null;

// Функция создаем Promise выдаёт номер операциии задержку.
// delay принимается каждый раз новый при новой операции, в заивсимости от заданого
function createPromise (position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// После отправки формы запускаем функцию
form.addEventListener('submit', formSubmit);
function formSubmit (event) {
  event.preventDefault();
  // Получили доступ к input (delay, step, amount) через event.currentTarget.elements
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let delayInput = Number(delay.value);

  let stepInput = Number(step.value);

  let amountInput = Number(amount.value);

  // Создаём цикл, который будет добавлять +1 пока не достигнит кол-ва указанного в строке amount
  for (let i = 1; i <= amountInput; i += 1) {
    // Функция создаёт i(номер итерации amount), delayInput
    createPromise(i, delayInput)
      // then получает позитивный (resolve) результат Promise номер операции и задержку
      .then(({ position, delay }) => {
        // выводим через Notiflix полученные данные
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      // then получает негативный (reject) результат Promise номер операции и задержку
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    // delayInput (первоначальная задержка) + stepInput(добавляем delay step на каждой итерации)
    delayInput += stepInput;
  }
  event.currentTarget.reset();
}
