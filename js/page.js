'use strict';

(function () {
  // Перевод страницы в неактивное состояние
  const disactivatePage = () => {
    window.constants.MAP.classList.add(`map--faded`);
    window.form.adForm.classList.add(`ad-form--disabled`);
    for (let element of window.form.adFormElements) {
      element.disabled = true;
    }
    for (let element of window.form.filterFormElements) {
      element.disabled = true;
    }
    window.constants.mainPin.style.left = `${window.constants.mainPinStartPosition.x}px`;
    window.constants.mainPin.style.top = `${window.constants.mainPinStartPosition.y}px`;
    window.pin.setCoordinates(false);
    window.pin.removePins();
  };

  // Активация страницы
  const activatePage = () => {
    const mapPins = window.map.fillElement(window.data.nearbyOffers);

    window.constants.MAP.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    for (let element of window.form.adFormElements) {
      element.disabled = false;
    }
    for (let element of window.form.filterFormElements) {
      element.disabled = false;
    }

    window.pin.setCoordinates(true);
    window.pin.MAP_PINS.appendChild(mapPins);
  };

  window.page = {
    activatePage,
    disactivatePage
  };
})();
