//import {generatePhotos} from './data.js';
import {renderPhotos, setupGallery, setImgFilterButtonClick} from './mini-picture.js';
import {enableValidation} from './upload-form.js';
import {getDataFromServer} from './server-api.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getDataFromServer((photos) => {
  renderPhotos(photos);
  setupGallery();
  setImgFilterButtonClick(debounce(
    () => renderPhotos(photos),
    RERENDER_DELAY
  ));
});
enableValidation();
