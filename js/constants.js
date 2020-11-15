'use strict';

const MAP = document.querySelector(`.map`);

const MAX_PINS_ON_MAP = 5;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const POINTER_HEIGHT = 16; // 16px - высота кончика указателя
const OFFSET_X = PIN_WIDTH / 2;
const OFFSET_Y = PIN_HEIGHT;
const LOC_X_MIN = 0/*  + OFFSET_X */;
const LOC_X_MAX = MAP.clientWidth/*  - OFFSET_X */;
const LOC_Y_MIN = 130;
const LOC_Y_MAX = 630;
const ESC_KEY = `Escape`;
const MOUSE_MAIN_BUTTON = 0;
const HABITATION_TYPE = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const IMAGE_TYPES = [`gif`, `jpeg`, `jpg`, `png`];

const pageMain = document.querySelector(`main`);
const mainPin = MAP.querySelector(`.map__pin--main`);
const mainPinWidth = mainPin.clientWidth;
const mainPinHeight = mainPin.clientHeight;
const mainPinStartPosition = {
  x: mainPin.offsetLeft,
  y: mainPin.offsetTop
};

window.constants = {
  MAX_PINS_ON_MAP,
  POINTER_HEIGHT,
  OFFSET_X,
  OFFSET_Y,
  LOC_X_MIN,
  LOC_X_MAX,
  LOC_Y_MIN,
  LOC_Y_MAX,
  MAP,
  ESC_KEY,
  MOUSE_MAIN_BUTTON,
  HABITATION_TYPE,
  IMAGE_TYPES,
  pageMain,
  mainPinWidth,
  mainPinHeight,
  mainPin,
  mainPinStartPosition
};
