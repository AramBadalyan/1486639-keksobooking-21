'use strict';


const clearMap = () => {
  const pinsOnMap = window.pin.MAP_PINS.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsOnMap.forEach(function (pin) {
    pin.remove();
  });
};

const fillElement = (items) => {
  clearMap();
  const offersCount = window.constants.MAX_PINS_ON_MAP < items.length ? window.constants.MAX_PINS_ON_MAP : items.length; // требование ТЗ 5.9
  const fragment = document.createDocumentFragment();

  window.pin.loadedOffers = items;

  for (let i = 0; i < offersCount; i++) {
    let isOfferInItem = items[i].offer;
    if (isOfferInItem) { // требование ТЗ 5.3
      fragment.appendChild(window.pin.renderPin(items[i], i));
    }
  }

  window.pin.MAP_PINS.appendChild(fragment);
};

window.map = {
  fillElement
};
