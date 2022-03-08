import {getRandomInt, getRandomArrayElement} from './util.js';

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
    commentMessage += getRandomArrayElement(COMMENT_MESSAGES);
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
  return getRandomArrayElement(COMMENT_AUTHORS);
}

const MAX_ID = 100; // максимальное число ID

/**
 * Генерирует массив из ID комментариев
 * @returns {number[]}
 */
function genCommentIdArray() {
  const commentIdArray = [getRandomInt(0, MAX_ID)];
  for (let i = 1; i < COMMENTS_NUM; i++) {
    const temp = getRandomInt(0, MAX_ID);
    for (let j = i; j > 0; j--) {
      if (temp === commentIdArray[j]) {
        i--;
        continue;
      }
    }
    commentIdArray.push(getRandomInt(0, MAX_ID));
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

const DATA_SIZE = 25; // кол-во создаваемых объектов данных

/**
 * Генериурет массив объектов
 * @returns {object[]}
 */
export function genData() {
  return Array.from({length: DATA_SIZE}, (currentValue, index) => genObject(index + 1));
}
