'use strict';

const OFFERS_NUMBER = 8;
const OFFER_PRICE = [
  1000,
  2000,
  4000,
  8000,
  16000
];
const OFFER_TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const OFFER_ROOMS = [
  1,
  2,
  3,
  4,
  5
];
const OFFER_GUESTS = [
  1,
  2,
  3,
  4,
  8
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
const HABITATION_TYPE = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const AVATAR_PATH = `img/avatars/`;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const OFFSET_X = PIN_WIDTH / 2;
const OFFSET_Y = PIN_HEIGHT;
const MAP = document.querySelector(`.map`);
const LOC_X_MIN = 0 + OFFSET_X;
const LOC_X_MAX = MAP.clientWidth - OFFSET_X;
const LOC_Y_MIN = 130;
const LOC_Y_MAX = 630;

const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`);
const CARD_TEMPLATE = document.querySelector(`#card`);

// Функции
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
  for (let i = 0, l = getRandomInt(possibleOptions.length); i < l; i++) {
    // Удаляем опции из копии массива, чтобы не повторяться
    // В результат записываем нулевой(единственный) элемент вырезанного массива
    result.push(mutableOptions.splice(getRandomInt(mutableOptions.length), 1)[0]);
  }

  return result;
};

const getRandomOffer = (number) => {
  // Определяем координаты кончика указателя вычитанием смещения
  let locationX = getRandomIntInclusive(LOC_X_MIN, LOC_X_MAX);
  // Ограничение по Y от LOC_Y_MIN до LOC_Y_MAX
  let locationY = getRandomIntInclusive(LOC_Y_MIN, LOC_Y_MAX);

  const offer = {
    author: {
      avatar: `${AVATAR_PATH}user0${number}.png`
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: `Заголовок предложения`,
      address: `${locationX}, ${locationY}`,
      price: OFFER_PRICE[getRandomInt(OFFER_PRICE.length)],
      type: OFFER_TYPE[getRandomInt(OFFER_TYPE.length)],
      rooms: OFFER_ROOMS[getRandomInt(OFFER_ROOMS.length)],
      guests: OFFER_GUESTS[getRandomInt(OFFER_GUESTS.length)],
      checkin: OFFER_CHECKIN[getRandomInt(OFFER_CHECKIN.length)],
      checkout: OFFER_CHECKOUT[getRandomInt(OFFER_CHECKOUT.length)],
      features: getRandomDescription(OFFER_FEATURES),
      description: `Описание`,
      photos: getRandomDescription(OFFER_PHOTOS)
    }
  };
  return offer;
};

const getRandomOffersList = (offersNumber) => {
  const similarOffers = [];

  // Генерируем массив предложений
  for (let i = 0; i < offersNumber; i++) {
    similarOffers.push(getRandomOffer(i + 1));
  }

  return similarOffers;
};

const renderPin = (pin) => {
  const pinElement = PIN_TEMPLATE.content.cloneNode(true);
  const pinElementButton = pinElement.querySelector(`.map__pin`);
  const pinElementImage = pinElement.querySelector(`img`);

  pinElementButton.style = `left: ${pin.location.x - OFFSET_X}px; top: ${pin.location.y - OFFSET_Y}px`;
  pinElementImage.src = pin.author.avatar;
  pinElementImage.alt = pin.offer.title;

  return pinElement;
};

const renderCard = (offerObj) => {
  const cardElement = CARD_TEMPLATE.content.cloneNode(true);
  const cardElementAvatar = cardElement.querySelector(`.popup__avatar`);
  const cardElementTitle = cardElement.querySelector(`.popup__title`);
  const cardElementAddress = cardElement.querySelector(`.popup__text--address`);
  const cardElementPrice = cardElement.querySelector(`.popup__text--price`);
  const cardElementType = cardElement.querySelector(`.popup__type`);
  const cardElementCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardElementTime = cardElement.querySelector(`.popup__text--time`);
  const cardElementDescription = cardElement.querySelector(`.popup__description`);

  const cardElementFeaturesList = cardElement.querySelector(`.popup__features`);
  const cardElementPhotosList = cardElement.querySelector(`.popup__photos`);

  cardElementAvatar.src = offerObj.author.avatar;
  cardElementTitle.textContent = offerObj.offer.title;
  cardElementAddress.textContent = offerObj.offer.address;
  cardElementPrice.innerHTML = `${offerObj.offer.price}&#x20bd;<span>/ночь</span>`;
  cardElementType.textContent = HABITATION_TYPE[offerObj.offer.type];
  cardElementCapacity.textContent = `${offerObj.offer.rooms} комнаты для ${offerObj.offer.guests} гостей`;
  cardElementTime.textContent = `Заезд после ${offerObj.offer.checkin}, выезд до ${offerObj.offer.checkout}`;
  cardElementDescription.textContent = offerObj.offer.description;

  cardElementFeaturesList.innerHTML = ``;
  cardElementPhotosList.innerHTML = ``;

  const cardElementFeatures = document.createDocumentFragment();
  const cardElementPhotos = document.createDocumentFragment();

  for (let i = 0; i < offerObj.offer.features.length; i++) {
    let newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`, `popup__feature--${offerObj.offer.features[i]}`);

    cardElementFeatures.appendChild(newFeature);
  }

  for (let i = 0; i < offerObj.offer.photos.length; i++) {
    let newPhoto = document.createElement(`img`);
    newPhoto.classList.add(`popup__photo`);
    newPhoto.width = 45;
    newPhoto.height = 40;
    newPhoto.alt = `Фотография жилья`;
    newPhoto.src = offerObj.offer.photos[i];

    cardElementPhotos.appendChild(newPhoto);
  }

  cardElementFeaturesList.appendChild(cardElementFeatures);
  cardElementPhotosList.appendChild(cardElementPhotos);

  return cardElement;
};

const fillElement = (items) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < items.length; i++) {
    fragment.appendChild(renderPin(items[i]));
  }

  return fragment;
};

const nearbyOffers = getRandomOffersList(OFFERS_NUMBER);
const mapPins = fillElement(nearbyOffers);

MAP.classList.remove(`map--faded`);
MAP_PINS.appendChild(mapPins);
MAP.insertBefore(renderCard(nearbyOffers[0]), MAP.querySelector(`.map__filters-container`));
