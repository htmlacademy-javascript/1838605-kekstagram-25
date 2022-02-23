function getRandomInt(min, max) {
  if(min < 0) {
    // eslint ругается на консольный вывод. Нельзя использовать console?
    console.error('Error: min < 0');
    return NaN;
  }
  if(max < min) {
    console.error('Error: max < min');
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(0, 10);

function checkStringLength(comment, length) {
  return !(comment.length > length);
}

checkStringLength('Проверка', 10);

