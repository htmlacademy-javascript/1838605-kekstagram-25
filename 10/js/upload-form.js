import {isEscapeKey, isExistSameElement} from './util.js';
import {makePreviewScalable, makePreviewUnScalable} from './scale.js';
import {enableFilters, disableFilters} from './filters.js';
import {sendDataToServer} from './server-api.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadFIle = uploadForm.querySelector('#upload-file');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

/**
 * Обработчик нажатия закрытия формы загрузки изображения
 */
function onCancelButtonClick() {
  hideUploadForm();
}


/**
 * Обработчик нажатия кнопки Escape
 * @param {any} evt
 */
function onUploadModalEscKeydown(evt) {
  if (isEscapeKey(evt) && (evt.target !== hashtags && evt.target !== description)) {
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
  makePreviewScalable();
  enableFilters();
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
  hashtags.value = '';
  description.value = '';
  makePreviewUnScalable();
  disableFilters();
}

uploadFIle.addEventListener('change', () => {
  showUploadForm();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text-container', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__text-container', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__error' // Класс для элемента с текстом ошибки
}, true);

const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const HASHTAG_ERRORS = {
  noHashtag: 'Хэш-тег должен начинаеться с символа #',
  onlyHashtag: 'Хеш-тег не может состоять только из одной решётки',
  symbolError: 'Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  tooLongHashtag: 'Максимальная длина одного хэш-тега не может быть более 20 символов, включая решётку',
  tooManyHashtags: 'Нельзя указать больше пяти хэш-тегов',
  sameHashtags: 'Один и тот же хэш-тег не может быть использован дважды',
  noError: 'Нет ошибок'
};
let hashtagErrorCode = HASHTAG_ERRORS.noError;


/**
 * Проверяет правильность введенной строки с хэш-тегами
 * @param {string} value - строка с хэш-тегами
 * @returns {boolean}
 */
function validateHashtags(value) {
  hashtagErrorCode = HASHTAG_ERRORS.noError;
  value = value.trim(); // убираем пробелы в конце
  value = value.toLowerCase(); // переводим в нижний регистр
  // hashtags.value = value;
  const hashtagsArray = value.split(' ');
  if (hashtagsArray[0] !== '') {
    for (let i = 0; i < hashtagsArray.length; i++) {
      if (!re.test(hashtagsArray[i])) {
        if (hashtagsArray[i][0] !== '#') {
          hashtagErrorCode = HASHTAG_ERRORS.noHashtag;
          return false;
        }
        if (hashtagsArray[i][0] === '#' && hashtagsArray[i].length === 1) {
          hashtagErrorCode = HASHTAG_ERRORS.onlyHashtag;
          return false;
        }
        if (hashtagsArray[i].length > MAX_HASHTAG_LENGTH) {
          hashtagErrorCode = HASHTAG_ERRORS.tooLongHashtag;
          return false;
        }
        hashtagErrorCode = HASHTAG_ERRORS.symbolError;
        return false;
      }
    }

    if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
      hashtagErrorCode = HASHTAG_ERRORS.tooManyHashtags;
      return false;
    }

    if (isExistSameElement(hashtagsArray)) {
      hashtagErrorCode = HASHTAG_ERRORS.sameHashtags;
      return false;
    }
  }

  return true;
}


/**
 * Возвращает строку с ошибкой хэш-тега
 * @returns {string}
 */
function getHashTagErrorMessage() {
  return hashtagErrorCode;
}

/**
 * Проверяет правильность описания
 * @param {string} value - строка с описанием
 * @returns {boolean}
 */
function validateDescription(value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

export function enableValidation() {
  pristine.addValidator(
    hashtags,
    validateHashtags,
    getHashTagErrorMessage
  );

  pristine.addValidator(
    description,
    validateDescription,
    'Длина комментария не может составлять больше 140 символов'
  );
}

const successForm = document.querySelector('#success').content.querySelector('.success');
const errorForm = document.querySelector('#error').content.querySelector('.error');
errorForm.querySelector('.error__button').textContent = 'OK';


/**
 * Обработчик кнопки на форме успешной отправки фомры
 */
function onSuccessButtonClick() {
  hideSuccessForm();
}

/**
 * Обработчик кнопки на форме неудачной отправки фомры
 */
function onErrorButtonClick() {
  hideErrorForm();
}

/**
 * Обработчик клика вне сообщения общ успешной/неудачной отправки формы
 */
function onOutOfFormClick(evt) {
  if (evt.target === successForm && evt.target !== successForm.querySelector('.success__inner')) {
    hideSuccessForm();
  }
  if (evt.target === errorForm && evt.target !== errorForm.querySelector('.error__inner')) {
    hideErrorForm();
  }
}

/**
 * Обработчик клавиши Escape при открытом окне успешной отправки формы
 */
function onSuccessFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessForm();
  }
}

/**
 * Обработчик клавиши Escape при открытом окне неудачной отправки формы
 */
function onErrorFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorForm();
  }
}

/**
 * Показывает сообщение об успешной отправке формы
 */
function showSuccessForm() {
  document.body.appendChild(successForm);
  successForm.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onOutOfFormClick);
  document.addEventListener('keydown', onSuccessFormEscKeydown);
}

/**
 * Скрывает сообщение об успешной отправке формы
 */
function hideSuccessForm() {
  successForm.querySelector('.success__button').removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('click', onOutOfFormClick);
  document.removeEventListener('keydown', onSuccessFormEscKeydown);
  document.body.removeChild(successForm);
}

/**
 * Показывает сообщение о неудачной отправке формы
 */
function showErrorForm(message) {
  document.body.appendChild(errorForm);
  errorForm.querySelector('.error__title').textContent = message;
  errorForm.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onOutOfFormClick);
  document.addEventListener('keydown', onErrorFormEscKeydown);
}

/**
 * Скрывает сообщение о неудачной отправке формы
 */
function hideErrorForm() {
  errorForm.querySelector('.error__button').removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('click', onOutOfFormClick);
  document.removeEventListener('keydown', onErrorFormEscKeydown);
  document.body.removeChild(errorForm);
}

/**
 * Блокирует кнопку отправки формы
 */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

/**
 * Разблокирует кнопку отправки формы
 */
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendDataToServer(
      () => {
        unblockSubmitButton();
        hideUploadForm();
        showSuccessForm();
      },
      (message) => {
        unblockSubmitButton();
        hideUploadForm();
        showErrorForm(message);
      },
      new FormData(evt.target),
    );
  }
});
