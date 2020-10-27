'use strict';

(function () {
  /* const MAP = document.querySelector(`.map`);

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const POINTER_HEIGHT = 16; // 16px - высота кончика указателя
  const OFFSET_X = PIN_WIDTH / 2;
  const OFFSET_Y = PIN_HEIGHT;
  const LOC_X_MIN = 0 + OFFSET_X;
  const LOC_X_MAX = MAP.clientWidth - OFFSET_X;
  const LOC_Y_MIN = 130;
  const LOC_Y_MAX = 630;

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

  window.main = {
    OFFSET_X,
    OFFSET_Y,
    LOC_X_MIN,
    LOC_X_MAX,
    LOC_Y_MIN,
    LOC_Y_MAX,
    MAP,
    mainPin,
    mainPinAddress,
    mainPinStartPosition
  }; */
})();

/* const OFFERS_NUMBER = 8;
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
const AVATAR_PATH = `img/avatars/`; */
/* const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const POINTER_HEIGHT = 16; // 16px - высота кончика указателя
const OFFSET_X = PIN_WIDTH / 2;
const OFFSET_Y = PIN_HEIGHT;
const LOC_X_MIN = 0 + OFFSET_X;
const LOC_X_MAX = MAP.clientWidth - OFFSET_X;
const LOC_Y_MIN = 130;
const LOC_Y_MAX = 630;

const MAP = document.querySelector(`.map`); */
/* const MAP_PINS = document.querySelector(`.map__pins`); */
/* const PIN_TEMPLATE = document.querySelector(`#pin`); */
/* const CARD_TEMPLATE = document.querySelector(`#card`); */
/* const MOUSE_MAIN_BTN = 0; */
/* const ETR_KEY = `Enter`; */
/* const ESC_KEY = `Escape`; */

// Форма нового объявления и фильтрации
/* const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const filterForm = MAP.querySelector(`.map__filters`);
const filterFormElements = filterForm.children;
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.children;
const addressInput = adForm.querySelector(`#address`);
const roomsInput = adForm.querySelector(`#room_number`);
const capacityInput = adForm.querySelector(`#capacity`);
const adFormReset = adForm.querySelector(`.ad-form__reset`);
const titleInput = adForm.querySelector(`#title`);
const typeInput = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const checkInInput = adForm.querySelector(`#timein`);
const checkOutInput = adForm.querySelector(`#timeout`);
const avatarInput = adForm.querySelector(`#avatar`);
const imagesInput = adForm.querySelector(`#images`);

const guestCapacity = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};
const guestValidation = {
  '1': `Только на одного гостя`,
  '2': `Только на одного или двух гостей`,
  '3': `Только на одного, двух или трех гостей`,
  '100': `Только не для гостей`
};
const priceOfType = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
let typeOfRoom = `1`;
let typeOfHouse = `flat`; */

/* const mainPin = MAP.querySelector(`.map__pin--main`);
const mainPinWidth = mainPin.clientWidth;
const mainPinHeight = mainPin.clientHeight;
const mainPinAddress = {
  x: Math.round(mainPin.offsetLeft + mainPinWidth / 2),
  y: Math.round(mainPin.offsetTop + mainPinHeight + POINTER_HEIGHT)
};
const mainPinStartPosition = {
  x: Math.round(mainPin.offsetLeft + mainPinWidth / 2),
  y: Math.round(mainPin.offsetTop + mainPinHeight / 2)
}; */

// Функции
/* const getRandomOffer = (number) => {
  // Определяем координаты кончика указателя вычитанием смещения
  let locationX = window.util.getRandomIntInclusive(LOC_X_MIN, LOC_X_MAX);
  // Ограничение по Y от LOC_Y_MIN до LOC_Y_MAX
  let locationY = window.util.getRandomIntInclusive(LOC_Y_MIN, LOC_Y_MAX);

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
      price: OFFER_PRICE[window.util.getRandomInt(OFFER_PRICE.length)],
      type: OFFER_TYPE[window.util.getRandomInt(OFFER_TYPE.length)],
      rooms: OFFER_ROOMS[window.util.getRandomInt(OFFER_ROOMS.length)],
      guests: OFFER_GUESTS[window.util.getRandomInt(OFFER_GUESTS.length)],
      checkin: OFFER_CHECKIN[window.util.getRandomInt(OFFER_CHECKIN.length)],
      checkout: OFFER_CHECKOUT[window.util.getRandomInt(OFFER_CHECKOUT.length)],
      features: window.util.getRandomDescription(OFFER_FEATURES),
      description: `Описание`,
      photos: window.util.getRandomDescription(OFFER_PHOTOS)
    }
  };
  return offer;
}; */

/* const getRandomOffersList = (offersNumber) => {
  const similarOffers = [];

  // Генерируем массив предложений
  for (let i = 0; i < offersNumber; i++) {
    similarOffers.push(getRandomOffer(i + 1));
  }

  return similarOffers;
}; */

/* const renderPin = (pin, index) => {
  const pinElement = PIN_TEMPLATE.content.cloneNode(true);
  const pinElementButton = pinElement.querySelector(`.map__pin`);
  const pinElementImage = pinElement.querySelector(`img`);

  pinElementButton.style = `left: ${pin.location.x - OFFSET_X}px; top: ${pin.location.y - OFFSET_Y}px`;
  pinElementImage.src = pin.author.avatar;
  pinElementImage.alt = pin.offer.title;
  pinElementButton.dataset.id = index;

  return pinElement;
};

const removePins = () => {
  const pins = MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach(function (pin) {
    pin.remove();
  });
}; */

/* const renderCard = (offerObj) => {
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
}; */

