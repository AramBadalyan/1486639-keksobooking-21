'use strict';

(function () {
  const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  /* const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`; */
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const load = (onSuccess, onError) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL_DATA);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Внутренняя ошибка сервера`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Время запроса ${xhr.timeout}мс вышло. Запрос не успел выполниться`);
    });

    xhr.send();
  };

  window.server = {
    load
  };
})();
