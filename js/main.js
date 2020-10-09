'use strict';

const OFFERS_NUMBER = 8;
const OFFER_TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const OFFER_CHECKIN = [
  `12:00`,
  `13:00`,
  `14:00`
];
const OFFER_CHECKOUT = [
  `12:00`,
  `13:00`,
  `14:00`
];
const OFFER_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const AVATAR_PATH = `img/avatars/`;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const OFFSET_X = PIN_WIDTH / 2;
const OFFSET_Y = PIN_HEIGHT;
const MAP_WIDTH = document.querySelector(`.map`).clientWidth;
const LOC_Y_MIN = 130;
const LOC_Y_MAX = 630;

const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

// Функции
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomDescription = (possibleOptions) => {
  let mutableOptions = possibleOptions.slice(); // Создаем копию входящего массива
  let result = [];

  // Пробегаем рандомную длину от массива опций
  for (let i = 0, l = getRandomInt(possibleOptions.length); i < l; i++) {
    // Удаляем опции из копии массива, чтобы не повторяться
    // В результат записываем нулевой(единственный) элемент вырезанного массива
    result[i] = mutableOptions.splice(getRandomInt(mutableOptions.length), 1)[0];
  }

  return result;
};

const getSimilarOffers = (offersNumber) => {
  const similarOffers = [];
  let avatarFiles = [];

  // Генерируем названия файлов аватаров
  for (let i = 0; i < offersNumber; i++) {
    avatarFiles[i] = `user0${i + 1}.png`;
  }

  for (let i = 0; i < offersNumber; i++) {
    // Определяем координаты кончика указателя вычитанием смещения
    let locationX = getRandomInt(MAP_WIDTH) - OFFSET_X;
    // Ограничение по Y от LOC_Y_MIN до LOC_Y_MAX
    let locationY = getRandomInt(LOC_Y_MAX - LOC_Y_MIN) + LOC_Y_MIN - OFFSET_Y;

    similarOffers[i] = {
      author: {
        // При присвоении значения удаляем файл из массива, чтобы не использовать повторно
        avatar: `${AVATAR_PATH}${avatarFiles.splice(getRandomInt(avatarFiles.length), 1)[0]}`
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: `Заголовок предложения`,
        address: `${locationX}, ${locationY}`,
        price: getRandomInt(20) * 1000,
        type: OFFER_TYPE[getRandomInt(OFFER_TYPE.length)],
        rooms: getRandomInt(10),
        guests: getRandomInt(12),
        checkin: OFFER_CHECKIN[getRandomInt(OFFER_CHECKIN.length)],
        checkout: OFFER_CHECKOUT[getRandomInt(OFFER_CHECKOUT.length)],
        features: getRandomDescription(OFFER_FEATURES),
        description: `Описание`,
        photos: getRandomDescription(OFFER_PHOTOS)
      }
    };
  }

  return similarOffers;
};

const renderPin = (pin) => {
  const pinElement = PIN_TEMPLATE.cloneNode(true);
  const pinElementImage = pinElement.querySelector(`img`);

  pinElement.style = `left: ${pin.location.x}px; top: ${pin.location.y}px`;
  pinElementImage.src = pin.author.avatar;
  pinElementImage.alt = pin.offer.title;

  return pinElement;
};

const fillElement = (items) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < items.length; i++) {
    fragment.appendChild(renderPin(items[i]));
  }

  return fragment;
};

const nearbyOffers = getSimilarOffers(OFFERS_NUMBER);
const mapPins = fillElement(nearbyOffers);

MAP_PINS.appendChild(mapPins);
