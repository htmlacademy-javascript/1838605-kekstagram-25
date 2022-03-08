/**
 * Возвращает случайное целое число из диапазона. При отрицательном значении берется его модуль
 * @param {number} a - левая(правая) граница диапазона
 * @param {number} b - правая(левая) граница диапазона
 * @returns {number} случайное целое число из диапазона
 */
function getRandomInt(a, b) {
  const left = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const right = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (right - left + 1)) + left;
}

/**
 * Возвращает случайный элемент из массива
 * @param {any[]} array - массив данных
 * @returns {any} случайный элемент массива
 */
function getRandomArrayElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

/**
 * Проверяет максимальную длину строки.
 * @param {string} comment - строка для проверки
 * @param {number} length - длина, с которой надо сравнить длину строки comment
 * @returns {boolean} true, если длина строки не больше
 */
function checkStringLength(comment, length = 100) {
  return comment.length <= length;
}

export {getRandomInt, getRandomArrayElement, checkStringLength};
