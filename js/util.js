/**
 * Возвращает случайное целое число из диапазона. При отрицательном значении берется его модуль
 * @param {number} a - левая(правая) граница диапазона
 * @param {number} b - правая(левая) граница диапазона
 * @returns {number} случайное целое число из диапазона
 */
const getRandomInt = (a, b) => {
  const left = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const right = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (right - left + 1)) + left;
};

/**
 * Проверяет, что нажатая клавиша соответствует клавише Escape
 * @param {object} evt
 * @returns {boolean} true, если Escape
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Проверяет наличие одинаковых элементов в массиве
 * @param {any} array
 * @returns {boolean}
 */
const isExistSameElement = (array) => {
  const tempArray = {};
  for (let i = 0; i < array.length; i++) {
    if (tempArray[array[i]]) {
      return true;
    }
    tempArray[array[i]] = 1;
  }
  return false;
};

/**
 * Для устранения дребезга
 * @param {function} callback - функция, дребезг которой надо устранить
 * @param {number} timeoutDelay=500 - время через которое будет вызываться callback
 * @returns {function} кол-бэк с защитой от дребезга
 */
const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {getRandomInt, isEscapeKey, isExistSameElement, debounce};
