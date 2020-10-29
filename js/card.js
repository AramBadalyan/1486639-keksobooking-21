'use strict';

(function () {
  const CARD_TEMPLATE = document.querySelector(`#card`);

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
    cardElementType.textContent = window.constants.HABITATION_TYPE[offerObj.offer.type];
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

  // Карточки объявлений
  const openCard = (card) => {
    const openedCard = window.constants.MAP.querySelector(`.map__card`); // Заменить на метод содержится ли DOM-елемент
    if (openedCard) {
      closeCard();
    }

    const closeButton = card.querySelector(`.popup__close`);

    closeButton.addEventListener(`click`, closeCard);
    document.addEventListener(`keydown`, closeCardByEsc);

    window.constants.MAP.insertBefore(card, window.constants.MAP.querySelector(`.map__filters-container`));
  };

  const closeCard = (evt) => {
    const openedCard = window.constants.MAP.querySelector(`.map__card`);
    const activePin = window.constants.MAP.querySelector(`.map__pin--active`);
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
    if (evt.key === window.constants.ESC_KEY) {
      evt.preventDefault();
      closeCard(evt);
    }
  };

  window.card = {
    renderCard,
    openCard,
    closeCard,
    closeCardByEsc
  };
})();
