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
let loadedOffers;

const load = (onSuccess, onError) => {

  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(RequestMethods.GET, Urls.DATA);

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
      window.server.loadedOffers = xhr.response;
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

const upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  /* xhr.timeout = 1; */

  xhr.addEventListener(`load`, function () {
    onSuccess(xhr.response);
  });

  xhr.addEventListener(`error`, function () {
    onError();
  });
  xhr.addEventListener(`timeout`, function () {
    onError();
  });

  xhr.open(RequestMethods.POST, Urls.UPLOAD);
  xhr.send(data);
};

window.server = {
  loadedOffers,

  load,
  upload
};
