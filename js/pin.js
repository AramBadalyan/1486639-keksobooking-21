'use strict';

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`);
  const inputaddress = document.querySelector(`#address`);
  const Coordinates = {
    x: {
      min: 0,
      max: window.constants.MAP.clientWidth
    },
    y: {
      min: 130,
      max: 630
    }
  };
  let loadedOffers = [];

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
      window.card.openCard(window.card.renderCard(window.pin.loadedOffers[evt.target.dataset.id]));
      evt.target.classList.add(`map__pin--active`);
    } else if (evt.target.parentElement.classList.contains(`map__pin`) && !evt.target.parentElement.classList.contains(`map__pin--main`)) {
      if (activePin) {
        activePin.classList.remove(`map__pin--active`);
      }
      window.card.closeCard(evt);
      window.card.openCard(window.card.renderCard(window.pin.loadedOffers[evt.target.parentElement.dataset.id]));
      evt.target.parentElement.classList.add(`map__pin--active`);
    }
  };

  const setCoordinates = (isPageActive) => {
    const distanceLeft = window.constants.mainPin.offsetLeft;
    const distanceTop = window.constants.mainPin.offsetTop;
    const height = window.constants.mainPin.clientHeight;
    const width = window.constants.mainPin.clientWidth;
    const mainPinX = Math.floor(distanceLeft + width / 2);
    const mainPinY = isPageActive ? Math.floor(distanceTop + height + window.constants.POINTER_HEIGHT) : Math.floor(distanceTop + height / 2);

    inputaddress.value = `${mainPinX}, ${mainPinY}`;
  };

  const movePin = (evt) => {
    if (evt.button === window.constants.MOUSE_MAIN_BUTTON) {
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        let delta = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        window.constants.mainPin.style.left = `${window.constants.mainPin.offsetLeft - delta.x}px`;
        window.constants.mainPin.style.top = `${window.constants.mainPin.offsetTop - delta.y}px`;

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (window.constants.mainPin.offsetLeft <= Coordinates.x.min - window.constants.mainPin.offsetWidth / 2) {
          window.constants.mainPin.style.left = `${Coordinates.x.min - window.constants.mainPin.offsetWidth / 2}px`;
        } else if (window.constants.mainPin.offsetLeft >= Coordinates.x.max - window.constants.mainPin.offsetWidth / 2) {
          window.constants.mainPin.style.left = `${Coordinates.x.max - window.constants.mainPin.offsetWidth / 2}px`;
        }

        if (window.constants.mainPin.offsetTop < Coordinates.y.min - window.constants.mainPin.offsetHeight - window.constants.POINTER_HEIGHT) {
          window.constants.mainPin.style.top = `${Coordinates.y.min - window.constants.mainPin.offsetHeight - window.constants.POINTER_HEIGHT}px`;
        } else if (window.constants.mainPin.offsetTop > Coordinates.y.max - window.constants.mainPin.offsetHeight - window.constants.POINTER_HEIGHT) {
          window.constants.mainPin.style.top = `${Coordinates.y.max - window.constants.mainPin.offsetHeight - window.constants.POINTER_HEIGHT}px`;
        }

        setCoordinates(true);
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        setCoordinates(true);

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };

  window.pin = {
    MAP_PINS,
    loadedOffers,

    renderPin,
    removePins,
    pinClickHandler,
    setCoordinates,
    movePin
  };
})();
