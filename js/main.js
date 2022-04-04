//import {generatePhotos} from './data.js';
import {renderPhotos, setupGallery, setImgFilterButtonClick} from './mini-picture.js';
import {enableValidation} from './upload-form.js';
import {getDataFromServer} from './server-api.js';

getDataFromServer((photos) => {
  renderPhotos(photos);
  setupGallery();
  setImgFilterButtonClick(() => renderPhotos(photos));
});
enableValidation();
