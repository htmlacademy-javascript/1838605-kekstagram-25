import {showBigPicture, hideBigPicture} from './big-picture.js';

/**
 * Добавляет обработчики событий каждой миниатюре
 * @param {object} picture - миниатюра
 * @param {object} data - объект, из которого сгенерирована миниатюра
 */
function addHandlerToPicture(picture, data) {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    showBigPicture(data);
  });
  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    hideBigPicture();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideBigPicture();
    }
  });
}

/**
 * Делает галерею интерактивной
 * @param {object[]} photosData - массив объектов с фотографиями
 */
function makeGalleryInteractive(photosData) {
  const gallery = document.querySelectorAll('.picture');
  for (let i = 0; i < gallery.length; i++) {
    addHandlerToPicture(gallery[i], photosData[i]);
  }
}

export {makeGalleryInteractive};
