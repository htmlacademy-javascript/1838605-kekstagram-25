const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

/**
 * Добавляет миниатюру фотографии с информацией о кол-ве комментариев и лайков в DocumentFragment
 * @param {object} photo - объект с ключами
 * id - id фотографии;
 * url - ссылка на фотографию;
 * description - Описание фотографии;
 * likes - кол-во лайков;
 * comments - массив из комменатриев к фотографии
 */
function addPhotoToFragment(photo) {
  const newPicture = pictureTemplate.cloneNode(true);
  const pictureImage = newPicture.querySelector('.picture__img');
  pictureImage.src = photo.url;
  const pictureLikes = newPicture.querySelector('.picture__likes');
  pictureLikes.textContent = photo.likes;
  const pictureComments= newPicture.querySelector('.picture__comments');
  pictureComments.textContent = photo.comments.length;
  fragment.appendChild(newPicture);
}

/**
 * Добавляет миниатюры фотографий на страницу
 * @param {object[]} photos - массив фотографий
 */
function renderPhotos(photos) {
  photos.forEach((photo) => {
    addPhotoToFragment(photo);
  });
  pictureContainer.appendChild(fragment);
}

export {renderPhotos};
