'use strict';

const CARD_TEMPLATE = document.querySelector(`#card`);

const render = (offerObj) => {
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
  cardElementType.textContent = window.constants.HABITATION_TYPE[offerObj.offer.type];
  cardElementCapacity.textContent = `${offerObj.offer.rooms} комнаты для ${offerObj.offer.guests} гостей`;
  cardElementTime.textContent = `Заезд после ${offerObj.offer.checkin}, выезд до ${offerObj.offer.checkout}`;
  cardElementDescription.textContent = offerObj.offer.description;

  cardElementFeaturesList.innerHTML = ``;
  cardElementPhotosList.innerHTML = ``;

  const cardElementFeatures = document.createDocumentFragment();
  const cardElementPhotos = document.createDocumentFragment();

  offerObj.offer.features.forEach((feature) => {
    let newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`, `popup__feature--${feature}`);

    cardElementFeatures.appendChild(newFeature);
  });

  offerObj.offer.photos.forEach((photo) => {
    let newPhoto = document.createElement(`img`);
    newPhoto.classList.add(`popup__photo`);
    newPhoto.width = window.constants.CARD_PREVIEW_WIDTH;
    newPhoto.height = window.constants.CARD_PREVIEW_HEIGTH;
    newPhoto.alt = `Фотография жилья`;
    newPhoto.src = photo;

    cardElementPhotos.appendChild(newPhoto);
  });

  cardElementFeaturesList.appendChild(cardElementFeatures);
  cardElementPhotosList.appendChild(cardElementPhotos);

  return cardElement;
};

// Карточки объявлений
const openElement = (card) => {
  const openedCard = window.constants.MAP.querySelector(`.map__card`); // Заменить на метод содержится ли DOM-елемент
  if (openedCard) {
    onClose();
  }

  const closeButton = card.querySelector(`.popup__close`);

  closeButton.addEventListener(`click`, onClose);
  document.addEventListener(`keydown`, onCloseByEsc);

  window.constants.MAP.insertBefore(card, window.constants.MAP.querySelector(`.map__filters-container`));
};

const onClose = () => {
  const openedCard = window.constants.MAP.querySelector(`.map__card`);
  const activePin = window.constants.MAP.querySelector(`.map__pin--active`);
  if (openedCard) {
    const closeButton = openedCard.querySelector(`.popup__close`);
    openedCard.remove();
    closeButton.removeEventListener(`click`, onClose);
  }
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }

  document.removeEventListener(`keydown`, onCloseByEsc);
};

const onCloseByEsc = (evt) => {
  if (evt.key === window.constants.ESC_KEY) {
    evt.preventDefault();
    onClose(evt);
  }
};

window.card = {
  render,
  openElement,
  onClose,
  onCloseByEsc
};
