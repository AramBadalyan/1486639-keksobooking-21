'use strict';

(function () {
  const MAP = document.querySelector(`.map`);

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const POINTER_HEIGHT = 16; // 16px - высота кончика указателя
  const OFFSET_X = PIN_WIDTH / 2;
  const OFFSET_Y = PIN_HEIGHT;
  const LOC_X_MIN = 0 + OFFSET_X;
  const LOC_X_MAX = MAP.clientWidth - OFFSET_X;
  const LOC_Y_MIN = 130;
  const LOC_Y_MAX = 630;
  const ESC_KEY = `Escape`;
  const HABITATION_TYPE = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const mainPin = MAP.querySelector(`.map__pin--main`);
  const mainPinWidth = mainPin.clientWidth;
  const mainPinHeight = mainPin.clientHeight;
  const mainPinAddress = {
    x: Math.round(mainPin.offsetLeft + mainPinWidth / 2),
    y: Math.round(mainPin.offsetTop + mainPinHeight + POINTER_HEIGHT)
  };
  const mainPinStartPosition = {
    x: Math.round(mainPin.offsetLeft + mainPinWidth / 2),
    y: Math.round(mainPin.offsetTop + mainPinHeight / 2)
  };

  window.constants = {
    OFFSET_X,
    OFFSET_Y,
    LOC_X_MIN,
    LOC_X_MAX,
    LOC_Y_MIN,
    LOC_Y_MAX,
    MAP,
    ESC_KEY,
    HABITATION_TYPE,
    mainPin,
    mainPinAddress,
    mainPinStartPosition
  };
})();