import {renderPhotos, showGalleryFilters, setImgFilterButtonClick} from './mini-pictures.js';
import {enableValidation} from './upload-form.js';
import {getDataFromServer} from './server-api.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getDataFromServer((photos) => {
  renderPhotos(photos);
  showGalleryFilters();
  setImgFilterButtonClick(debounce(
    () => renderPhotos(photos),
    RERENDER_DELAY
  ));
});
enableValidation();
