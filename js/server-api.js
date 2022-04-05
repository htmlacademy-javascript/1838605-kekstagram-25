/**
 * Запрашивает у сервера данные и вызывает onSuccess при их получении
 * @param {function} onSuccess - колбэк
 */
const getDataFromServer = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму');
    });
};

export {getDataFromServer, sendDataToServer};
