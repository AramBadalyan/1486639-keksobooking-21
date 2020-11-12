'use strict';

(function () {
  const errorNotice = `box-shadow: 0 0 5px 5px rgba(255, 55, 55, 0.5);`;
  const nonNotice = `box-shadow: 0;`;
  const guestValidation = {
    '1': `Только на одного гостя`,
    '2': `Только на одного или двух гостей`,
    '3': `Только на одного, двух или трех гостей`,
    '100': `Только не для гостей`
  };
  const guestCapacity = {
    '1': [`1`],
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': [`0`]
  };
  const priceOfType = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Валидация поля Количество мест
  const typeOfCapacity = (target) => {
    const value = target.value;
    const isValid = guestCapacity[window.formValidation.typeOfRoom].some(function (element) {
      return element === value;
    });
    if (!isValid) {
      target.style = errorNotice;
      target.setCustomValidity(guestValidation[window.formValidation.typeOfRoom]);
    } else {
      target.style = nonNotice;
      target.setCustomValidity(``);
    }

    target.reportValidity();
  };

  // Валидация Типа жилья и Цены за ночь
  const priceValidation = function (target) {
    const value = target.value;
    if (target.validity.valueMissing) {
      target.setCustomValidity(`Обязательное поле`);
    } else if (value < priceOfType[window.formValidation.typeOfHouse]) {
      target.setCustomValidity(`Минимальная цена ${priceOfType[window.formValidation.typeOfHouse]}`);
    } else if (value > 1000000) {
      target.setCustomValidity(`Максимальная цена 1000000`);
    } else {
      target.setCustomValidity(``);
    }
    target.reportValidity();
  };

  // Валидация длины введенного значения
  const valueLengthValidation = (target, minValue, maxValue) => {
    let valueLength = target.value.length;
    if (valueLength < minValue) {
      target.setCustomValidity(`Ещё хотя бы ${minValue - valueLength} знака(ов)`);
    } else if (valueLength > maxValue) {
      target.setCustomValidity(`Слишком длинно. Удалите лишние ${valueLength - maxValue} знака(ов)`);
    } else {
      target.setCustomValidity(``);
    }

    target.reportValidity();
  };

  window.formValidation = {
    errorNotice,
    nonNotice,
    guestValidation,
    guestCapacity,
    priceOfType,
    typeOfRoom: `1`,
    typeOfHouse: `flat`,

    typeOfCapacity,
    priceValidation,
    valueLengthValidation
  };
})();
