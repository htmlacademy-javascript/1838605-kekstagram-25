import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

function onBigPictureEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onBigPictureCancelClick() {
  hideBigPicture();
}

/**
 * Создает копию шаблона комментария и заполняет ее
 * @param {string} {name
 * @param {string} avatar
 * @param {string} message}
 * @returns {object} заполненная форма комментария
 */
function fillComment({name, avatar, message}) {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
}

/**
 * Отрисовывает комментарии
 * @param {object[]} comments - массив комментариев
 */
function renderComments(comments) {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(fillComment(comment));
  });
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').appendChild(fragment);
}

/**
 * Показывает окно с большой фотографией
 * @param {string} {url
 * @param {string} description
 * @param {number} likes
 * @param {object[]} comments}
 */
function showBigPicture({url, description, likes, comments}) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  renderComments(comments);
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);
}

/**
 * Скрывает окно с большой фотографией
 */
function hideBigPicture() {
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

export {showBigPicture};
