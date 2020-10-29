'use strict';

(function () {
  const fillElement = (items) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < items.length; i++) {
      fragment.appendChild(window.pin.renderPin(items[i], i));
    }

    return fragment;
  };

  window.map = {
    fillElement
  };
})();
