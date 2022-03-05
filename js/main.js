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

getRandomInt(0, 10);

/**
 * Проверяет максимальную длину строки.
 * @param {string} comment - строка для проверки
 * @param {number} length - длина, с которой надо сравнить длину строки comment
 * @returns {boolean} true, если длина строки не больше
 */
function checkStringLength(comment, length = 100) {
  return comment.length <= length;
}

checkStringLength('Проверка', 10);

const COMMENTS_NUM = 5;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_AUTHORS = [
  'Сергей',
  'Лиля',
  'Егор',
  'Андрей',
  'Рома',
  'Таня'
];

/**
 * Генерирует случайное сообщение в коммаентарии, состоящий из одного или двух предложений из массива COMMENT_MESSAGES
 * @returns {string}
 */
function genCommentMessage() {
  let commentMessage = '';
  for (let i = 0; i < getRandomInt(1, 2); i++) {
    commentMessage += COMMENT_MESSAGES[getRandomInt(0, COMMENT_MESSAGES.length - 1)];
    commentMessage += ' ';
  }
  commentMessage = commentMessage.substring(0, commentMessage.length - 1);
  return commentMessage;
}

/**
 * Генерирует случайное имя из массива COMMENT_AUTHORS
 * @returns {string} случайное имя из массива COMMENT_AUTHORS
 */
function genAuthorName() {
  return COMMENT_AUTHORS[getRandomInt(0, COMMENT_AUTHORS.length - 1)];
}

/**
 * Генерирует массив из ID комментариев
 * @returns {number[]}
 */
function genCommentIdArray() {
  const maxId = 100;
  const commentIdArray = [getRandomInt(0, maxId)];
  for (let i = 1; i < COMMENTS_NUM; i++) {
    const temp = getRandomInt(0, maxId);
    for (let j = i; j > 0; j--) {
      if (temp === commentIdArray[j]) {
        i--;
        continue;
      }
    }
    commentIdArray.push(getRandomInt(0, maxId));
  }
  return commentIdArray;
}

/**
 * Генериует комментарий к фотографии c ключами id, avatar, message, name
 * @param {number} id - id комментария
 * @returns {object}
 */
function genComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${  getRandomInt(1, 6)  }.svg`,
    message: genCommentMessage(),
    name: genAuthorName()
  };
}

/**
 * Генерирует объект с ключами
 * id - шв фотографиии
 * url - ссылка на фотографию
 * description - Описание фотографии
 * likes - кол-во лайков
 * comments - массив из комменатриев к фотографии
 * @param {number} id - id фотографии
 * @returns {object}
 */
function genObject(id) {
  return {
    id: id,
    url: `photos/${  id  }.jpg`,
    description: `Очень оригинальное описание фотографии ${  id  }`,
    likes: getRandomInt(15, 200),
    comments: Array.from({length: COMMENTS_NUM}, (currentValue, index) => genComment(genCommentIdArray()[index]))
  };
}

const objectsArray = Array.from({length: 25}, (currentValue, index) => genObject(index + 1));

