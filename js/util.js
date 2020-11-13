'use strict';


const DEBOUNCE_INTERVAL = 500;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomIntInclusive = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

const getRandomDescription = (possibleOptions) => {
  let mutableOptions = possibleOptions.slice(); // Создаем копию входящего массива
  let result = [];

  // Пробегаем рандомную длину от массива опций
  for (let i = 0, l = window.util.getRandomInt(possibleOptions.length); i < l; i++) {
    // Удаляем опции из копии массива, чтобы не повторяться
    // В результат записываем нулевой(единственный) элемент вырезанного массива
    result.push(mutableOptions.splice(window.util.getRandomInt(mutableOptions.length), 1)[0]);
  }

  return result;
};

const debounce = function (cb) {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  getRandomInt,
  getRandomIntInclusive,
  getRandomDescription,
  debounce
};
