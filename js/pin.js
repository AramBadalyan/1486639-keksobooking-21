'use strict';

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`);

  const renderPin = (pin, index) => {
    const pinElement = PIN_TEMPLATE.content.cloneNode(true);
    const pinElementButton = pinElement.querySelector(`.map__pin`);
    const pinElementImage = pinElement.querySelector(`img`);

    pinElementButton.style = `left: ${pin.location.x - window.constants.OFFSET_X}px; top: ${pin.location.y - window.constants.OFFSET_Y}px`;
    pinElementImage.src = pin.author.avatar;
    pinElementImage.alt = pin.offer.title;
    pinElementButton.dataset.id = index;

    return pinElement;
  };

  const removePins = () => {
    const pins = window.constants.MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  const pinClickHandler = (evt) => {
    const activePin = window.constants.MAP.querySelector(`.map__pin--active`);
    if (evt.target.classList.contains(`map__pin`) && !evt.target.classList.contains(`map__pin--main`)) {
      if (activePin) {
        activePin.classList.remove(`map__pin--active`);
      }
      window.card.closeCard(evt);
      window.card.openCard(window.card.renderCard(window.data.nearbyOffers[evt.target.dataset.id]));
      evt.target.classList.add(`map__pin--active`);
    } else if (evt.target.parentElement.classList.contains(`map__pin`) && !evt.target.parentElement.classList.contains(`map__pin--main`)) {
      if (activePin) {
        activePin.classList.remove(`map__pin--active`);
      }
      window.card.closeCard(evt);
      window.card.openCard(window.card.renderCard(window.data.nearbyOffers[evt.target.parentElement.dataset.id]));
      evt.target.parentElement.classList.add(`map__pin--active`);
    }
  };

  window.pin = {
    MAP_PINS,

    renderPin,
    removePins,
    pinClickHandler
  };
})();
