'use strict';

(function () {
  const fillElement = (items) => {
    const offersCount = window.constants.MAX_PINS_ON_MAP < items.length ? window.constants.MAX_PINS_ON_MAP : items.length; // требование ТЗ 5.9
    const fragment = document.createDocumentFragment();

    window.pin.loadedOffers = items;

    for (let i = 0; i < offersCount; i++) {
      fragment.appendChild(window.pin.renderPin(items[i], i));
    }

    window.pin.MAP_PINS.appendChild(fragment);
  };

  window.map = {
    fillElement
  };
})();
