import {generatePhotos} from './data.js';
import {renderPhotos} from './mini-photo.js';

const PHOTOS_COUNT = 25; // кол-во создаваемых объектов данных

const photosData = generatePhotos(PHOTOS_COUNT);
renderPhotos(photosData);

