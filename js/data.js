import {getRandomInt, getRandomArrayElement} from './util.js';

const COMMENTS_COUNT = 12;
const MAX_ID = 100; // максимальное число ID
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

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
function generateCommentMessage() {
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
function generateAuthorName() {
  return getRandomArrayElement(COMMENT_AUTHORS);
}

/**
 * Генерирует массив из ID комментариев
 * @returns {number[]}
 */
function generateCommentIdArray() {
  const commentIdArray = [getRandomInt(0, MAX_ID)];
  for (let i = 1; i < COMMENTS_COUNT; i++) {
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
function generateComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: generateCommentMessage(),
    name: generateAuthorName()
  };
}

/**
 * Генерирует объект с ключами
 * id - id фотографии;
 * url - ссылка на фотографию;
 * description - Описание фотографии;
 * likes - кол-во лайков;
 * comments - массив из комменатриев к фотографии
 * @param {number} id - id фотографии
 * @returns {object}
 */
function generateObject(id) {
  return {
    id: id,
    url: `photos/${  id  }.jpg`,
    description: `Очень оригинальное описание фотографии ${  id  }`,
    likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: Array.from({length: COMMENTS_COUNT}, (currentValue, index) => generateComment(generateCommentIdArray()[index]))
  };
}

/**
 * Генериурет массив фотографий
 * * @param {number} count - кол-во элементов массива
 * @returns {object[]}
 */
export function generatePhotos(count) {
  return Array.from({length: count}, (currentValue, index) => generateObject(index + 1));
}
