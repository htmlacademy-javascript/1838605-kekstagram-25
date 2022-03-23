import {generatePhotos} from './data.js';
import {renderPhotos} from './mini-picture.js';
import {makeGalleryInteractive} from './gallery.js';
import {enableValidation} from './upload-form.js';

const PHOTOS_COUNT = 25; // кол-во создаваемых объектов данных

const photosData = generatePhotos(PHOTOS_COUNT);
renderPhotos(photosData);
makeGalleryInteractive(photosData);
enableValidation();
