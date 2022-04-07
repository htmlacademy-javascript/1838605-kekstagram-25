const RANDOM_PHOTOS_COUNT = 10;
let currentFilter = 'filter-default';

import {showBigPicture} from './big-picture.js';
import {getRandomInt} from './util.js';
const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const imgFiltersSection = document.querySelector('.img-filters');
const imgFilterButtons = document.querySelectorAll('.img-filters__button');

/**
 * Добавляет миниатюру фотографии с информацией о кол-ве комментариев и лайков в DocumentFragment
 * @param {object} photo - объект с ключами
 * id - id фотографии;
 * url - ссылка на фотографию;
 * description - Описание фотографии;
 * likes - кол-во лайков;
 * comments - массив из комменатриев к фотографии
 */
function addPhotoToFragment({url, likes, comments, description}) {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.querySelector('.picture__img').addEventListener('click', () => {
    showBigPicture({url, likes, comments, description});
  });
  fragment.appendChild(newPicture);
}

function comparePhotosCommentsCount(photoA, photoB) {
  return photoB.comments.length - photoA.comments.length;
}

/**
 * Фильтрует массив фотографий по текущему фильтру currentFilter
 * @param {any} photos - массив фотографий
 * @returns {any} отфильтрованный массив
 */
function filterPhotos(photos) {
  let filteredPhotos = [];
  let temp = [];
  switch (currentFilter) {
    case 'filter-random':
      temp = photos.slice();
      for (let i = 0; i < RANDOM_PHOTOS_COUNT && temp.length > 0; i++) {
        const randomPhotoIndex = getRandomInt(0, temp.length - 1);
        filteredPhotos.push(temp[randomPhotoIndex]);
        temp.splice(randomPhotoIndex, 1);
      }
      break;

    case 'filter-discussed':
      filteredPhotos = photos.slice().sort(comparePhotosCommentsCount);
      break;

    default:
      filteredPhotos = photos;
      break;
  }
  return filteredPhotos;
}

/**
 * Добавляет миниатюры фотографий на страницу
 * @param {object[]} photos - массив фотографий
 */
function renderPhotos(photos) {
  const filteredPhotos = filterPhotos(photos);
  filteredPhotos.forEach(addPhotoToFragment);
  document.querySelectorAll('.picture')
    .forEach((photo) => photo.remove());
  pictureContainer.appendChild(fragment);
}

/**
 * Показывает кнопки с фильтрами на странице галереи
 */
function showGalleryFilters() {
  imgFiltersSection.classList.remove('img-filters--inactive');
}

/**
 * Функция для назначения обработчика по нажатию на кнопки смены фильтров гелереи
 * @param {function} cb - обработчик кнопок с классом .img-filters__button
 */
function setImgFilterButtonClick(cb) {
  imgFilterButtons
    .forEach((filterButton) => {
      filterButton.addEventListener('click', (evt) => {
        currentFilter = evt.target.id;
        imgFilterButtons.forEach((button) => {
          button.classList.remove('img-filters__button--active');
        });
        evt.target.classList.add('img-filters__button--active');
        cb();
      });
    }
    );
}

export {renderPhotos, showGalleryFilters, setImgFilterButtonClick};