/* const fillElement = (items) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < items.length; i++) {
    fragment.appendChild(renderPin(items[i], i));
  }

  return fragment;
}; */

/* // Перевод страницы в неактивное состояние
const disactivatePage = () => {
  MAP.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  for (let element of adFormElements) {
    element.disabled = true;
  }
  for (let element of filterFormElements) {
    element.disabled = true;
  }
  addressInput.value = `${mainPinStartPosition.x}, ${mainPinStartPosition.y}`;
  removePins();
}; */

/* const nearbyOffers = getRandomOffersList(OFFERS_NUMBER); */

/* // Активация страницы
const activatePage = () => {
  const mapPins = fillElement(nearbyOffers);

  MAP.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let element of adFormElements) {
    element.disabled = false;
  }
  for (let element of filterFormElements) {
    element.disabled = false;
  }

  MAP_PINS.appendChild(mapPins);
}; */

/* // Заполнение поля Адрес
const setAddresInputValue = () => {
  addressInput.value = `${mainPinAddress.x}, ${mainPinAddress.y}`;
}; */

/* // Валидация поля Количество мест
const typeOfCapacity = (target) => {
  const value = target.value;
  const isValid = guestCapacity[typeOfRoom].some(function (element) {
    return element === value;
  });
  if (!isValid) {
    target.setCustomValidity(guestValidation[typeOfRoom]);
  } else {
    target.setCustomValidity(``);
  }

  target.reportValidity();
}; */

/* // Валидация Типа жилья и Цены за ночь
const priceValidation = function (target) {
  const value = target.value;
  if (target.validity.valueMissing) {
    target.setCustomValidity(`Обязательное поле`);
  } else if (value < priceOfType[typeOfHouse]) {
    target.setCustomValidity(`Минимальная цена ${priceOfType[typeOfHouse]}`);
  } else if (value > 1000000) {
    target.setCustomValidity(`Максимальная цена 1000000`);
  } else {
    target.setCustomValidity(``);
  }
  target.reportValidity();
}; */

/* // Валидация длины введенного значения
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
}; */

/* // Синхронизация времени заезда/выезда
const syncInOutTime = (target) => {
  if (target === checkInInput) {
    checkOutInput.value = checkInInput.value;
  } else {
    checkInInput.value = checkOutInput.value;
  }
}; */

/* adForm.action = `https://21.javascript.pages.academy/keksobooking`;
addressInput.readOnly = true;
addressInput.value = `${mainPinStartPosition.x}, ${mainPinStartPosition.y}`; */
window.page.disactivatePage();

window.constants.mainPin.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.page.activatePage();
  window.form.setAddresInputValue();
});

/* roomsInput.addEventListener(`change`, function (evt) {
  typeOfRoom = evt.target.value;
  typeOfCapacity(capacityInput);
});

capacityInput.addEventListener(`change`, function (evt) {
  typeOfCapacity(evt.target);
}); */

/* // У кнопки "очистить" type="reset", дополнительно сбрасывать форму не нужно
adFormReset.addEventListener(`click`, function () {
  disactivatePage();
}); */

/* titleInput.required = true;
titleInput.minLength = MIN_TITLE_LENGTH;
titleInput.maxLength = MAX_TITLE_LENGTH;

titleInput.addEventListener(`input`, function (evt) {
  valueLengthValidation(evt.target, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
});

priceInput.required = true;
priceInput.max = 1000000;
priceInput.placeholder = priceOfType[typeOfHouse];

priceInput.addEventListener(`input`, function (evt) {
  priceValidation(evt.target);
});

typeInput.addEventListener(`change`, function () {
  typeOfHouse = typeInput.value;
  priceInput.placeholder = priceOfType[typeOfHouse];
  priceValidation(priceInput);
});

avatarInput.accept = `image/*`;
imagesInput.accept = `image/*`;

checkInInput.addEventListener(`change`, function (evt) {
  syncInOutTime(evt.target);
});
checkOutInput.addEventListener(`change`, function (evt) {
  syncInOutTime(evt.target);
}); */

/* // Карточки объявлений
const openCard = (card) => {
  const openedCard = MAP.querySelector(`.map__card`); // Заменить на метод содержится ли DOM-елемент
  if (openedCard) {
    closeCard();
  }

  const closeButton = card.querySelector(`.popup__close`);

  closeButton.addEventListener(`click`, closeCard);
  document.addEventListener(`keydown`, closeCardByEsc);

  MAP.insertBefore(card, MAP.querySelector(`.map__filters-container`));
}; */

/* const closeCard = (evt) => {
  const openedCard = MAP.querySelector(`.map__card`);
  const activePin = MAP.querySelector(`.map__pin--active`);
  if (openedCard) {
    openedCard.remove();
  }
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }

  document.removeEventListener(`keydown`, closeCardByEsc);
  evt.target.removeEventListener(`click`, closeCard);
};

const closeCardByEsc = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closeCard(evt);
  }
}; */

/* const pinClickHandler = (evt) => {
  const activePin = MAP.querySelector(`.map__pin--active`);
  if (evt.target.classList.contains(`map__pin`) && !evt.target.classList.contains(`map__pin--main`)) {
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
    closeCard(evt);
    openCard(renderCard(nearbyOffers[evt.target.dataset.id]));
    evt.target.classList.add(`map__pin--active`);
  } else if (evt.target.parentElement.classList.contains(`map__pin`) && !evt.target.parentElement.classList.contains(`map__pin--main`)) {
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
    closeCard(evt);
    openCard(renderCard(nearbyOffers[evt.target.parentElement.dataset.id]));
    evt.target.parentElement.classList.add(`map__pin--active`);
  }
}; */

window.constants.MAP.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  window.pin.pinClickHandler(evt);
});
