const RERENDER_DELAY = 500;

import {renderPhotos, showGalleryFilters, setImgFilterButtonClick} from './mini-pictures.js';
import {enableValidation} from './upload-form.js';
import {getDataFromServer} from './server-api.js';
import {debounce} from './util.js';
import {showErrorForm} from './upload-form.js';

getDataFromServer((photos) => {
  renderPhotos(photos);
  showGalleryFilters();
  setImgFilterButtonClick(debounce(
    () => renderPhotos(photos),
    RERENDER_DELAY
  ));
},
() => {
  showErrorForm('Ошибка загрузки данных с сервера');
});
enableValidation();
