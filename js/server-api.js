/**
 * Запрашивает у сервера данные и вызывает onSuccess при их получении
 * @param {function} onSuccess - колбэк
 */
const getDataFromServer = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
};

export {getDataFromServer};
