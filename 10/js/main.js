//import {generatePhotos} from './data.js';
import {renderPhotos} from './mini-picture.js';
import {enableValidation} from './upload-form.js';
import {getDataFromServer} from './server-api.js';

getDataFromServer(renderPhotos);
enableValidation();
