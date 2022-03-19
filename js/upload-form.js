import {isEscapeKey} from './util.js';
const uploadForm = document.querySelector('.img-upload__form');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');

function onCancelButtonClick() {
  hideUploadForm();
}

function onUploadModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadForm();
  }
}

/**
 * Показывает форму редактирования изображения
 */
function showUploadForm() {
  uploadForm.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onUploadModalEscKeydown);
}

/**
 * Скрывает форму редактирования изображения
 */
function hideUploadForm() {
  uploadForm.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onUploadModalEscKeydown);
}

uploadForm.querySelector('#upload-file').addEventListener('change', () => {
  showUploadForm();
});
