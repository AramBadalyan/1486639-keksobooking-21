'use strict';

const TIMEOUT_IN_MS = 10000;
const Urls = {
  DATA: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};
const RequestMethods = {
  GET: `GET`,
  POST: `POST`
};
const StatusCode = {
  OK: 200
};

const load = (onSuccess, onError) => {

  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(RequestMethods.GET, Urls.DATA);

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
      window.server.loadedOffers = xhr.response;
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Внутренняя ошибка сервера`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Время запроса ${xhr.timeout}мс вышло. Запрос не успел выполниться`);
  });

  xhr.send();
};

const upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, onSuccess);

  xhr.addEventListener(`error`, onError);
  xhr.addEventListener(`timeout`, onError);

  xhr.open(RequestMethods.POST, Urls.UPLOAD);
  xhr.send(data);
};

window.server = {
  load,
  upload
};
