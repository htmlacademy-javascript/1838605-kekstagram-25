import {showBigPicture} from './big-picture.js';

/**
 * Добавляет обработчики событий каждой миниатюре
 * @param {object} picture - миниатюра
 * @param {object} data - объект, из которого сгенерирована миниатюра
 */
function addHandlerToPicture(picture, data) {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    showBigPicture(data);
  });
}

/**
 * Делает галерею интерактивной
 * @param {object[]} photosData - массив объектов с фотографиями
 */
function makeGalleryInteractive(photosData) {
  const gallery = document.querySelectorAll('.picture');
  for (let i = 0; i < gallery.length; i++) {
    addHandlerToPicture(gallery[i], photosData[i]); // непонятен комментарий про сделать через замыкание
  }
}

export {makeGalleryInteractive};
