const COMMENTS_LOAD_STEP = 5;

import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const loadMoreButton = bigPicture.querySelector('.social__comments-loader');
const loadedComments = bigPicture.querySelector('.social__comment-count');
let commentsRef;
let commentsPos = 0;

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const onBigPictureCancelClick = () => {
  hideBigPicture();
};

/**
 * Создает копию шаблона комментария и заполняет ее
 * @param {string} {name
 * @param {string} avatar
 * @param {string} message}
 * @returns {object} заполненная форма комментария
 */
const fillComment = ({name, avatar, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

/**
 * Отрисовывает комментарии
 * @param {object[]} comments - массив комментариев
 */
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(fillComment(comment));
  });
  bigPicture.querySelector('.social__comments').appendChild(fragment);
};

/**
 * Обновляет число загруженных комментариев
 * @param {number} newValue - число загруженных комментариев
 */
const updateLoadedCommentsCount = (newValue) => {
  loadedComments.firstChild.textContent = `${newValue} из `;
};

/**
 * Обработчик нажатия кнопки "Загрузить еще".
 * Подгружает еще комментариев, если они есть
 */
const onLoadMoreButtonClick = () => {
  let increment = COMMENTS_LOAD_STEP;
  if (commentsRef.length > commentsPos) {
    if ((commentsRef.length - commentsPos) <= COMMENTS_LOAD_STEP) {
      increment = commentsRef.length - commentsPos;
      loadMoreButton.classList.add('hidden');
    }
    renderComments(commentsRef.slice(commentsPos, commentsPos + increment));
    commentsPos += increment;
    updateLoadedCommentsCount(commentsPos);
  }
};

/**
 * Показывает окно с большой фотографией
 * @param {string} {url
 * @param {string} description
 * @param {number} likes
 * @param {object[]} comments}
 */
const showBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  commentsCount.textContent = comments.length;
  bigPicture.querySelector('.social__comments').innerHTML = '';
  loadMoreButton.classList.remove('hidden');

  commentsRef = comments; // Не придумал как по другому передать в обработчик onLoadMoreButtonClick кроме как добавить глобальную переменную
  commentsPos = 0;
  onLoadMoreButtonClick();

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);
  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
};

/**
 * Скрывает окно с большой фотографией
 */
function hideBigPicture() {
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

export {showBigPicture};
