import {isEscapeKey, isExistSameElement} from './util.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadFIle = uploadForm.querySelector('#upload-file');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtags = uploadForm.querySelector('.text__hashtags');

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
  uploadFIle.value ='';
}

uploadFIle.addEventListener('change', () => {
  showUploadForm();
});

const pristine = new Pristine(uploadForm, {}, false);

const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
let errorMessage = '';

function validateHashtags(value) {
  errorMessage = 'Нет ошибок';
  // хэш-тег начинается с символа # (решётка);
  // строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
  // спецсимволы (#, @, $ и т. п.), символы пунктуации
  // (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  // хеш-тег не может состоять только из одной решётки;
  // максимальная длина одного хэш-тега 20 символов, включая решётку;
  // хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  // хэш-теги разделяются пробелами;
  // один и тот же хэш-тег не может быть использован дважды;
  // нельзя указать больше пяти хэш-тегов;
  // хэш-теги необязательны;
  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к
  // закрытию формы редактирования изображения.

  value = value.trim(); // убираем пробелы в конце
  value = value.toLowerCase(); // переводим в нижний регистр
  // hashtags.value = value;
  const hashtagsArray = value.split(' ');
  if (hashtagsArray[0] !== '') {
    for (let i = 0; i < hashtagsArray.length; i++) {
      if (!re.test(hashtagsArray[i])) {
        errorMessage = 'Ошибка хэштега';
        return false;
      }
    }

    if (hashtagsArray.length > 5) {
      errorMessage = 'Слишком много хэштегов';
      return false;
    }

    if (isExistSameElement(hashtagsArray)) {
      errorMessage = 'Одинаковые хэштеги';
      return false;
    }
  }

  return true;
}

pristine.addValidator(
  hashtags,
  validateHashtags
);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

